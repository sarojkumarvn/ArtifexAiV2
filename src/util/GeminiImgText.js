import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const model = new GoogleGenerativeAI(API_KEY).getGenerativeModel({
  model: "gemini-2.0-flash",
});


const base64ToGenerativePart = (base64String) => {
  const [, mimeType, base64Data] =
    base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/) || [];
  if (!mimeType || !base64Data) throw new Error("Invalid base64 string");
  return { inlineData: { data: base64Data, mimeType } };
};

//main function to analyze the image to getback the answer
export const analyzeImageWithPrompt = async (userPrompt, imageBase64) => {
  const defaultPrompt =
    "Analyze the image and provide insights in shorts , if the user needs more information then your response should be more than 100 words and less then 200 words";
  const finalPrompt = `${defaultPrompt} ${userPrompt}`;

  try {
    const result = await model.generateContent([
      finalPrompt,
      base64ToGenerativePart(imageBase64),
    ]);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Image analysis failed: " + error.message);
  }
};
