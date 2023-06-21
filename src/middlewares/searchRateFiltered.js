const searchRateFiltered = async (req, res, next) => {
  const { rate } = req.query;
  const { filteredTalkers } = req;
  if (!rate) return next();
  if (!Number.isInteger(Number(rate)) || Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  const newFilteredTalkers = filteredTalkers.filter(({ talk }) => talk.rate === Number(rate));
  req.filteredTalkers = newFilteredTalkers;
  next();
};

module.exports = searchRateFiltered;