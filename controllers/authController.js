const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');

const sendVerificationEmail = (user, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `http://localhost:9000/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your email address',
    text: `Please click the following link to verify your email address: ${verificationUrl}`,
    html: `<p>Please click the following link to verify your email address:</p><a href="${verificationUrl}">Verify Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Verification email sent: ' + info.response);
    }
  });
};

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const verificationToken = crypto.randomBytes(32).toString('hex');
    newUser.emailVerificationToken = verificationToken;
    await newUser.save();

    sendVerificationEmail(newUser, verificationToken);

    res.status(201).json({
      statusCode: 201,
      message: 'User registered successfully. Verification email sent.',
      data: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        emailVerificationToken: newUser.emailVerificationToken,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      statusCode: 200,
      message: 'Login successful',
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Login failed',
      error: error.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ emailVerificationToken: token });

    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid or expired token',
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.status(200).json({
      statusCode: 200,
      message: 'Email verified successfully',
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Verification failed',
      error: error.message,
    });
  }
};
