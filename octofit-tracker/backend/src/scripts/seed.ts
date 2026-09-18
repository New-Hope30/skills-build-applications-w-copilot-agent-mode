import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
import { connectionString } from '../config/database.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Leaderboard.deleteMany({}), Workout.deleteMany({})]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex@example.com', name: 'Alex Rivera' },
      { username: 'jamie.strong', email: 'jamie@example.com', name: 'Jamie Chen' },
      { username: 'sam.moves', email: 'sam@example.com', name: 'Sam Taylor' },
    ]);

    await Team.create([
      { name: 'Peak Performers', description: 'Small steps, strong finish.', members: [users[0]._id, users[1]._id] },
      { name: 'Daily Movers', description: 'Consistency is our superpower.', members: [users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'running', duration: 32, distance: 5.2, points: 52, date: new Date('2026-09-16') },
      { user: users[1]._id, type: 'strength', duration: 45, points: 45, date: new Date('2026-09-15') },
      { user: users[2]._id, type: 'walking', duration: 40, distance: 3.1, points: 31, date: new Date('2026-09-14') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 52, rank: 1 },
      { user: users[1]._id, points: 45, rank: 2 },
      { user: users[2]._id, points: 31, rank: 3 },
    ]);

    await Workout.create([
      { title: 'Quick Cardio Boost', description: 'A brisk interval session for busy days.', difficulty: 'beginner', duration: 20, category: 'cardio' },
      { title: 'Full Body Fundamentals', description: 'Build strength with simple, controlled movements.', difficulty: 'intermediate', duration: 35, category: 'strength' },
      { title: 'Mobility Reset', description: 'Restore range of motion with a calm mobility flow.', difficulty: 'beginner', duration: 15, category: 'mobility' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
