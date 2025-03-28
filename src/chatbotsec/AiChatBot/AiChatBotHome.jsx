import { useState, useEffect, useRef } from "react";
import { carddetails, chats } from "./AiChatBotConstant";
import { getAiResponse } from "../../util/GeminiApiText";
import { useUser } from "@clerk/clerk-react";
import AIChatbotLoader from "./AiChatBotLoader";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AiChatBotHome = () => {
  const [isChatOpened, setisChatOpened] = useState(false);
  const [history, setHistory] = useState([]); // Stores chat history
  const [userInput, setUserInput] = useState(""); // Stores user input
  const [loading, setLoading] = useState(false); // loader state
  const chatEndRef = useRef(null); // Ref for auto-scrolling to the bottom

  const { isLoaded, user } = useUser();

  const toggleChat = () => {
    setisChatOpened(!isChatOpened);
  };

  // Function to generate a bot response
  const generateBotResponse = async () => {
    setLoading(true); // show the loader
    setTimeout(async () => {
      try {
        const response = await getAiResponse(userInput);
        setHistory((prevHistory) => [
          ...prevHistory,
          { sender: "bot", message: response },
        ]);
      } catch (error) {
        console.error("Error generating bot response:", error);
        setHistory((prevHistory) => [
          ...prevHistory,
          {
            sender: "bot",
            message: "Sorry, something went wrong. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  // Function to handle user input
  const handleUserInput = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    // Add user's message to history
    setHistory((prevHistory) => [
      ...prevHistory,
      { sender: "user", message: userInput },
    ]);

    setUserInput(""); // Clear the input field
    generateBotResponse(); // Generate bot response
  };

  // Function to handle new chat
  const handlenewchat = () => {
    setHistory([]); // Clear chat history
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
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={toggleChat}
                className="text-white text-xl bg-green-600 px-2 py-1 rounded w-full"
              >
                <span>Chats</span>
              </button>
            </div>
            {/* chat history to save in the sidebar */}
            {isChatOpened && (
              <div className="space-y-2">
                {history
                  .filter((chat) => chat.sender === "user")
                  .map((chat, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-md p-3 cursor-pointer hover:bg-gray-50 border border-gray-200 `}
                    >
                      <p className="text-gray-800 text-sm">{chat.message}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="mt-auto">
            <button
              onClick={handlenewchat}
              className="flex items-center justify-between w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md"
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
              <button className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                {isLoaded ? (
                  <span>{user.firstName}</span>
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
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
                      className={`bg-white p-4 rounded-lg text-center shadow-sm border border-gray-200 ${
                        index === 0 ? "" : "opacity-50 pointer-events-none"
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
                      {chat.sender === "user" ? (
                        <p className="text-sm">{chat.message}</p>
                      ) : (
                        <div className="markdown-content text-sm">
                          {/* Adding remarkable for markdown */}
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {chat.message}
                          </ReactMarkdown>
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
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
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
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="flex-1 bg-transparent outline-none text-gray-800"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-500 rounded-lg p-2 ml-2 text-white"
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
            </form>
            <p className="text-xs text-gray-500 text-center mt-4">
              Artifex Ai can make mistakes. Consider checking important
              information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};