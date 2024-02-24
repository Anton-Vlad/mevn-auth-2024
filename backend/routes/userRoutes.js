import express from 'express';
const router = express.Router();
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    refreshUserToken } from '../controllers/userController.js'; //dont forget the file extension
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/refresh-token').post(protect, refreshUserToken)

export default router;