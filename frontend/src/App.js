import './App.css';
import axios from 'axios';
import {Route , Routes } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import { useState } from 'react';

function App() {
  const [status,setStatus] = useState(0);
  const [result,setResult] = useState("");
  console.log(result);
  return (
    <div className="App">

      {(status===0||status===1) && <Home status={status} setStatus={setStatus} setResult={setResult}/>}
      {status===2 && <Results result={result}/>}

    </div>
  );
}

export default App;
