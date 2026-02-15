const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized access",
        });
      }

      req.userId = decoded.id; // better than req.body
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in auth middleware",
      err,
    });
  }
};