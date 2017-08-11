export default async function(req, res, next) {
  console.log(req.user);
  const { rank } = req.user.permissions;

  if (rank !== 'admin') {
    console.error('User is not and admin!');
    return next({
      status: 403,
      message: 'Acces denied!'
    });
  };

  console.log('User is admin!');
  next();
};
