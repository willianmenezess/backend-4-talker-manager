const express = require('express');
const { readTalkerFiles, getTalkerById } = require('../utils/readAndWriteFiles');

const talkerRoute = express.Router();

talkerRoute.get('/', async (_req, res) => {
	try {
	const talkers = await readTalkerFiles();
	if (!talkers || talkers.length === 0) return res.status(200).json([]);
	res.status(200).json(talkers);
	} catch (err) {
		res.status(500).json({ message: 'Erro interno' });
	}

});

talkerRoute.get('/:id', async (req, res) => {
	try {
	const { id } = req.params;
	const talker = await getTalkerById(id);
	// colocar essa validação no middleware
	if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
	res.status(200).json(talker);
	} catch (err) {
		res.status(500).json({ message: 'Erro interno' });
	}
});

module.exports = talkerRoute;