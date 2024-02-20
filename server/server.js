const express = require('express');
const mongoose =require('mongoose');
const dotenv =require('dotenv');
const cors=require( 'cors');
const valuatorRouter = require('./routes/valuators.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/valuators', valuatorRouter);

app.get('/', (req, res) => {
  res.send('ByteBits');
});

async function connectDB() {
  await mongoose.connect(process.env.DB_URL);
  console.log('Connected to MongoDB');
}

const port = process.env.PORT || 3001;

connectDB();
app.listen(3001, () => {
  console.log(`Server at http://localhost:${port}`);
});
