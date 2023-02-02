import React from 'react'
import axios from 'axios';
import gif from './assets/XOsX.gif';
import { useState } from 'react';
import Load from './Load';

const Home = (props) => {
  const {status,setStatus,setResult} = props;
  const[keyword,setKeyword] = useState("");
  async function backendCall(){
    setStatus(1);
    const response = await axios.get("http://localhost:8080/",{
      params:{
        key: keyword,
      },
    });
    setStatus(2);
    console.log(response.data);
    setResult(response.data);
  }
  return (
    <div className='w-full h-[100vh] flex flex-col items-center justify-center'>
        {status===1 && <Load />}
        <div className='w-[80%] flex items-center'>
          <div className='flex flex-col items-start w-[100%]'>
          <h1 className='text-[#fff] text-[3rem] font-bold'>KLetter</h1>
          <p className='w-[55%] text-[#fff] text-[1rem] text-left'>Welcome to our daily fact-based subscription website! Our mission is to provide you with interesting and informative facts every day. With a subscription, you'll receive a daily email/message with a new fact to start your day off right. From science and history to pop culture and general knowledge, we've got you covered with everything! Subscribe now and never stop learning!</p>
          </div>
          <div className='w-[40%]'>
            <img className='w-[60%]' src={gif} alt="" />
          </div>
          
        </div>
        <div className='w-[80%] flex flex-col mt-[100px]'>
              {/* <h1 className=' text-[#ffffff] text-[3rem] font-bold'>Subscibe</h1> */}
              <div className='w-full flex flex-col items-center'>
                <div className='flex flex-col items-start my-2'>
                  <label htmlFor="" className='text-[#fff] p-2'>E-Mail</label>
                  <input type="text" className='p-2 rounded-[5px] w-[300px] text-center bg-[#87a97a] bg-opacity-50 text-[#fff] placeholder-white' placeholder='xxxxx@gmail.com'/>
                </div>
                <div className='flex flex-col items-start my-2'>
                  <label className='text-[#fff] p-2' htmlFor="">Enter Prompt</label>
                  <input onChange={(e)=>setKeyword(e.target.value)} value={keyword} type="text" className='w-[300px] p-2 rounded-[5px] text-center bg-[#87a97a] bg-opacity-50 text-[#fff] placeholder-white' placeholder='Universities in Austrailia'/>
                </div>
                <button onClick={backendCall} className='p-2 w-[300px] rounded-[5px] bg-[#000] mt-5 text-white text-[2rem]'>Subscribe!</button>
              </div>
        </div>
    </div>
  )
}

export default Home
