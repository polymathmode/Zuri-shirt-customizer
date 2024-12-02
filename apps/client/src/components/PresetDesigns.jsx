import React, { useState, useEffect } from 'react';

const PresetDesigns = ({ onSelect }) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:9090/api/preset-designs');
        if (!response.ok) throw new Error('Failed to fetch designs');
        const data = await response.json();
        setDesigns(data);
      } catch (error) {
        console.error('Error fetching designs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  if (loading) return <div>Loading designs...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Preset Designs</h3>
      <div className="grid grid-cols-2 gap-4">
        {designs.map((design) => (
          <button
            key={design._id}
            onClick={() => onSelect(design)}
            className="p-2 border rounded-md hover:bg-gray-50"
          >
            <img
              src="/api/placeholder/100/100"
              alt={design.name}
              className="w-full h-auto"
            />
            <p className="mt-2 text-sm">{design.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
export default PresetDesigns