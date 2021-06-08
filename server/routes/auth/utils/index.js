const jwt = require("jsonwebtoken");

/**
 * 
 * @param {object} res | express response object
 * @param {object} user | authenticated user
 * @returns {object} | express response
 */
const login = (res, user) => {
  const token = jwt.sign(
      { id: user.id },
      process.env.SESSION_SECRET,
      { expiresIn: 86409000 }
    );
  res.cookie("x-access-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    expires: new Date(new Date().getTime()+86409000).toUTCString(),
  })
      
  return res.json({ user });
}

/**
 * 
 * @param {object} res | express response object
 * @returns {object} | express response
 */
const logout = (res) => {
  res.cookie("x-access-token", null, { expires: Date.now(0) });

  return res.sendStatus(204);
}

module.exports = {
  login,
  logout,
}