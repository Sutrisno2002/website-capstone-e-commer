const jwt = require("jsonwebtoken");
const model = require("../models");
const user = require("../models/user");

module.exports = (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    let verify = jwt.verify(token, "asrul-dev");

    user.findOne({
      where: {
        id: verify.id,
      },
    })
      .then(function (result) {
        if (result) {
          req.decoded = verify;
          next();
        } else {
          res.status(401).json({
            message: "Kamu tak punya akses",
          });
        }
      })
      .catch(function (error) {
        res.json({ error: error });
      });
  } else {
    res.status(401).json({
      message: "Silahkan Login Dahulu",
    });
  }
};
