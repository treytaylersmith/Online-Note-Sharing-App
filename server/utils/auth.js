const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();  // This extracts the token
    }

    if (!token) {
      console.log('No token provided');
      return req;  // No token, so skip authentication for this request
    }

    try {
      const { data } = jwt.verify(token, secret);  // No `maxAge`, it's checked inside the token
      req.user = data;  // Assign the decoded user data to `req.user`
    } catch (error) {
      console.log('Invalid token', error);  // Log the error for debugging
      throw new Error('Could not authenticate user');  // Or handle it however you want
    }

    return req;  // Continue with the request
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
