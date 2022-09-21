import { FastifyPluginAsync } from 'fastify';
import { getUserInfo } from '../../../../../google/index';
import userCommand from '../../../../../../application/command/user';

const oauth: FastifyPluginAsync = async (fastify) => {
  fastify.get('/callback', async function handler(request, reply) {
    const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    const userInfo = await getUserInfo(token.access_token);
    const user = await userCommand.createUser(userInfo);

    request.session.userId = user.id;

    reply.redirect('/');
  });
};

export default oauth;
