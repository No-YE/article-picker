import { FastifyPluginAsync } from 'fastify';
import { getUserInfo } from '../../../../../google/index';
import accountService from '../../../../../../application/service/account';

const oauth: FastifyPluginAsync = async (fastify) => {
  fastify.get('/callback', async function handler(request, reply) {
    const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    const userInfo = await getUserInfo(token.access_token);
    const account = await accountService.createAccount(userInfo);

    request.session.accountId = account.id;

    reply.redirect('/');
  });
};

export default oauth;
