import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateImagesWithGemini = async (prompt, count, aspectRatio) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
      generationConfig: { responseModalities: ["Text", "Image"] },
    });

    // ✅ Ensure multiple images are requested properly
    const imagePromises = Array.from({ length: count }, (_, i) =>
      model.generateContent([{ text: i === 0 ? prompt : `${prompt} (variation ${i + 1})` }])
    );

    const responses = await Promise.allSettled(imagePromises); // ✅ Handle all API calls properly

    return responses.map((result, index) => {
      if (result.status === "fulfilled") {
        return extractImage(result.value, index, prompt, aspectRatio);
      } else {
        console.error(`Error for image ${index + 1}:`, result.reason); // ✅ Added better error logging
        return createPlaceholder(index, prompt, aspectRatio, result.reason?.message);
      }
    });
  } catch (error) {
    console.error("Error generating images:", error);
    return Array.from({ length: count }, (_, i) =>
      createPlaceholder(i, prompt, aspectRatio, error.message)
    );
  }
};

const extractImage = (response, index, prompt, aspectRatio) => {
  // ✅ Validate API response structure to prevent crashes
  if (!response || !response.response || !response.response.candidates) {
    console.error("Invalid API response format:", response);
    return createPlaceholder(index, prompt, aspectRatio, "Invalid API response");
  }

  const candidate = response.response.candidates[0];

  // ✅ Ensure we correctly fetch the image data
  const imagePart = candidate?.content?.parts?.find(part => part.inlineData);

  if (imagePart) {
    return {
      id: Date.now() + index,
      url: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
      prompt,
      isPlaceholder: false,
    };
  } else {
    console.error(`No image data found for response index ${index}:`, response);
    return createPlaceholder(index, prompt, aspectRatio, "No image data found");
  }
};

// ✅ Improved error handling for placeholder images
const createPlaceholder = (index, prompt, aspectRatio, error = null) => ({
  id: Date.now() + index,
  url: `/api/placeholder/${getImageDimensions(aspectRatio)}`,
  prompt,
  isPlaceholder: true,
  error,
});

// ✅ Ensure correct image dimensions for different aspect ratios
const getImageDimensions = (ratio) => ({
  landscape: "100/75",
  portrait: "75/100",
  square: "65/65",
}[ratio] || "65/65");
