function verifyIsAdm(req, res, next) {
  if (req?.userType === true) {
    return next();
  }

  return res.status(401).json({
    message: "Operação não autorizada, usuário não é um administrador!",
  });
}

export default verifyIsAdm;
