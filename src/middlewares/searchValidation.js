const { readTalkerFiles } = require('../utils/readAndWriteFiles');

const searchValidation = async (req, res, next) => {
  const { q } = req.query;
  const talkers = await readTalkerFiles();
  if (q === '') {
    return res.status(200).json(talkers);
  }
  if (!q) {
    req.filteredTalkers = talkers;
  }
  next();
};

module.exports = searchValidation;
