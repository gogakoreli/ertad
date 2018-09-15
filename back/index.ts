import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import sio from 'socket.io';
import { controller } from './src/controller';
import { addAction } from './src/domain';

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

app.post('/action', (req, res) => {
  const action = req.body;
  addAction(io)(action);
  res.json({ message: 'OK' });
});

app.post('/actions', (req, res) => {
  const actions: any[] = req.body;
  for (const action of actions) {
    addAction(io)(action);
  }
  res.json({ message: 'OK' });
});
