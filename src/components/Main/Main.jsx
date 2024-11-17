import React, { useContext } from 'react'; 
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!showResult
        ?<>
        
        <div className="greet">
          <p><span>Hello, Saurabh</span></p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest ways to improve my routine for better productivity</p>
            <img src={assets.compass_icon} alt="" className="" />
          </div>
          <div className="card">
            <p>Suggest a good book to read that can inspire personal growth</p>
            <img src={assets.bulb_icon} alt="" className="" />
          </div>
          <div className="card">
            <p>Suggest how I can approach someone to discuss a sensitive topic</p>
            <img src={assets.message_icon} alt="" className="" />
          </div>
          <div className="card">
            <p>Suggest effective methods to manage stress in a busy schedule</p>
            <img src={assets.code_icon} alt="" className="" />
          </div>
        </div>
        </>
        :<div className='result'>
            < div className="result-tittle">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt} </p>{}
            </div> 
            <div className="result-data">
              <img src={assets.gemini_icon} alt=""  />
              {loading
              ? <div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>
              :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
            </div>
            </div> 
      }
        
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
              
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div> 
  );
}

export default Main;