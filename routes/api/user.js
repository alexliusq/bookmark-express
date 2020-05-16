const {Router} = require('express');
const User = require('../../models/users');

const router = new Router();

router.post('/', async (req, res) => {
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
})