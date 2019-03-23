const { send } = require('micro');

module.exports = async (req, res) => {
  const statusCode = 200;
  const data = { data: 'Hello World' };
  send(res, statusCode, data);
};
