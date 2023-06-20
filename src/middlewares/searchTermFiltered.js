const { readTalkerFiles } = require('../utils/readAndWriteFiles');

const searchTermFiltered = async (req, res, next) => {
  const { q } = req.query;
  if (!q) return next();
  const talkers = await readTalkerFiles();
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
  req.filteredTalkers = filteredTalkers;
  next();
};

module.exports = searchTermFiltered;
