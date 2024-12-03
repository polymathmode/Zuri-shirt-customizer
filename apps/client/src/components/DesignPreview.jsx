
import React, { useRef, useEffect } from 'react';

const DesignPreview = ({
  tshirtColor,
  elements,
  selectedElement,
  onElementSelect,
  onElementUpdate,
  handleSaveDesign,  
  handleGenerateMockup,  
  loading
}) => {
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const drawTShirt = (ctx) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set t-shirt color
    ctx.fillStyle = tshirtColor;

    // Begin t-shirt path
    ctx.beginPath();

    // Collar
    ctx.moveTo(width * 0.35, height * 0.1); 
    ctx.quadraticCurveTo(width * 0.5, height * 0.05, width * 0.65, height * 0.1); // Neck curve

    // Shoulders
    ctx.lineTo(width * 0.8, height * 0.15); 
    ctx.lineTo(width * 0.9, height * 0.3); 

    // Right side
    ctx.lineTo(width * 0.85, height * 0.45); 
    ctx.lineTo(width * 0.8, height * 0.45); 
    ctx.lineTo(width * 0.8, height * 0.9); 

    // Bottom
    ctx.quadraticCurveTo(width * 0.5, height * 0.95, width * 0.2, height * 0.9);

    // Left side
    ctx.lineTo(width * 0.2, height * 0.45); // Left body
    ctx.lineTo(width * 0.15, height * 0.45); // Left sleeve bottom
    ctx.lineTo(width * 0.1, height * 0.3); // Left sleeve
    ctx.lineTo(width * 0.2, height * 0.15); // Left shoulder
    ctx.closePath();

    // Fill t-shirt
    ctx.fill();

    // Add shadows for depth
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add collar detail
    ctx.beginPath();
    ctx.moveTo(width * 0.4, height * 0.11);
    ctx.quadraticCurveTo(width * 0.5, height * 0.09, width * 0.6, height * 0.11);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const handleDoubleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked text element
    const clickedText = elements.find(element => {
      if (element.type === 'text') {
        const ctx = canvasRef.current.getContext('2d');
        ctx.font = `${element.fontSize}px ${element.fontFamily}`;
        const metrics = ctx.measureText(element.content);
        
        const centerX = element.position.x;
        const centerY = element.position.y;
        const width = metrics.width * element.scale;
        const height = element.fontSize * element.scale;
        
        return x >= centerX - width/2 - 10 &&
               x <= centerX + width/2 + 10 &&
               y >= centerY - height/2 - 10 &&
               y <= centerY + height/2 + 10;
      }
      return false;
    });

    if (clickedText) {
      onElementSelect(clickedText);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawElements = async () => {
      // Draw t-shirt first
      drawTShirt(ctx);

      // Draw elements
      for (const element of elements) {
        ctx.save();
        
        if (element.type === 'text') {
          // Set up text properties
          ctx.translate(element.position.x, element.position.y);
          ctx.rotate((element.rotation * Math.PI) / 180);
          ctx.scale(element.scale, element.scale);
          
          // Configure text style
          ctx.font = `${element.fontSize}px ${element.fontFamily}`;
          ctx.fillStyle = element.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Draw text
          ctx.fillText(element.content, 0, 0);
          
          // Draw selection border if element is selected
          if (selectedElement && selectedElement.id === element.id) {
            const metrics = ctx.measureText(element.content);
            const height = element.fontSize;
            
            ctx.strokeStyle = '#0000ff';
            ctx.lineWidth = 1 / element.scale;
            ctx.setLineDash([5 / element.scale]);
            ctx.strokeRect(
              -metrics.width / 2 - 5,
              -height / 2 - 5,
              metrics.width + 10,
              height + 10
            );
          }
        } else if (element.type === 'image') {
          try {
            const imageUrl = `http://localhost:9090/${element.content}`;
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = imageUrl;
            });

            ctx.translate(element.position.x, element.position.y);
            ctx.rotate((element.rotation * Math.PI) / 180);
            ctx.scale(element.scale, element.scale);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
          } catch (error) {
            console.error('Error loading image:', error);
          }
        }
        
        ctx.restore();
      }
    };

    drawElements();
  }, [tshirtColor, elements, selectedElement]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = elements.find(element => {
      if (element.type === 'text') {
        const ctx = canvasRef.current.getContext('2d');
        ctx.font = `${element.fontSize}px ${element.fontFamily}`;
        const metrics = ctx.measureText(element.content);
        
        // Calculate bounds considering rotation and scale
        const centerX = element.position.x;
        const centerY = element.position.y;
        const width = metrics.width * element.scale;
        const height = element.fontSize * element.scale;
        
        // Simple rectangular bounds check
        return x >= centerX - width/2 - 10 &&
               x <= centerX + width/2 + 10 &&
               y >= centerY - height/2 - 10 &&
               y <= centerY + height/2 + 10;
      } else if (element.type === 'image') {
        // Add image click detection
        const centerX = element.position.x;
        const centerY = element.position.y;
        const width = 100 * element.scale;
        const height = 100 * element.scale;

        return x >= centerX - width/2 &&
               x <= centerX + width/2 &&
               y >= centerY - height/2 &&
               y <= centerY + height/2;
      }
      return false;
    });

    if (clicked) {
      onElementSelect(clicked);
      isDragging.current = true;
      lastPosition.current = { x, y };
    } else {
      onElementSelect(null);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !selectedElement) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastPosition.current.x;
    const dy = y - lastPosition.current.y;

    onElementUpdate({
      ...selectedElement,
      position: {
        x: selectedElement.position.x + dx,
        y: selectedElement.position.y + dy
      }
    });

    lastPosition.current = { x, y };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };


  return (
    <div className="relative flex flex-col">
      <canvas
        ref={canvasRef}
        width={400}
        height={500}
        className="border rounded-md w-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      />
      
      {/* Controls for selected element */}
      {selectedElement && (
        <div className="absolute top-2 right-2 bg-white p-2 rounded shadow">
          <button 
            onClick={() => {
              onElementUpdate({
                ...selectedElement,
                scale: selectedElement.scale + 0.1
              });
            }}
            className="p-1 bg-blue-500 text-white rounded mr-2"
          >
            Zoom In
          </button>
          <button 
            onClick={() => {
              onElementUpdate({
                ...selectedElement,
                scale: Math.max(0.1, selectedElement.scale - 0.1)
              });
            }}
            className="p-1 bg-blue-500 text-white rounded mr-2"
          >
            Zoom Out
          </button>
          <button 
            onClick={() => {
              onElementUpdate({
                ...selectedElement,
                rotation: (selectedElement.rotation + 15) % 360
              });
            }}
            className="p-1 bg-blue-500 text-white rounded"
          >
            Rotate
          </button>
        </div>
      )}

      {/* Save and Generate Mockup Buttons */}
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
  );
};

export default DesignPreview;