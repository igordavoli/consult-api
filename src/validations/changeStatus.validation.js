const { StatusCodes } = require('http-status-codes');
const { messages } = require('../helpers');

module.exports.changeStatus = (actualStatus, status) => {
  let isValid = true;

  if (actualStatus === 'canceled') {
    isValid = false;
  }

  if (actualStatus === 'canceled_by_pro') {
    isValid = false;
  }

  if (actualStatus === 'concluded') {
    isValid = false;
  }

  if (actualStatus === 'recused') {
    isValid = false;
  }

  if (actualStatus === 'pending' && status === 'concluded') {
    isValid = false;
  }

  if (actualStatus === 'confirmed' && status === 'recused') {
    isValid = false;
  }

  if (!isValid) {
    throw {
      status: 422,
      message: messages.notPossibleChange('status', actualStatus, status),
    };
  }
};
