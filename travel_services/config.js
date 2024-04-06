const env = process.env.NODE_ENV || "dev";
const credentials = require(`./.credetials.${env}`);
module.exports = { credentials };
