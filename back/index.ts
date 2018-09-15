import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import sio from 'socket.io';
import { actions } from './src/domain';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3500;
const io = sio(new http.Server(app));

app.use(bodyParser.json());
app.use(cors());

app.get('/', (_, res) => {
  res.json({ text: 'Hello World' });
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

app.post('/action', (_, res) => {
  const action = res.body;
  actions.next(action);
});

actions.subscribe(action => {
  io.emit('action', action);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
