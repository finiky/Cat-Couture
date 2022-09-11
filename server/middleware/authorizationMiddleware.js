const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://www.cat-couture.com",
  issuerBaseURL: "https://dev-knvdm70u.us.auth0.com/",
});

const checkScopes = requiredScopes("read:reports");

module.exports = {
  checkJwt,
  checkScopes,
};
