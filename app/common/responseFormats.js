'use strict';

module.exports = {

  list: function (models) {
    return {
      data: models,
      meta: {
        totalItems: models.length
      }
    };
  }

};
