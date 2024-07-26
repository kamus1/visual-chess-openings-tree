import { useState, useEffect, useRef } from 'react';

const InfiniteCanvas = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        setOffset({
          x: e.clientX - start.x,
          y: e.clientY - start.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset, start]);

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'lightgray',
        overflow: 'hidden',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
          background: 'white',
          padding: '20px',
        }}
      >
        {/*components*/}
        <h2 style={{ color: 'black' }}>Content in the center</h2>
      </div>
    </div>
  );
};

export default InfiniteCanvas;
