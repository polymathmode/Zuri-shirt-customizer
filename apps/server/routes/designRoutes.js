import express from 'express';
import { 
  uploadLogo, 
  getPresetDesigns, 
  generateMockup, 
  saveDesign,
  getUserDesigns,
  updateUserDesign
} from '../controllers/designController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload-logo', upload.single('logo'), uploadLogo);
router.get('/preset-designs', getPresetDesigns);
router.post('/generate-mockup', generateMockup);
router.post('/save-design', saveDesign);
router.get('/user-designs/:userId', getUserDesigns);
router.put('/user-designs/:designId', updateUserDesign);

export default router;