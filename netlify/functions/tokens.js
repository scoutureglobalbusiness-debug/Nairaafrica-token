const twilio = require('twilio');

exports.handler = async (event) => {
  const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const API_KEY = process.env.TWILIO_API_KEY;
  const API_SECRET = process.env.TWILIO_API_SECRET;
  const TWI_APP_SID = process.env.TWILIO_APP_SID;

  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;

  const token = new AccessToken(ACCOUNT_SID, API_KEY, API_SECRET, {identity: 'user_' + Date.now()});
  const grant = new VoiceGrant({outgoingApplicationSid: TWI_APP_SID});
  token.addGrant(grant);

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({token: token.toJwt()}),
  };
};
