const express = require('express');
const router = express.Router();
const axios = require('axios');
const Portfolio = require('../models/Portfolio');

const COINGECKO_API = 'https://api.coingecko.com/api/v3/coins/markets';
const VS_CURRENCY = 'usd';

router.get('/', async (req, res) => {
  try {
    const { data } = await axios.get(COINGECKO_API, {
      params: {
        vs_currency: VS_CURRENCY,
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false
      }
    });

    const portfolio = await Portfolio.find();
    res.render('index', { coins: data, portfolio });
  } catch (err) {
    console.error(err);
    res.send('Error fetching data');
  }
});

router.post('/add', async (req, res) => {
  const { name, symbol, amount } = req.body;
  try {
    await Portfolio.create({ name, symbol, amount });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error adding to portfolio');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error deleting from portfolio');
  }
});

module.exports = router;
