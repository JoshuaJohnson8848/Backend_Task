const User = require('../../models/user');
const UserType = require('../../models/userType');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userType = 'user';

exports.signup = async (req, res, next) => {
  try {
    const { email, pass, name, phone, bio } = req.body;

    if (!emailRegex.test(email)) {
      const error = new Error('Invalid Email Format');
      error.status = 422;
      throw error;
    }

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      const error = new Error('User Already Exist');
      error.status = 422;
      throw error;
    }
    
    if(phone.length != 10){
      const error = new Error('Enter Valid Phone Number');
      error.status = 422;
      throw error;
    }
    const userTypeId = await UserType.findOne({ userType: userType }).select('_id');

    if (!userTypeId) {
      const error = new Error('UserType Error');
      error.status = 422;
      throw error;
    }

    const existPhone = await User.findOne({ phone: phone });

    if (existPhone) {
      const error = new Error('Phone Number Already Exist');
      error.status = 422;
      throw error;
    }

    const hashedPass = await bcrypt.hash(pass, 12);

    if (!hashedPass) {
      const error = new Error('Password Error');
      error.status = 422;
      throw error;
    }

    const user = await new User({
      email: email,
      phone: phone,
      bio: bio,
      password: hashedPass,
      name: name,
      photo: '',
      public: false,
      userType: userTypeId._id
    });

    const createdUser = await user.save();

    if (!createdUser) {
      const error = new Error('User Signup Failed');
      error.status = 422;
      throw error;
    }

    res.status(200).json({ message: 'Succesfully Signed Up', createdUser });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

