const simpleAuth = (req, res, next) => {
  if (req.session?.loggedIn) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: 'Unauthorized - Please log in first',
  });
};

export default simpleAuth;