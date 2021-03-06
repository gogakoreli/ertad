import { Router } from 'express';
import {
  debugActions,
  debugState,
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
  const room = getRoomById(req.params.id);

  if (room === null || room === undefined) {
    return res.status(404).json({ message: 'Not Found' });
  } else {
    res.json(room);
  }
});

router.get('/debug/actions', (_, res) => {
  res.json(debugActions);
});

router.get('/debug/state', (_, res) => {
  res.json(debugState());
});

export const controller: Router = router;
