import React, { useEffect, useRef, useState } from "react";
import { carddetails } from "../AiChatBot/AiChatBotConstant";
import { analyzeImageWithPrompt } from "../../util/GeminiImgText";
import AIChatbotLoader from "../AiChatBot/AiChatBotLoader";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ImgToTextBotHome = () => {
  const [isChatOpened, setisChatOpened] = useState(false); // history chat button 
  const [history, setHistory] = useState([]); // Stores chat history
  const [userInput, setUserInput] = useState(""); // Stores user input
  const [loading, setLoading] = useState(false); // loader state

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePopupPosition, setImagePopupPosition] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Added for error messages

  const chatEndRef = useRef(null); // Ref for auto-scrolling to the bottom
  const fileInputRef = useRef(null); // Ref for file input
  const imageButtonRef = useRef(null);// Ref for image upload button


    // Toggling the chatbutton
    const toggleChat = () => {
      setisChatOpened(!isChatOpened);
    };



  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Targetting the selected file
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setErrorMessage(""); // Clear any previous error messages

      // Calculate position for the popup
      if (imageButtonRef.current) {
        const rect = imageButtonRef.current.getBoundingClientRect();
        setImagePopupPosition({
          // setting the image popup position
          left: rect.left,
          top: rect.top - 100, // Position above the button
        });
      }
    }
  };



  // Function to generate a bot response using Gemini API
  const generateBotResponse = async (prompt, imageBase64) => {
    setLoading(true);

    // Add a temporary "thinking" message
    setHistory((prevHistory) => [
      ...prevHistory,
      { sender: "bot", message: "Analyzing your image..." },
    ]);

    try {
      // Call the Gemini API service to analyze the image
      const responseText = await analyzeImageWithPrompt(prompt, imageBase64);

      // Remove the temporary "thinking" message and add the actual response
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory.pop(); // Remove the "Analyzing your image..." message
        return [...newHistory, { sender: "bot", message: responseText }];
      });
    } catch (error) {
      console.error("Error generating response:", error);

      // Remove the temporary "thinking" message and add an error message
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory.pop(); // Remove the "Analyzing your image..." message
        return [
          ...newHistory,
          {
            sender: "bot",
            message: "Sorry, I couldn't analyze that image. Please try again.",
          },
        ];
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user input
  const handleUserInput = (e) => {
    e.preventDefault();

    // Both image and text are required
    if (imagePreview && userInput.trim() !== "") {
      // Add user message to history
      setHistory((prevHistory) => [
        ...prevHistory,
        { sender: "user", message: userInput, image: imagePreview },
      ]);

      // calling Generate bot response with the image and prompt
      generateBotResponse(userInput, imagePreview); // main stream

      // Reset states
      setImagePreview(null);
      setSelectedFile(null);
      setUserInput("");
      setErrorMessage(""); // Clear any error messages
      return;
    }

    // Show appropriate error messages if either image or text is missing
    if (!imagePreview) {
      setErrorMessage("Please upload an image first");
    } else if (userInput.trim() === "") {
      setErrorMessage("Please add a prompt for your image");
    }
  };

  // Handling the new chat button
  const handlenewchat = () => {
    setHistory([]); // Clear chat history
    setImagePreview(null);
    setSelectedFile(null);
    setUserInput("");
    setErrorMessage(""); // Clear any error messages
  };

  // Handle removing the image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setErrorMessage(""); // Reset error message when image is removed
  };

  // Added auto scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, loading]);

  return (
    <>
      <AIChatbotLoader />
      <div className="flex h-screen bg-white text-gray-800 overflow-y-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 border-r border-gray-200 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <span className="ml-2 font-medium">My Chats</span>
            </div>
            <button className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white border border-gray-300 rounded-md py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <svg
              className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="mb-6">
            {/* TO be added  */}
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={toggleChat}
              className={`text-white text-xl bg-indigo-600 hover:bg-indigo-500 px-2 py-1 rounded w-full`}
              > 
                <span>Chats</span>
              </button>
            </div>

            {isChatOpened && history.length > 0 && (
              <div className="space-y-2">
                {history.filter((chat)=> chat.sender === "user").map((chat , index)=>(
                  <div
                  key={index}
                  className={`bg-white rounded-md p-3 cursor-pointer hover:bg-gray-50 border border-gray-700`}
                  >
                    <p className="text-gray-900 text-xs">{chat.message}</p>

                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto">
            <button
              onClick={handlenewchat}
              className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md"
            >
              <span>New chat</span>
              <span className="text-xl">+</span>
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center text-lg font-bold">
              <span>Artifex AI</span>
            </div>

            <div className="flex items-center space-x-2">
              <button className="px-4 py-1 text-xs bg-indigo-600 text-white rounded">
                Artifex Ai
              </button>
              <button className="p-1 hover:bg-gray-100 rounded pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {/* Welcome Screen (only shown if no chat history exists) */}
            {history.length === 0 && (
              <div className="flex flex-col items-center text-center my-16">
                <div className="bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  How can I help you today?
                </h2>
                <p className="text-gray-500 text-sm max-w-md">
                  This conversation already is private only to the user by their
                  name, and there is no sharing of personal information with any
                  service outside of the user.
                </p>

                {/* Adver Card section */}
                <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-lg">
                  {carddetails.map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white p-4 rounded-lg text-center shadow-sm border ${
                        index === 1
                          ? "scale-105 border border-blue-800"
                          : "opacity-50 pointer-events-none border border-gray-300"
                      }`}
                    >
                      <div className="w-8 h-8 bg-gray-100 mx-auto mb-2 rounded flex items-center justify-center">
                        {card.icon}
                      </div>
                      <h3 className="text-sm font-medium">{card.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display Chat History */}
            {history.length > 0 && (
              <div className="space-y-4">
                {history.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      chat.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-md p-3 rounded-lg ${
                        chat.sender === "user"
                          ? "bg-green-100 text-green-800 mr-5"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {chat.image && (
                        <img
                          src={chat.image}
                          alt="User uploaded"
                          className="w-32 h-32 object-cover rounded-lg mb-2"
                        />
                      )}
                      {chat.sender === "user" ? (

                      <p className="text-s">{chat.message}</p>
                      ) : (
                        <div className="markdown-content text-sm">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} >
                            {chat.message}

                            </ReactMarkdown > 

                        </div>
                      
                      )}
                    </div>
                  </div>
                ))}
                {/* Loading statement */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-md p-3 rounded-lg bg-gray-100 text-gray-800">
                      <span className="loading loading-dots loading-lg"></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} /> {/* Auto-scroll to this element */}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleUserInput} className="relative">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg pl-4 pr-1 py-1">
                {/* Image upload button with tooltip popup */}
                <div className="relative">
                  <div
                    ref={imageButtonRef}
                    className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-2"
                  >
                    {/* File Upload Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        color="#461717"
                        fill="none"
                      >
                        <path
                          d="M5 21C9.20998 16.2487 13.9412 9.9475 21 14.6734"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                        <path
                          d="M17 4.50012C17.4915 3.99442 18.7998 2.00012 19.5 2.00012M22 4.50012C21.5085 3.99442 20.2002 2.00012 19.5 2.00012M19.5 2.00012V10.0001"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.9999 13C20.998 17.147 20.9472 19.2703 19.6088 20.6088C18.2175 22 15.9783 22 11.5 22C7.02166 22 4.78249 22 3.39124 20.6088C2 19.2175 2 16.9783 2 12.5C2 8.02166 2 5.78249 3.39124 4.39124C4.78249 3 7.02166 3 11.5 3C11.6699 3 14 3.00008 14 3.00008"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                    {/* File input system */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      style={{ display: "none" }} // Hide the file input
                    />
                  </div>

                  {/* Small popup for image preview */}
                  {imagePreview && (
                    <div className="absolute z-10 left-0 -top-29 w-32 bg-gray-100 p-3 mb-200 rounded-lg shadow-lg border border-gray-500">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            color="#461717"
                            fill="none"
                          >
                            <path
                              d="M14.9994 15L9 9M9.00064 15L15 9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Input system */}
                <input
                  type="text"
                  placeholder={
                    imagePreview
                      ? "Add a prompt for your image..."
                      : "First upload an image..."
                  }
                  className="flex-1 bg-transparent outline-none text-gray-800"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />

                <button
                  type="submit"
                  className={`rounded-lg p-2 ml-2 text-white ${
                    !imagePreview || userInput.trim() === ""
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-400"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>

              {/* Error message display */}
              {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
              )}

              {/* Instruction for user */}
              <p className="text-xs text-gray-500 mt-2">
                Please upload an image and add a prompt to analyze it. Both are
                required.
              </p>

              <p className="text-xs text-gray-500 text-center mt-4">
                Artifex Ai can make mistakes. Consider checking important
                information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
