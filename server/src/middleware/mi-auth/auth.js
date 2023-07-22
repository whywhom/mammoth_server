const admin = require('./firebase');

const authenticate = async (ctx, next) => {
  try {
    const idToken = ctx.headers.authorization; // Assuming you pass the Firebase ID token in the Authorization header

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    ctx.state.user = decodedToken;

    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid authentication token' };
  }
};

module.exports = authenticate;