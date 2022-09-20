import { FastifyPluginAsync } from 'fastify';
import { getUserInfo } from '../../../../../google/index';
import userService from '../../../../../../application/user.service';

const oauth: FastifyPluginAsync = async (fastify) => {
  fastify.get('/callback', async function handler(request, reply) {
    const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    const userInfo = await getUserInfo(token.access_token);
    const user = await userService.createUser(userInfo);

    request.session.userId = user.id;

    reply.redirect('/');
  });
};

export default oauth;
