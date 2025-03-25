import { useEffect, useRef } from 'react'

export const Main = () => {
     const canvasRef = useRef(null);
      useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
    
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        // Particle array
        const particles = [];
        const particleCount = 50;
    
        // Particle class
        class Particle {
          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
          }
    
          update() {
            this.x += this.speedX;
            this.y += this.speedY;
    
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
          }
    
          draw() {
            ctx.fillStyle = "rgba(59, 130, 246, 0.5)"; // Blue color with transparency
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
    
        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
    
        // Animation function
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((particle) => {
            particle.update();
            particle.draw();
          });
          animationFrameId = requestAnimationFrame(animate);
        };
    
        animate();
    
        // Cleanup
        return () => {
          cancelAnimationFrame(animationFrameId);
        };
      }, []);
    
  return (
    
    <main className="max-w-7xl mx-auto px-6 py-12 h-screen flex justify-center items-center relative">
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: "rgba(255, 255, 255, 0.1)" }}
    />
    <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
      <h1 className="text-6xl font-bold text-gray-900 mb-6">
        Experience the <span className="text-blue-500">Future</span> of AI
        Communication
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Artifex AI brings together image recognition, text generation, and
        content creation in a seamless experience.
      </p>
      <div className="flex items-center justify-center space-x-4">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Get Started
        </button>
        <button className="text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Explore Features
        </button>
      </div>
    </div>
  </main>
   
  )
} 