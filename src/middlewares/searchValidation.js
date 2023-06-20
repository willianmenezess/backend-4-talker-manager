const { readTalkerFiles } = require('../utils/readAndWriteFiles');

const searchValidation = async (req, res, next) => {
  const { q } = req.query;
  const talkers = await readTalkerFiles();
  if (!q || q === '') {
    return res.status(200).json(talkers);
  }
  next();
};

module.exports = searchValidation;
