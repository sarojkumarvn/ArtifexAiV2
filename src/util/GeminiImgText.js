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
  const defaultPrompt = `You are a helpful Ai Image analyzer , Please respond using Markdown formatting for better readability.
   Guidelines:
    1. Use **bold text** for emphasis or important points.
    2. Use proper markdown for code blocks with language specification:
       \`\`\`javascript
       // Example code
       const example = "This is formatted code";
       \`\`\`
    3. Use bullets or numbered lists where appropriate.
    4. If explaining code, provide code snippets with proper syntax highlighting.
    5. Keep explanations concise but thorough.
    6. Use headings (## or ###) to organize longer responses.
    7. For tables, use proper markdown table format.
    8. if the user wants to extract code from the image, please use the following format:
    \`\`\`code
    // Example code
    const example = "This is formatted code";
    \`\`\`
    9. if the user wants to extract text from the image , Use **bold text** for emphasis or important points, please use the following format:
    \`\`\`text
    // Example text
    const example = "This is formatted text";
    \`\`\`
    10. if the user wants to extract table from the image, please use the following format:
    \`\`\`table
    // Example table
    const example = "This is formatted table";
    \`\`\`
  
  
  
  
  `;
    
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