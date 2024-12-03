
const API_BASE_URL =process.env.NODE_ENV==="production"
 ? "/api"
 :'http://localhost:9090/api';


const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to get error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Server error');
    } catch (error) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
};

export const api = {
  // Upload logo image
  uploadLogo: async (file) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch(`${API_BASE_URL}/upload-logo`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(`Error uploading logo: ${error.message}`);
    }
  },

  // Get preset designs
  getPresetDesigns: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/preset-designs`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(`Error fetching preset designs: ${error.message}`);
    }
  },

  // Save user design
  saveDesign: async (designData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/save-design`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData),
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(`Error saving design: ${error.message}`);
    }
  },

  // Generate mockup
  generateMockup: async (designData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-mockup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData),
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(`Error generating mockup: ${error.message}`);
    }
  }
};