import React from 'react';

const ColorPicker = ({ color, onChange }) => {
  const colors = [
    '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#808080', '#800000'
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">T-Shirt Color</label>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            className={`w-8 h-8 rounded-full border-2 ${
              c === color ? 'border-blue-500' : 'border-gray-200'
            }`}
            style={{ backgroundColor: c }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>
    </div>
  );
};


export default ColorPicker