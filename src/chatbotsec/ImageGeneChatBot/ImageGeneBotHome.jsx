import React, { useState, useRef, useEffect } from "react";
import { generateImagesWithGemini } from "../../util/GeminiApiImgGene";
import { carddetails } from "../AiChatBot/AiChatBotConstant";
import AIChatbotLoader from "../AiChatBot/AiChatBotLoader";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsChatText } from "react-icons/bs";
import { GiExitDoor } from "react-icons/gi";
import { Link } from "react-router-dom";

export const ImageGeneBotHome = () => {
  const [prompt, setPrompt] = useState("");
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [imageCount, setImageCount] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("square");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpened, setisSidebarOpened] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setWindowDimensions({ width: innerWidth, height: innerHeight });
      if (innerWidth < 779 || innerHeight < 611) {
        setShowSidebar(false);
        setisSidebarOpened(false);
        setShowFooter(false);
      } else {
        setShowSidebar(true);
        setisSidebarOpened(true);
        setShowFooter(true);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add chat container ref for auto-scrolling
  const chatContainerRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpened(!isChatOpened);
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handlenewchat = () => {
    setMessages([]); // Clear chat history
    setIsLoading(false);
    setPrompt("");
    setImageCount(1);
    setAspectRatio("square");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: prompt,
      metadata: {
        count: imageCount,
        ratio: aspectRatio,
        timestamp: new Date().toLocaleTimeString(),
      },
    };
    setMessages([...messages, userMessage]);

    // Clear input immediately after adding message
    setPrompt("");

    // Start the actual image generation
    setIsLoading(true);
    try {
      // Calling the Gemini API to generate images
      const generatedImages = await generateImagesWithGemini(
        prompt,
        imageCount,
        aspectRatio
      );

      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: `Generated your image${
          imageCount > 1 ? "s" : ""
        } with ${aspectRatio} ratio , Tell me more!`,
        images: generatedImages,
      };

      setMessages((currentMessages) => [...currentMessages, botResponse]);
    } catch (error) {
      console.error("Error in image generation:", error);
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: `Sorry, there was an error generating your images: ${error.message}`,
        isError: true,
      };
      setMessages((currentMessages) => [...currentMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setImageCount(1);
      setAspectRatio("square");
    }
  };

  // Aspect ratio icon components
  const AspectRatioIcon = ({ type }) => {
    switch (type) {
      case "square":
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-indigo-500"></div>
          </div>
        );
      case "landscape":
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-5 h-4 border-2 border-indigo-500"></div>
          </div>
        );
      case "portrait":
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-4 h-5 border-2 border-indigo-500"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AIChatbotLoader />
      <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <>
            {isSidebarOpened ? (
              <div
                className="bg-white border-r border-gray-200 flex flex-col transition-all duration-300 w-64 md:w-70 max-w-[90vw]"
              >
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center gap-2">
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

                    <h1 className="font-bold text-lg">My Chats</h1>
                    <button
                      onClick={() => setisSidebarOpened(false)}
                      className="bg-white rounded-full w-8 h-8 flex items-center justify-center ml-auto"
                    >
                      <BsArrowLeftSquareFill className="text-xl hover:transition-all duration-300 hover:scale-110" />
                    </button>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                  {/* Search Bar */}
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

                  {/* Keeping the chat history */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <button
                        onClick={toggleChat}
                        className="w-full bg-indigo-600 rounded py-2 text-white"
                      >
                        <span>Chats</span>
                      </button>
                    </div>
                    {isChatOpened && (
                      <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                        {messages
                          .filter((chat) => chat.type === "user")
                          .map((chat, index) => (
                            <div
                              key={index}
                              className="bg-gray-200 mt-1 text-gray-800 rounded p-3"
                            >
                              <p className="text-sm break-words">{chat.content}</p>
                              <p className="text-xs mt-1">
                                {chat.metadata.count} image
                                {chat.metadata.count > 1 ? "s" : ""} •{" "}
                                {chat.metadata.ratio}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-auto p-2">
                  <button
                    onClick={handlenewchat}
                    className="flex items-center justify-between w-full bg-indigo-600 hover:bg-indigo-500 mb-5 text-white py-2 px-4 rounded-md"
                  >
                    <span>New chat</span>
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-10 flex flex-col bg-white border-r border-gray-200">
                <button
                  onClick={() => setisSidebarOpened(true)}
                  className="w-8 h-8 flex items-center justify-center mt-5 ml-1"
                >
                  <BsFillArrowRightSquareFill className="text-xl hover:transition-all duration-300 hover:scale-110" />
                </button>
                <div className="tooltip tooltip-right" data-tip="Chat">
                  <button
                    className="w-8 h-8 flex items-center justify-center mt-4 ml-1"
                    onClick={() => {
                      setisSidebarOpened(true);
                      setIsChatOpened(true);
                    }}
                  >
                    <BsChatText className="text-xl hover:transition-all duration-300 hover:scale-110" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-200">
            <div className="flex items-center text-base sm:text-lg font-bold">
              <span>Artifex AI</span>
            </div>

            <div className="flex items-center space-x-2">
              {!isSidebarOpened && (
                <button
                  onClick={handlenewchat}
                  className="px-2 text-xs tooltip tooltip-bottom bg-indigo-600 text-white rounded hover:bg-indigo-500 hover:transition-all duration-300 hover:scale-110"
                  data-tip="Refresh"
                >
                  Refresh
                  <span className="text-lg ml-1">⟳</span>
                </button>
              )}
              <Link to={"/"}>
                <button
                  className="flex flex-row items-center space-x-1 px-2 py-1 text-xs bg-gray-200 text-gray-800 rounded hover:bg-gray-100 hover:transition-all duration-300 hover:scale-110 tooltip tooltip-bottom"
                  data-tip="Exit"
                >
                  Exit
                  <GiExitDoor className="text-xl" />
                </button>
              </Link>
            </div>
          </div>

          {/* Chat Container - with ref for autoscrolling */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center text-center my-1 p-0">
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
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  How can I help you today?
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm max-w-md px-2">
                  This conversation already is private only to the user by their
                  name, and there is no sharing of personal information with any
                  service outside of the user.
                </p>

                {/* Adver Card section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 sm:mt-8 w-full max-w-lg px-2">
                  {carddetails.map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white p-3 sm:p-4 rounded-lg text-center shadow-sm  ${
                        index === 2
                          ? "sm:scale-110 border border-blue-400"
                          : "opacity-50 pointer-events-none"
                      }`}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 mx-auto mb-2 rounded flex items-center justify-center">
                        {card.icon}
                      </div>
                      <h3 className="text-xs sm:text-sm font-medium">{card.title}</h3>
                      <p className="text-xxs sm:text-xs text-gray-500 mt-1">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 sm:p-4 max-w-full sm:max-w-3xl ${
                      message.type === "user"
                        ? "bg-green-200 text-black"
                        : message.isError
                        ? "bg-red-50 border border-red-200 text-red-700"
                        : "bg-white shadow-md"
                    }`}
                  >
                    <p className="break-words text-sm sm:text-base">{message.content}</p>

                    {message.type === "user" && (
                      <div className="mt-2 text-xs sm:text-sm opacity-80">
                        {message.metadata.count} image
                        {message.metadata.count > 1 ? "s" : ""} •{" "}
                        {message.metadata.ratio} ratio
                      </div>
                    )}

                    {message.images && (
                      <div
                        className={`mt-4 grid gap-2 sm:gap-3 ${
                          message.images.length === 1
                            ? "grid-cols-1" // if there is one image
                            : message.images.length === 2
                            ? "grid-cols-1 sm:grid-cols-2" // if there are two images
                            : message.images.length === 3
                            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" // if there are three images
                            : message.images.length >= 4 // if there are more than three images
                            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                        }`}
                      >
                        {message.images.map((img) => (
                          <div
                            key={img.id}
                            className="overflow-hidden rounded-lg shadow-md transform transition-transform hover:scale-105"
                          >
                            <img
                              src={img.url}
                              alt={img.prompt}
                              className="w-full h-auto object-cover"
                            />

                            {img.isPlaceholder && img.error && (
                              <div className="text-xs text-red-500 mt-1 p-1">
                                Error: {img.error}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Loading statement */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md flex items-center space-x-3">
                  <div className="animate-pulse flex space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-400 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-600 rounded-full"></div>
                  </div>
                  <p className="text-xs sm:text-base text-gray-500">
                    Generating your images with Artifex Ai
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input Control */}
          <div className="bg-white p-2 sm:p-4 border-t">
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                {/* Enhanced Image Count Selector */}
                <div className="w-full md:w-40 hidden">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Image Count
                  </label>
                  <div className="flex justify-between bg-white rounded-md border border-gray-300 p-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setImageCount(num)}
                        className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
                          imageCount === num
                            ? "bg-indigo-600 text-white shadow-md transform scale-110"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Aspect Ratio Selector */}
                <div className="flex flex-row w-full sm:w-48">
                  <div className="relative flex-1 sm:flex-auto">
                    <select
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white text-sm"
                    >
                      <option value="square">Square (1:1)</option>
                      <option value="landscape">Landscape (4:3)</option>
                      <option value="portrait">Portrait (3:4)</option>
                    </select>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <AspectRatioIcon type={aspectRatio} />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Download button */}
                  <div className="ml-2 flex items-center">
                    {messages.map(
                      (message) =>
                        message.image &&
                        message.images.map((image, index) => (
                          <div key={index} className="flex items-center">
                            <button
                              type="button"
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = image.url;
                                link.download = `artifex-ai-image-${index}.png`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                              className="text-black bg-black px-2 rounded flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                color="black"
                                fill="none"
                              >
                                <path
                                  d="M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 21L12 13M12 21C11.2998 21 9.99153 19.0057 9.5 18.5M12 21C12.7002 21 14.0085 19.0057 14.5 18.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>

                              <a
                                href={image.url}
                                className="text-black text-sm mr-2 bg-black"
                                download
                              >
                                Save
                              </a>
                            </button>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>

              {/* Main Input */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </form>
            {showFooter && (
              <p className="text-xs text-gray-500 text-center mt-2 sm:mt-4">
                Artifex Ai can make mistakes. Consider checking important
                information.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};