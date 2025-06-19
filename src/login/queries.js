const getByLogin = `
  SELECT * FROM login
  WHERE login = $1;
`;

module.exports = {
  getByLogin
};
