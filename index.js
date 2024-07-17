const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://arshdeepkaur7374:ojas123@cluster0.e4zo4q2.mongodb.net/');

const questionSchema = new mongoose.Schema({
  text: String,
  rating: Number,
  topic: String
});

const Question = mongoose.model('Question', questionSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  const questions = await Question.find();
  res.render('profile', { questions });
});

app.post('/add-question', async (req, res) => {
  const { text, rating, topic } = req.body;
  const newQuestion = new Question({ text, rating, topic });
  await newQuestion.save();
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
