import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Converts a base64 image string to the format expected by Gemini API
 * @param {string} base64String - The base64 encoded image (including data URI)
 * @returns {Object} - Object formatted for Gemini API containing the image data
 */
const base64ToGenerativePart = (base64String) => {
  // Extract the MIME type and actual base64 data
  const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }
  
  const mimeType = matches[1];
  const base64Data = matches[2];
  
  return {
    inlineData: {
      data: base64Data,
      mimeType
    }
  };
};

/**
 * Analyzes an image with a text prompt using Gemini API
 * @param {string} prompt - The text prompt describing what to analyze in the image
 * @param {string} imageBase64 - The base64 encoded image data
 * @returns {Promise<string>} - Promise resolving to the AI-generated response
 */
export const analyzeImageWithPrompt = async (prompt, imageBase64) => {
  try {
    // Convert the base64 image to the format Gemini expects
    const imagePart = base64ToGenerativePart(imageBase64);
    
    // Send the prompt and image to Gemini
    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text();
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    throw new Error("Failed to analyze image: " + error.message);
  }
};

/**
 * Utility function to convert a file to the generative part format
 * (For use with files from disk, not used in the React component)
 * @param {string} path - Path to the image file
 * @param {string} mimeType - MIME type of the image
 * @returns {Object} - Object formatted for Gemini API
 */
export const fileToGenerativePart = (path, mimeType) => {
  // In a browser environment, this implementation would need to be modified
  // This is here for reference to show how the Node.js version would work
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
};