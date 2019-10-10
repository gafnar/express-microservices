const usersRoute = require('./user.routes');
const authRoute = require('./auth.routes');

exports.assignRoutes = (app, config) => {
  // AUTH SYSTEM
  authRoute.assignRoutes(app, config);

  // USERS
  usersRoute.assignRoutes(app, config);
};
