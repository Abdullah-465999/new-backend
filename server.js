const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const transInfo = require('./routes/transInfoRoute');
const transWalletInfo = require('./routes/transWalletInforoute');
const sellAndBuy= require('./routes/BuyAndSellRoute');
const butterfactoryinfoRoute = require('./routes/butterfactoryinfoRoute')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Connection error', err);
  process.exit();
}); 

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);
app.use('/register',registerRoutes);
app.use('/login',loginRoutes)
app.use('/transinfo', transInfo);
app.use('/transwalletinfo',transWalletInfo)
app.use('/butterfactoryinfo',butterfactoryinfoRoute)
app.use('/buyandsell',sellAndBuy)

app.get('/',(req,res) => {
  res.send('hello world!!')
}
)

app.listen(PORT, () => {

  console.log(`Server is running on port ${5000}`);
});
