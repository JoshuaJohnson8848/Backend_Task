const UserType = require('../../models/userType');

exports.addUserType = async (req, res, next) => {
  try {
    const { type } = req.body;
    const usertype = new UserType({
        userType: type
    })

    const createdType = await usertype.save();
    if(!createdType){
        const error = new Error('UserType Creation Failed');
        error.status = 422;
        throw error;
    }

    res.status(200).json({message: "UserType Created", createdType})
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};