const express = require('express');

const { readTalkerFiles, getTalkerById, writeTalkerFiles, 
  updateTalkerById, deleteTalkerById } = require('../utils/readAndWriteFiles');
const tokenValidation = require('../middlewares/tokenValidation');
const nameValidation = require('../middlewares/nameValidation');
const ageValidation = require('../middlewares/ageValidation');
const { talkValidations1, talkValidations2 } = require('../middlewares/talkValidation');
const searchValidation = require('../middlewares/searchValidation');

const talkerRoute = express.Router();
const status500 = { message: 'Erro interno' };

talkerRoute.get('/', async (_req, res) => {
  try {
    const talkers = await readTalkerFiles();
    if (!talkers || talkers.length === 0) return res.status(200).json([]);
    res.status(200).json(talkers);
  } catch (err) {
    res.status(500).json(status500);
  }
});

talkerRoute.get('/search', tokenValidation, searchValidation, async (req, res) => {
  try { 
   const { q } = req.query;
   const talkers = await readTalkerFiles();
   const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
   if (filteredTalkers.length === 0) {
     return res.status(200).json([]);
   }
   res.status(200).json(filteredTalkers);
 } catch (err) {
   res.status(500).json(status500);
 }
});

module.exports = talkerRoute;

talkerRoute.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await getTalkerById(id);
  // colocar essa validação no middleware
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
  } catch (err) {
    res.status(500).json(status500);
  }
});

  const arrayValidations = [tokenValidation, nameValidation, 
    ageValidation, talkValidations1, talkValidations2];

talkerRoute.post('/', arrayValidations, async (req, res) => {
  try {
    const talker = req.body;
    const newTalker = await writeTalkerFiles(talker);
    console.log(newTalker);
    return res.status(201).json(newTalker);
  } catch (err) {
    return res.status(500).json(status500);
  }
});

talkerRoute.put('/:id', arrayValidations, async (req, res) => {
  try {
    const { id } = req.params;
    const talker = req.body;
    const newTalker = await updateTalkerById(id, talker);
    if (!newTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(newTalker);
  } catch (err) {
    res.status(500).json(status500);
  }
});

talkerRoute.delete('/:id', tokenValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTalker = await deleteTalkerById(id);
    if (!deletedTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json(status500);
  }
});
