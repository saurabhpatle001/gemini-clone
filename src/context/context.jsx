import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);

      let response;
      if (prompt) {
        response = await runChat(prompt);
        setRecentPrompt(prompt);
      } else {
        if (!input.trim()) {
          console.log("Empty input. Ignoring request.");
          setLoading(false);
          return;
        }
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await runChat(input);
      }

      if (!response) {
        setResultData("No response received. Please try again.");
        setLoading(false);
        return;
      }

      let formattedResponse = response
        .split("**")
        .map((text, i) => (i % 2 ? `<b>${text}</b>` : text))
        .join("")
        .split("*")
        .join("</br>");

      let responseWords = formattedResponse.split(" ");
      responseWords.forEach((word, i) => delayPara(i, word + " "));
      setLoading(false);
      setInput("");
    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
