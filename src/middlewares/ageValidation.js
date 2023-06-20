const ageValidation = (req, res, next) => {
  const { age } = req.body;
  const isNumber = typeof age === 'number';
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18 || !isNumber || !Number.isInteger(age)) {
    return res.status(400)
    .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

module.exports = ageValidation;