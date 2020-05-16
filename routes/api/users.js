const {Router} = require('express');
const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const router = new Router();

router.get('/test', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
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
      return res.status(400).json(error: "User already exists");
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

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(403).json({
      errors: "Wrong password"
    })
  }

  const token = jwt.sign(
    {user},
    keys.secretOrKey,
    {expiresIn: "7d"}
  );

  res.json({
    success: true,
    token: 'Bearer ' + token
  });
})