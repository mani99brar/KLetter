import express, { response } from 'express';
import axios from 'axios';
import request from 'request';
import rp from 'request-promise-native';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { Configuration,OpenAIApi } from 'openai';
const app = express();
const port = 8080; 
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
// const maytapiUrl = 'https://api.maytapi.com/api/bfac5810-9895-49ed-ab09-1dd5d7a79a12/25950/sendMessage';


app.get('/', async (req, res) => {
  const {key} = req.query;
  console.log(key);
  const options = {
    method: "GET",
    url: "https://seo-keywords.p.rapidapi.com/keyword-suggestions-fast/",
    params: { keyword: `${key}`, google: "in" },
    headers: {
      "X-RapidAPI-Key": "4173126cebmsh9e97eb90dce5e90p12b9ecjsn38ebfa5a2a6c",
      "X-RapidAPI-Host": "seo-keywords.p.rapidapi.com",
    },
  };
  let d;
  try {
    const response = await axios.request(options);
    d = response.data;
  } catch (error) {
    console.error(error);
  }

  let arr = [];
  let result = [];
  for (let i = 0; i < 10; i++) {
    arr.push(d.data.data[i].Keyword);
  }
  console.log("getting response");

  for (let i = 0; i < 10; i++) {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: arr[i],
        temperature: 0.6,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      result.push(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
      result.push(response.data);
    }
  }
  console.log(result);
  res.send(result);
  //   axios
  //   .request(options)
  //   .then(function(response) {
  //   res.send(response.data);
  //   })
  //   .catch(function(error) {
  //   res.send(error);
  //   });


    
    //   console.log(response.data.choices[0].text);
});

app.get('/message',async (req,res) =>{
  const phoneNumber = "9896325248";
  const message = "HELLO MERI JAAN! <3";


  res.send({response});
})





app.post('/',async (req,res)=>{
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Music Theory",
            temperature: 0.6,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });
          res.send(response.data);
        // const response = await openai.listEngines();
          // res.status(200).send({
          //   bot: response.data
          // })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});