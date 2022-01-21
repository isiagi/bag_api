const checkPermission = (req, reqUser, reqResourceId) => {
//   if (reqUser.role === 'admin') return;
  if (reqResourceId.toString() === reqUser.username) return;
  req.status(401).json({ message: 'Not Allowed To Access' });
};

export { checkPermission };
