
import React from 'react';

const TextEditor = ({ element, onUpdate }) => {
  const fonts = ['Arial', 'Times New Roman', 'Helvetica', 'Verdana', 'Comic Sans MS', 'Courier New'];
  const sizes = [12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64];

  const handleChange = (key, value) => {
    onUpdate({
      ...element,
      [key]: value
    });
  };

  return (
    <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded-md">
      <h3 className="font-semibold text-lg mb-2">Edit Text</h3>
      
      {/* Text Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Content
        </label>
        <input
          type="text"
          value={element.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Family
        </label>
        <select
          value={element.fontFamily}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fonts.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Size
        </label>
        <select
          value={element.fontSize}
          onChange={(e) => handleChange('fontSize', Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <input
          type="color"
          value={element.color}
          onChange={(e) => handleChange('color', e.target.value)}
          className="w-full h-10 p-1 border border-gray-300 rounded-md"
        />
      </div>

      {/* Scale Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size Scale
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={element.scale}
          onChange={(e) => handleChange('scale', Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Rotation Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rotation (degrees)
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={element.rotation}
          onChange={(e) => handleChange('rotation', Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TextEditor;
