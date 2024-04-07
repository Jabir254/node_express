const env = process.env.NODE_ENV || "dev" || "production";
const credentials = require(`./.credentials.${env}`);
module.exports = { credentials };
