const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const Oauth2 = google.auth.OAuth2;
const oauth2Client = new Oauth2(
  `${process.env.Client_ID}`,
  `${process.env.Client_secret}`,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({ refresh_token: `${process.env.Ref_token}` });
const accessToken = oauth2Client.getAccessToken();
console.log("Haan thike".bold.red);
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: `${process.env.user_email}`,
    clientId: `${process.env.Client_ID}`,
    clientSecret: `${process.env.Client_secret}`,
    refreshToken: `${process.env.Ref_token}`,
    accessToken: accessToken,
    // accessToken: `${process.env.AC_TOKEN}`,
  },
});
module.exports = transport;
