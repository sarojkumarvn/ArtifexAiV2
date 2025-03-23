import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is correctly loaded from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const currentDate = new Date().toLocaleDateString("en-US", { //accessing the date 
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Function to get AI response
export const getAiResponse = async (userInput) => {
  try {
    const prompt = `Your name is Artifex ai and you are a helpful assistant. Please respond to this message: ${userInput} , Your answer should be short . The maximun length of the response is 100 words , if the user needs more information then your response should be more than 100 words . If the user ask about the  date of today then your response should be the date of today  is ${currentDate}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, something went wrong. Please try again.";
  }
};
