import Quiz from '../models/Quiz.js';
import { ErrorResponses } from '../utils/errorHandler.js';

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ dueDate: 1 });
    res.json({ success: true, data: quizzes });
  } catch (err) {
    ErrorResponses(res, err);
  }
};

export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    ErrorResponses(res, err);
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!quiz) {
      return res.status(404).json({ 
        success: false, 
        message: 'Quiz not found' 
      });
    }
    
    res.json({ success: true, data: quiz });
  } catch (err) {
    ErrorResponses(res, err);
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ 
        success: false, 
        message: 'Quiz not found' 
      });
    }
    
    res.json({ success: true, data: {} });
  } catch (err) {
    ErrorResponses(res, err);
  }
};