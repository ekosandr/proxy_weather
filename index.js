const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const lang = 'ru_RU';
  const limit = '7';
  const hours = 'false';

  const options = {
    method: 'GET',
    url: 'https://api.weather.yandex.ru/v2/forecast?',
    params: {
      lat: lat,
      lon: lon,
      [lang]: lang,
      limit: limit,
      hours: hours,
    },
    headers: {
      'X-Yandex-API-Key': process.env.REACT_APP_RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
      console.error(error);
    });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
