const rateLimit = require("express-rate-limit");

export default voteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many votes, slow down."
});

