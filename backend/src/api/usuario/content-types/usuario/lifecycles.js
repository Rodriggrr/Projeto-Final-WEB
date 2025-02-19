'use strict';

module.exports = {
  afterCreate: async (event) => {
    console.log('Lifecycle afterCreate chamado para Usuario!', event.result);
  },
};