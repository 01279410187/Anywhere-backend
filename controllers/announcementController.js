import Announcement from '../models/Announcement.js';
import { ErrorResponses } from '../utils/errorHandler.js';

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, data: announcements });
  } catch (err) {
    ErrorResponses(res, err);
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json({ success: true, data: announcement });
  } catch (err) {
    ErrorResponses(res, err);
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!announcement) {
      return res.status(404).json({ 
        success: false, 
        message: 'Announcement not found' 
      });
    }
    
    res.json({ success: true, data: announcement });
  } catch (err) {
    ErrorResponses(res, err);
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ 
        success: false, 
        message: 'Announcement not found' 
      });
    }
    
    res.json({ success: true, data: {} });
  } catch (err) {
    ErrorResponses(res, err);
  }
};