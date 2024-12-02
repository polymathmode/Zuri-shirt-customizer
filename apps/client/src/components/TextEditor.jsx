import React from 'react';

const TextEditor = ({ element, onUpdate }) => {
  const fonts = ['Arial', 'Times New Roman', 'Helvetica', 'Verdana'];
  const sizes = [12, 14, 16, 20, 24, 32, 48];

  const handleChange = (updates) => {
    onUpdate({ ...element, ...updates });
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium">Text Content</label>
        <input
          type="text"
          value={element.content}
          onChange={(e) => handleChange({ content: e.target.value })}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Font Family</label>
        <select
          value={element.fontFamily}
          onChange={(e) => handleChange({ fontFamily: e.target.value })}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Font Size</label>
        <select
          value={element.fontSize}
          onChange={(e) => handleChange({ fontSize: Number(e.target.value) })}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        >
          {sizes.map((size) => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Color</label>
        <input
          type="color"
          value={element.color}
          onChange={(e) => handleChange({ color: e.target.value })}
          className="mt-1"
        />
      </div>
    </div>
  );
};


export default TextEditor