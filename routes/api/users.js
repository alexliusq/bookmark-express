const {Router} = require('express');
const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = new Router();
const authenticateMiddleware = require('../../middleware/authentication');

router.get('/test', authenticateMiddleware,
  (req, res) => {
    console.log('yello');
    res.json({
      user: req.user
    })
  })

router.post('/register', async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({error: "email and password must be provided"});
    }

    const user = await User.create(email, password);
    if (!user) {
      return res.status(400).json({error: "User already exists"});
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(
      `createUser({ email: ${req.body.email} }) >> Error: ${error.stack}`
    );
    res.status(500).json();
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const user = await User.find(email);
  if (!user) {
    return res.status(403).json({
      errors: "User associated with email does not exist"
    })
  }
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(403).json({
      errors: "Wrong password"
    })
  }

  let userInfo = {
    id: user.id,
    email: user.email
  }

  const token = jwt.sign(
    {user: userInfo},
    keys.secretOrKey,
    {expiresIn: '7d'}
  );
  
  res.json({
    success: true,
    token: 'Bearer ' + token
  });
})

module.exports = router;