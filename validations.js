  // validations email and password
  const isValidEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: 'O campo "email" é obrigatório' });
      }
    if (!email.includes('@') || !email.includes('.com')) {
        res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
  };
  
  const isValidPassword = (req, res, next) => {
    const { password } = req.body;
  
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }  
    next();
  };

  // validations to add a new talker
  const isValidToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  };

  const isValidName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length <= 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  };

  const isValidAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  };

  const isValidTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
  };

  const isValidWatched = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    const validateDate = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!validateDate.test(watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };

  const isValidRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
      return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };

  // validations 

  module.exports = {
    isValidEmail,
    isValidPassword,
    isValidToken,
    isValidName,
    isValidAge,
    isValidTalk,
    isValidWatched,
    isValidRate,
  };