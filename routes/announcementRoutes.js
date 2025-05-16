import express from 'express';
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController.js';
import { announcementSchema, updateAnnouncementSchema } from '../schemas/announcementSchema.js';
import validate from '../middlewares/validate.js';
import simpleAuth from '../middlewares/auth.js';

const router = express.Router();

router.route('/')
  .get(getAnnouncements)
  .post(simpleAuth, validate(announcementSchema), createAnnouncement);

router.route('/:id')
  .put(simpleAuth, validate(updateAnnouncementSchema), updateAnnouncement)
  .delete(simpleAuth, deleteAnnouncement);

export default router;