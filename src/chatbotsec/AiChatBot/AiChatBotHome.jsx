import { useState, useEffect, useRef } from "react";
import { carddetails, chats } from "./AiChatBotConstant";
import { getAiResponse } from "../../util/GeminiApiText";
import AIChatbotLoader from "./AiChatBotLoader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GiExitDoor } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsChatText } from "react-icons/bs";

export const AiChatBotHome = () => {
  const [isChatOpened, setisChatOpened] = useState(false);
  const [history, setHistory] = useState([]); // Stores chat history
  const [userInput, setUserInput] = useState(""); // Stores user input
  const [loading, setLoading] = useState(false); // loader state
  const chatEndRef = useRef(null); // Ref for auto-scrolling to the bottom
  const [isSidebarOpened, setisSidebarOpened] = useState(true);

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
      <div className="flex flex-col md:flex-row h-screen w-full bg-white text-gray-800 overflow-y-hidden">
        {/* Sidebar */}

        {isSidebarOpened ? (
          <div className="w-full md:w-1/4 bg-gray-100 border-r border-gray-200 p-4 flex flex-col">
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
              <button
                onClick={() => {
                  setisSidebarOpened(!isSidebarOpened);
                }}
                className="text-gray-500 hover:scale-105 transition-transform duration-300"
              >
                <BsArrowLeftSquareFill className="text-2xl" />
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
                  className="text-white text-xl bg-indigo-600 px-2 py-1 rounded w-full"
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
                        className="bg-white rounded-md p-3 cursor-pointer hover:bg-gray-50 border border-gray-200"
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
                className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md"
              >
                <span>New chat</span>
                <span className="text-xl">+</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-auto md:w-10 bg-gray-100 border-r border-gray-200 p-2 flex flex-col">
            <button
              onClick={() => {
                setisSidebarOpened(!isSidebarOpened);
              }}
              className="text-gray-500 mt-3 hover:scale-105 transition-transform duration-300"
            >
              <BsFillArrowRightSquareFill className="text-2xl" />
            </button>

            <button
              className="text-black mt-7 ml-1 text-xl hover:scale-105 transition-transform duration-300 tooltip tooltip-right"
              data-tip="Chat"
              onClick={() => {
                setisSidebarOpened(!isSidebarOpened);
                toggleChat();
              }}
            >
              <BsChatText />
            </button>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center text-lg font-bold">
              <span>Artifex AI</span>
            </div>
            {/* Restart and exit buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
              {!isSidebarOpened && (
                <div>
                  <button
                    onClick={handlenewchat}
                    className="px-4 flex flex-row py-1 text-sm text-bold bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 hover:scale-105 tooltip tooltip-bottom"
                    data-tip="Refresh"
                  >
                    Refresh
                    <span className="text-sm ml-1">↻</span>
                  </button>
                </div>
              )}
              <Link to="/">
                <button
                  className="px-4 flex flex-row py-1 text-sm text-bold bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 hover:scale-105 tooltip tooltip-bottom"
                  data-tip="Exit"
                >
                  Exit
                  <GiExitDoor style={{ fontSize: "20px" }} />
                </button>
              </Link>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 min-h-0">
            {/* Welcome Screen (only shown if no chat history exists) */}
            {history.length === 0 && (
              <div className="flex flex-col items-center text-center my-8 md:my-16">
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
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  How can I help you today?
                </h2>
                <p className="text-gray-500 text-sm max-w-md px-4">
                  This conversation already is private only to the user by their
                  name, and there is no sharing of personal information with any
                  service outside of the user.
                </p>

                {/* Adver Card section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-lg px-4">
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
                      className={`max-w-[90%] md:max-w-md p-3 rounded-lg ${
                        chat.sender === "user"
                          ? "bg-green-100 text-green-800 md:mr-5"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {chat.sender === "user" ? (
                        <p className="text-sm">{chat.message}</p>
                      ) : (
                        <div className="markdown-content text-sm">
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
                  className={`bg-indigo-700 hover:bg-indigo-600 rounded-lg p-2 ml-2 text-white ${
                    userInput.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
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