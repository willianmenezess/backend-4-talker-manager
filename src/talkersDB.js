const connection = require('./connection');

const getAll = async () => {
  const [talkers] = await connection.execute('SELECT * FROM TalkerDB.talkers');
  console.log('talkerDB', talkers);
  return talkers;
};

module.exports = {
  getAll,
};