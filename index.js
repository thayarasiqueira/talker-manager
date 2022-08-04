const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
  console.log('Online');
});
