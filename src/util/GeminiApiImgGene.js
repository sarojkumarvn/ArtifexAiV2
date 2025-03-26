import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateImagesWithGemini = async (prompt, count, aspectRatio) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
      generationConfig: { responseModalities: ["Text", "Image"] },
    });

    // ✅ Delay function to avoid API rate limits (optional)
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // ✅ Ensure multiple images are requested properly
    const imagePromises = Array.from({ length: count }, async (_, i) => {
      await delay(i * 500); // Delay each request slightly
      return model.generateContent([{ text: i === 0 ? prompt : `${prompt} (variation ${i + 1})` }]);
    });

    const responses = await Promise.allSettled(imagePromises);

    return responses.map((result, index) => {
      if (result.status === "fulfilled") {
        return extractImage(result.value, index, prompt, aspectRatio);
      } else {
        console.error(`❌ API Error for image ${index + 1}:`, JSON.stringify(result.reason, null, 2));
        return createPlaceholder(index, prompt, aspectRatio, result.reason?.message);
      }
    });
  } catch (error) {
    console.error("🚨 Error generating images:", error);
    return Array.from({ length: count }, (_, i) =>
      createPlaceholder(i, prompt, aspectRatio, error.message)
    );
  }
};

// ✅ Extract image data safely
const extractImage = (response, index, prompt, aspectRatio) => {
  if (!response?.response?.candidates?.length) {
    console.error("⚠️ Invalid API response format:", response);
    return createPlaceholder(index, prompt, aspectRatio, "Invalid API response");
  }

  const candidate = response.response.candidates[0];
  const imagePart = candidate?.content?.parts?.find((part) => part.inlineData);

  if (imagePart?.inlineData?.data) {
    return {
      id: Date.now() + index,
      url: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`,
      prompt,
      isPlaceholder: false,
    };
  } else {
    console.error(`⚠️ No image data found for response index ${index}:`, response);
    return createPlaceholder(index, prompt, aspectRatio, "No image data found");
  }
};

// ✅ Improved placeholder handling
const createPlaceholder = (index, prompt, error = null) => ({
  id: Date.now() + index,
  url: `/images/placeholder.png`, // Ensure you have this placeholder image in your project
  prompt,
  isPlaceholder: true,
  error,
});

// ✅ Correct dimensions based on aspect ratio
const getImageDimensions = (ratio) =>
  ({
    landscape: "100/75",
    portrait: "75/100",
    square: "65/65",
  }[ratio] || "65/65");

