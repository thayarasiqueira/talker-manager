const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { 
  isValidEmail, 
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatched,
  isValidRate,
} = require('./validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const result = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(result);

  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
    const result = await fs.readFile('./talker.json', 'utf-8');
    const talkers = JSON.parse(result);
    const { id } = req.params;
    const selectedTalker = talkers.find((e) => e.id === +id);
    if (!selectedTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(selectedTalker);
});

app.post('/login', isValidEmail, isValidPassword, (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  }
});

app.post('/talker', isValidToken, isValidName, isValidAge, isValidTalk,
isValidWatched, isValidRate, async (req, res) => {
  const result = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(result);
  const newTalker = req.body;
  const addTalker = {
    id: talkers.length + 1,
    ...newTalker,
  };
  talkers.push(addTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(201).json(addTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
