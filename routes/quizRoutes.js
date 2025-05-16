import express from 'express';
import {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController.js';
import { quizSchema, updateQuizSchema } from '../schemas/quizSchema.js';
import validate from '../middlewares/validate.js';
import simpleAuth from '../middlewares/auth.js';

const router = express.Router();

router.route('/')
  .get(getQuizzes)
  .post(simpleAuth, validate(quizSchema), createQuiz);

router.route('/:id')
  .put(simpleAuth, validate(updateQuizSchema), updateQuiz)
  .delete(simpleAuth, deleteQuiz);

export default router;