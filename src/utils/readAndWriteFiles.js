const fs = require('fs/promises');
const path = require('path');

const readTalkerFiles = async () => {
	try {
	const talkers = await fs.readFile(path.join(__dirname, '../talker.json'), 'utf-8');
	return JSON.parse(talkers);
	} catch (err) {
		return null;
	}
}

const getTalkerById = async (id) => {
	const talkers = await readTalkerFiles();
	const talker = talkers.find((talker) => talker.id === Number(id));
	if (!talker) return null;
	return talker;
}

module.exports = {
	readTalkerFiles,
	getTalkerById,
};
