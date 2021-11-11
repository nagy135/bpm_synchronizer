import WebSocketHandler from '@handler/websocket';
import { Server } from 'socket.io';
import http from 'http';
import { verifyJwtToken } from '@utils/auth';
import { Application } from 'express';
import { TSocketData } from '@ctypes/socket';
import authHandler from '@handler/auth';

//todo @viktor.nagy spravil toto index ts s vytvorenim servera, neni uplne service
export const socketInit = (app: Application) => {
  const socketServer = http.createServer(app);
  const io = new Server(socketServer);

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const socketData: TSocketData = {
        pid: verifyJwtToken(token),
        kyc: await authHandler.verifyKyc(token),
      };
      Object.assign(socket.data, socketData);
    } catch (error) {
      next(error);
    }
    next();
  });

  //todo @viktor.nagy listeners su skorej contreolere nez handlere, alebo spravit mozno novu zlozku listeners ako ekvivalent pre contreollery u socketov
  io.on('connection', WebSocketHandler);
  socketServer.listen(process.env.SOCKET_PORT);
};
