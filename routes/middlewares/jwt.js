function verifyJWT(req, res, next) {
  console.log(req.path, req.path.startsWith("/users"));
  if (req.path.startsWith("/users")) {
    next();
    return;
  }

  const hasToken = req.headers["x-acess-token"];
  if (!hasToken)
    res.status(401).json({ auth: false, message: "Token incorreto!" });

  jwt.verify(hasToken, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(403)
        .json({ auth: false, message: "Falha na autenticação de token!" });
    next();
  });
}
module.exports = { verifyJWT };
