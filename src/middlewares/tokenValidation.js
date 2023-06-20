const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  const isString = typeof authorization === 'string';
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16 || !isString) {
    return res.status(401)
    .json({ message: 'Token inválido' });
  }
  next();
};

module.exports = tokenValidation;
