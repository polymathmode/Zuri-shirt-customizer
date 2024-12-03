import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Loader } from 'lucide-react';
import ColorPicker from './ColorPicker';
import TextEditor from './TextEditor';
import DesignPreview from './DesignPreview';
import PresetDesigns from './PresetDesigns';
import { api } from '../service/api';

const TShirtCustomizer = () => {
  const [tshirtColor, setTshirtColor] = useState('#ffffff');
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [presetDesigns, setPresetDesigns] = useState([]);
  const fileInputRef = useRef(null);

  const clearError = () => setError(null);

  useEffect(() => {
    const fetchPresetDesigns = async () => {
      try {
        const designs = await api.getPresetDesigns();
        setPresetDesigns(designs);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPresetDesigns();
  }, []);

  const handleAddText = () => {
    clearError();
    const newText = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Double click to edit',
      position: { x: 200, y: 200 },
      rotation: 0,
      scale: 1,
      fontSize: 24,
      fontFamily: 'Arial',
      color: '#000000'
    };
    setElements(prev => [...prev, newText]);
    setSelectedElement(newText);
  };

  const handleLogoUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      setLoading(true);
      const response = await api.uploadLogo(file);
      
      const newLogo = {
        id: `logo-${Date.now()}`,
        type: 'image',
        content: response.filePath,
        position: { x: 150, y: 150 },
        rotation: 0,
        scale: 1
      };

      setElements(prev => [...prev, newLogo]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleElementUpdate = (updatedElement) => {
    setElements(prev => 
      prev.map(el => el.id === updatedElement.id ? updatedElement : el)
    );
    if (selectedElement && selectedElement.id === updatedElement.id) {
      setSelectedElement(updatedElement);
    }
  };

  const handleElementSelect = (element) => {
    if (element?.type === 'text' && element.content === 'Double click to edit') {
      setSelectedElement({
        ...element,
        content: ''
      });
      handleElementUpdate({
        ...element,
        content: ''
      });
    } else {
      setSelectedElement(element);
    }
  };
  const handleSaveDesign = async () => {
    try {
      setLoading(true);
      // Add your save logic here
      const response = await api.saveDesign({
        elements,
        tshirtColor,
      });
      // Handle success
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMockup = async () => {
    try {
      setLoading(true);
      // Add your mockup generation logic here
      const response = await api.generateMockup({
        elements,
        tshirtColor,
      });
      // Handle success
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Customize Your T-Shirt</h2>
              
              <ColorPicker
                color={tshirtColor}
                onChange={setTshirtColor}
              />

              <div className="mt-4 space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  className="hidden"
                  accept="image/*"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? <Loader className="animate-spin" /> : <Upload />}
                  Upload Logo
                </button>

                <button
                  onClick={handleAddText}
                  className="flex items-center gap-2 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Add Text
                </button>
              </div>

              {selectedElement?.type === 'text' && (
                <TextEditor
                  element={selectedElement}
                  onUpdate={handleElementUpdate}
                />
              )}
            </div>

            <PresetDesigns
              designs={presetDesigns}
              onSelect={(design) => {
                setElements(prev => [...prev, {
                  id: `preset-${Date.now()}`,
                  type: 'image',
                  content: design.imageUrl,
                  position: { x: 150, y: 150 },
                  rotation: 0,
                  scale: 1
                }]);
              }}
            />
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DesignPreview
              tshirtColor={tshirtColor}
              elements={elements}
              selectedElement={selectedElement}
              onElementSelect={handleElementSelect}
              onElementUpdate={handleElementUpdate}
              onSaveDesign={handleSaveDesign}  
              onGenerateMockup={handleGenerateMockup}  
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TShirtCustomizer;