import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'username name avatar').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {};
    response.json(await Activity.find(filter).populate('user', 'username name').sort({ date: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Leaderboard.find().populate('user', 'username name avatar').sort({ points: -1 });
    response.json(leaderboard.map((entry, index) => ({ ...entry.toObject(), rank: index + 1 })));
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ category: 1, title: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});

export default router;