import PresetDesignSchema from '../models/presetDesign.js';
import UserDesignSchema from '../models/userDesign.js';
import sharp from 'sharp';

export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const processedImage = await sharp(req.file.path)
      .resize(500, 500, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .toBuffer();

    res.json({
      success: true,
      filePath: req.file.path,
      message: 'Logo uploaded successfully'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPresetDesigns = async (req, res) => {
  try {
    const designs = await PresetDesignSchema.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateMockup = async (req, res) => {
  try {
    const { elements, tshirtColor } = req.body;
    
    // Mockup generation logic here
    const mockupUrl = 'mockup_placeholder.png';
    
    res.json({
      success: true,
      mockupUrl
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveDesign = async (req, res) => {
  try {
    const design = new UserDesignSchema(req.body);
    const savedDesign = await design.save();
    res.json({ 
      success: true, 
      designId: savedDesign._id,
      message: 'Design saved successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserDesigns = async (req, res) => {
  try {
    const { userId } = req.params;
    const designs = await UserDesignSchema.find({ userId }).sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserDesign = async (req, res) => {
  try {
    const { designId } = req.params;
    const updatedDesign = await UserDesignSchema.findByIdAndUpdate(
      designId,
      req.body,
      { new: true }
    );
    
    if (!updatedDesign) {
      throw new Error('Design not found');
    }
    
    res.json({
      success: true,
      design: updatedDesign,
      message: 'Design updated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};