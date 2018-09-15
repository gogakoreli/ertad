import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import sio from 'socket.io';
import { controller } from './src/controller';
import { actions$ } from './src/domain';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3500;

app.use(bodyParser.json());
app.use(cors());
app.use(controller);

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

const io = sio.listen(server, { origins: '*:*' });

io.on('connection', function(socket) {
  console.log('a user connected');
});

actions$.subscribe(action => {
  io.emit('action', action);
});
