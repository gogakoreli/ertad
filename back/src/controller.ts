import { Router } from 'express';
import {
  addAction,
  getUserById,
  listRooms,
  listUsers,
  getRoomById,
} from './domain';

const router: Router = Router();

router.get('/', (_, res) => {
  res.json({ text: 'Hello World' });
});

router.get('/users', (_, res) => {
  res.json(listUsers());
});

router.get('/users/:id', (req, res) => {
  const user = getUserById(req.params.id);

  if (user === null || user === undefined) {
    return res.status(404).json({ message: 'Not Found' });
  } else {
    res.json(user);
  }
});

router.get('/rooms', (_, res) => {
  res.json(listRooms());
});

router.get('/rooms/:id', (req, res) => {
  const room = getUserById(req.params.id);

  if (room === null || room === undefined) {
    return res.status(404).json({ message: 'Not Found' });
  } else {
    res.json(room);
  }
});

export const controller: Router = router;
