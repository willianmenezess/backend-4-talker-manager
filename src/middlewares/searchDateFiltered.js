const searchDateFiltered = (req, res, next) => {
  const { date } = req.query;
  const { filteredTalkers } = req;
  if (!date) return next();
  const toHaveFormat = /\d{2}\/\d{2}\/\d{4}/;
  if (!toHaveFormat.test(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  const newFilteredTalkers = filteredTalkers.filter(({ talk }) => talk.watchedAt === date);
  req.filteredTalkers = newFilteredTalkers;
  next();
};

module.exports = searchDateFiltered;