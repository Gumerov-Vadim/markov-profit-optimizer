import React, { useEffect, useRef } from 'react';

const GraphCanvas = ({ edgeDistancesMatrix }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const numNodes = edgeDistancesMatrix.length;
    const nodeRadius = 20;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges with arrow directions and distances
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        if (edgeDistancesMatrix[i][j] > 1) {
          const angle1 = (2 * Math.PI * i) / numNodes;
          const angle2 = (2 * Math.PI * j) / numNodes;

          const x1 = canvas.width / 2 + (canvas.width / 2 - nodeRadius) * Math.cos(angle1);
          const y1 = canvas.height / 2 + (canvas.height / 2 - nodeRadius) * Math.sin(angle1);

          const x2 = canvas.width / 2 + (canvas.width / 2 - nodeRadius) * Math.cos(angle2);
          const y2 = canvas.height / 2 + (canvas.height / 2 - nodeRadius) * Math.sin(angle2);

          drawArrow(ctx, x1, y1, x2, y2, edgeDistancesMatrix[i][j]);
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < numNodes; i++) {
      const angle = (2 * Math.PI * i) / numNodes;
      const x = canvas.width / 2 + (canvas.width / 2 - nodeRadius) * Math.cos(angle);
      const y = canvas.height / 2 + (canvas.height / 2 - nodeRadius) * Math.sin(angle);

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#3498db"; // Node color
      ctx.fill();
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "12px Arial";
      ctx.fillText(i + 1, x, y);
    }
  }, [edgeDistancesMatrix]);

  // Draw arrow function (unchanged)
  const drawArrow = (context, x1, y1, x2, y2, distance) =>  {
    const headSize = 10; // Adjust arrowhead size as needed
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const x3 = x2 - 20 * (x2 - x1) / Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const y3 = y2 - 20 * (y2 - y1) / Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x3, y3);

    context.lineTo(x3 - headSize * Math.cos(angle - Math.PI / 6), y3 - headSize * Math.sin(angle - Math.PI / 6));
    context.moveTo(x3, y3);
    context.lineTo(x3 - headSize * Math.cos(angle + Math.PI / 6), y3 - headSize * Math.sin(angle + Math.PI / 6));

    context.strokeStyle = "#2c3e50"; // Edge color
    context.lineWidth = 2;
    context.stroke();

    // Display distance on the edge
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    context.fillStyle = "#99C";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "24px Arial";
    context.fillText(distance, midX, midY);
};

  return (
    <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
  );
};

export default GraphCanvas;
