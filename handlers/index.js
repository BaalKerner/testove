const { update } = require('./update');
const { deleteOne } = require('./delete');
const { getOne } = require('./getOne');
const { getAll } = require('./getAll');
const { create } = require('./create');

module.exports = {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
};
