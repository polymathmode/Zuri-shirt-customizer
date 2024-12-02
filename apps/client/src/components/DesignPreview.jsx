

import React, { useRef, useEffect } from 'react';

const DesignPreview = ({
  tshirtColor,
  elements,
  selectedElement,
  onElementSelect,
  onElementUpdate
}) => {
  const canvasRef = useRef(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawElements = async () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw t-shirt background
      ctx.fillStyle = tshirtColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elements
      for (const element of elements) {
        if (element.type === 'text') {
          ctx.save();
          ctx.translate(element.position.x, element.position.y);
          ctx.rotate((element.rotation * Math.PI) / 180);
          ctx.scale(element.scale, element.scale);
          
          ctx.font = `${element.fontSize}px ${element.fontFamily}`;
          ctx.fillStyle = element.color;
          ctx.fillText(element.content, 0, 0);
          ctx.restore();
        } else if (element.type === 'image') {
          try {
            // Create full URL for the image
            const imageUrl = `http://localhost:9090/${element.content}`;
            
            // Create and load image
            const img = new Image();
            img.crossOrigin = 'anonymous'; // Enable CORS
            
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = imageUrl;
            });

            // Draw image
            ctx.save();
            ctx.translate(element.position.x, element.position.y);
            ctx.rotate((element.rotation * Math.PI) / 180);
            ctx.scale(element.scale, element.scale);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();
          } catch (error) {
            console.error('Error loading image:', error);
          }
        }
      }
    };

    drawElements();
  }, [tshirtColor, elements]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked element
    const clicked = elements.find(element => {
      const bounds = {
        left: element.position.x - 25,
        right: element.position.x + 25,
        top: element.position.y - 25,
        bottom: element.position.y + 25
      };
      return x >= bounds.left && x <= bounds.right && 
             y >= bounds.top && y <= bounds.bottom;
    });

    if (clicked) {
      onElementSelect(clicked);
      isDragging.current = true;
      lastPosition.current = { x, y };
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
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={500}
        className="border rounded-md w-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Optional: Add controls for selected element */}
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
            className="p-1 bg-blue-500 text-white rounded"
          >
            Zoom Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignPreview;