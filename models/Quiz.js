import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: String, required: true },
    topic: { type: String, required: true },
    dueDate: { type: Date, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Quiz', quizSchema);

//