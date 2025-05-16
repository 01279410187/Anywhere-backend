import { z } from 'zod';

export const quizSchema = z.object({
    body: z.object({
        title: z.string().min(3, 'Title must be at least 3 characters'),
        course: z.string().min(2, 'Course must be at least 2 characters'),
        topic: z.string().min(3, 'Topic must be at least 3 characters'),
        dueDate: z.string().datetime({ offset: true }).transform((val) => new Date(val)),
        contact: z.string().min(3, 'Contact must be at least 3 characters'),
    }),
});

export const updateQuizSchema = quizSchema.extend({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid quiz ID'),
    }),
});