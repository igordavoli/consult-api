const { list } = require('./list.service');
const { create } = require('./create.service');
const { setStatus } = require('./setStatus.service');
const { avaliate } = require('./avaliate.service');

module.exports = {
  list,
  create,
  setStatus,
  avaliate,
};
