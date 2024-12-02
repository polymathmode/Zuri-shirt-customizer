// import React, { useState, useRef } from 'react';
//  import { Upload, Camera } from 'lucide-react';
// import ColorPicker from './ColorPicker';
// import TextEditor from './TextEditor';
// import DesignPreview from './DesignPreview';
// import PresetDesigns from './PreDesigns';
// // import { Alert, AlertDescription } from '@/components/ui/alert';

// const TShirtCustomizer = () => {
//   const [tshirtColor, setTshirtColor] = useState('#ffffff');
//   const [elements, setElements] = useState([]);
//   const [selectedElement, setSelectedElement] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleAddText = () => {
//     const newText = {
//       id: `text-${Date.now()}`,
//       type: 'text',
//       content: 'Double click to edit',
//       position: { x: 150, y: 150 },
//       rotation: 0,
//       scale: 1,
//       fontSize: 20,
//       fontFamily: 'Arial',
//       color: '#000000'
//     };
//     setElements([...elements, newText]);
//   };

//   const handleLogoUpload = async (event) => {
//     try {
//       const file = event.target.files[0];
//       if (!file) return;

//       setLoading(true);
//       const formData = new FormData();
//       formData.append('logo', file);

//       const response = await fetch('http://localhost:5000/api/upload-logo', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) throw new Error('Upload failed');

//       const data = await response.json();
//       const newLogo = {
//         id: `logo-${Date.now()}`,
//         type: 'image',
//         content: data.filePath,
//         position: { x: 150, y: 150 },
//         rotation: 0,
//         scale: 1
//       };

//       setElements([...elements, newLogo]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleElementUpdate = (updatedElement) => {
//     setElements(elements.map(el => 
//       el.id === updatedElement.id ? updatedElement : el
//     ));
//   };

//   const handleSaveDesign = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/save-design', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           elements,
//           tshirtColor,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to save design');

//       const data = await response.json();
//       // Handle successful save
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Left Panel - Controls */}
//           <div className="space-y-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-bold mb-4">Customize Your T-Shirt</h2>
              
//               {/* Color Picker */}
//               <ColorPicker
//                 color={tshirtColor}
//                 onChange={setTshirtColor}
//               />

//               {/* Upload Logo Button */}
//               <div className="mt-4">
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleLogoUpload}
//                   className="hidden"
//                   accept="image/*"
//                 />
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                   disabled={loading}
//                 >
//                   <Upload size={20} />
//                   Upload Logo
//                 </button>
//               </div>

//               {/* Add Text Button */}
//               <button
//                 onClick={handleAddText}
//                 className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//               >
//                 Add Text
//               </button>

//               {/* Text Editor */}
//               {selectedElement?.type === 'text' && (
//                 <TextEditor
//                   element={selectedElement}
//                   onUpdate={handleElementUpdate}
//                 />
//               )}
//             </div>

//             {/* Preset Designs */}
//             <PresetDesigns
//               onSelect={(design) => {
//                 setElements([...elements, {
//                   id: `preset-${Date.now()}`,
//                   type: 'image',
//                   content: design.imageUrl,
//                   position: { x: 150, y: 150 },
//                   rotation: 0,
//                   scale: 1
//                 }]);
//               }}
//             />
//           </div>

//           {/* Right Panel - Preview */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <DesignPreview
//               tshirtColor={tshirtColor}
//               elements={elements}
//               selectedElement={selectedElement}
//               onElementSelect={setSelectedElement}
//               onElementUpdate={handleElementUpdate}
//             />

//             <button
//               onClick={handleSaveDesign}
//               className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? 'Saving...' : 'Save Design'}
//             </button>
//           </div>
//         </div>

//         {/* Error Alert */}
//         {error && (
//           <Alert variant="destructive" className="mt-4">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TShirtCustomizer;

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Loader } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import ColorPicker from './ColorPicker';
import TextEditor from './TextEditor';
import DesignPreview from './DesignPreview';
import PresetDesigns from './PresetDesigns';
import { api } from '../service/api';

const TShirtCustomiser = () => {
  const [tshirtColor, setTshirtColor] = useState('#ffffff');
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [presetDesigns, setPresetDesigns] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch preset designs on component mount
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
    const newText = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Double click to edit',
      position: { x: 150, y: 150 },
      rotation: 0,
      scale: 1,
      fontSize: 20,
      fontFamily: 'Arial',
      color: '#000000'
    };
    setElements([...elements, newText]);
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

      setElements([...elements, newLogo]);
      console.log(newLogo)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleElementUpdate = (updatedElement) => {
    setElements(elements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    ));
  };

  const handleSaveDesign = async () => {
    try {
      setLoading(true);
      const designData = {
        elements,
        tshirtColor,
      };
      
      const response = await api.saveDesign(designData);
      // Handle successful save (e.g., show success message)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMockup = async () => {
    try {
      setLoading(true);
      const mockupData = {
        elements,
        tshirtColor,
      };
      
      const response = await api.generateMockup(mockupData);
      // Handle mockup generation (e.g., show download link)
    } catch (err) {
      setError(err.message);
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
                setElements([...elements, {
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
              onElementSelect={setSelectedElement}
              onElementUpdate={handleElementUpdate}
            />

            <div className="mt-4 space-y-4">
              <button
                onClick={handleSaveDesign}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Design'}
              </button>

              <button
                onClick={handleGenerateMockup}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Mockup'}
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default TShirtCustomiser;