
import { z } from 'zod';

export const announcementSchema = z.object({
    body: z.object({
        title: z.string().min(3, 'Title must be at least 3 characters'),
        author: z.string().min(3, 'Author must be at least 3 characters'),
        course: z.string().min(2, 'Course must be at least 2 characters'),
        content: z.string().min(10, 'Content must be at least 10 characters'),
    }),
});

export const updateAnnouncementSchema = announcementSchema.extend({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid announcement ID'),
    }),
});