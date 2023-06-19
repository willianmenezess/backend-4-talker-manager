const fs = require('fs/promises');
const path = require('path');

const readTalkerFiles = async () => {
  try {
  const talkers = await fs.readFile(path.join(__dirname, '../talker.json'), 'utf-8');
  return JSON.parse(talkers);
  } catch (err) {
    return null;
  }
};

const getTalkerById = async (id) => {
  const talkers = await readTalkerFiles();
  const talker = talkers.find((talkerr) => talkerr.id === Number(id));
  if (!talker) return null;
  return talker;
};

const writeTalkerFiles = async (talker) => {
  const talkers = await readTalkerFiles();
  const newId = talkers[talkers.length - 1].id + 1;
  const newTalker = { id: newId, ...talker };
  talkers.push(newTalker);
  await fs.writeFile(path.join(__dirname, '../talker.json'), JSON.stringify(talkers));
  return newTalker;
};

module.exports = {
  readTalkerFiles,
  getTalkerById,
  writeTalkerFiles,
};
