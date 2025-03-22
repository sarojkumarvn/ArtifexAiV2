import React, { useState, useEffect } from "react";

const TestimonialSlider = () => {
  const testimonials = [
    {
      text: "ArtifexAI has revolutionized the way we generate content. The text-to-text and image-to-text features are incredibly accurate and easy to use!",
      author: "John Doe",
    },
    {
      text: "The image generation feature is mind-blowing. It's like having a professional designer at your fingertips.",
      author: "Jane Smith",
    },
    {
      text: "I've tried many AI tools, but ArtifexAI stands out with its seamless integration and powerful features.",
      author: "Mike Johnson",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [testimonials.length]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg bg-white">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0 p-8 text-center"
          >
            <p className="text-lg text-gray-700">{testimonial.text}</p>
            <span className="block mt-4 text-gray-600 font-semibold">
              - {testimonial.author}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
      >
        &#10094;
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
      >
        &#10095;
      </button>

      {/* Dots for Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;