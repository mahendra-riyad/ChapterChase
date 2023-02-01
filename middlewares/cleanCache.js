const { clearHash } = require("../services/cache");

module.exports = (cacheKey) => {
  return async (req, res, next) => {
    try {
      await next();
      clearHash(cacheKey);
    } catch (error) {
      console.log(`we got error while calling cleanCache middleware: ${error}`);
      next();
    }
  };
};
