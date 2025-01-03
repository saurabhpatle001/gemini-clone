import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Saurabh</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {[
                "Suggest ways to improve my routine for better productivity",
                "Suggest a good book to read that can inspire personal growth",
                "Suggest how I can approach someone to discuss a sensitive topic",
                "Suggest effective methods to manage stress in a busy schedule",
              ].map((text, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() => onSent(text)}
                >
                  <p>{text}</p>
                  <img
                    src={
                      index === 0
                        ? assets.compass_icon
                        : index === 1
                        ? assets.bulb_icon
                        : index === 2
                        ? assets.message_icon
                        : assets.code_icon
                    }
                    alt="Icon"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              {input && (
                <img
                  onClick={() => onSent(input)}
                  src={assets.send_icon}
                  alt="Send"
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
