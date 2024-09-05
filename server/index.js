const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express(); 


const pathToDist = path.join(__dirname, '../giphy-search/dist');
const serveStatic = express.static(pathToDist);


const fetchData = async (url,options = {}) => {
  try {
    const response = await fetch(url, options);
    const { ok, status, statusText, headers } = response;
    console.log('response:', { ok, status, statusText, headers });
    if (!ok) throw new Error(`Fetch failed with status - ${status}, ${statusText}`);

    const isJson = (headers.get('content-type') || '').includes('application/json');
    const responseData = await (isJson ? response.json() : response.text());

    return [responseData, null];
  } catch (error) {
    console.warn(error)
    return [null, error];
  }
}

const fetchGifs = async (req, res, next) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;
  const [data, error] = await fetchData(API_URL);
  if (error) {
    console.log(error.message);
    return res.status(404).send(error);
  }
  res.send(data);
}

app.use(serveStatic);
app.get('/api/gifs', fetchGifs)

const port = 8080; 
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})