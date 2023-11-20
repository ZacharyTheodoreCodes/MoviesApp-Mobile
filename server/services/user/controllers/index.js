const hashPass = require("../helpers/bcrypt");
const User = require("../models/User");

class Controller {
  static async findAllUsers(req, res, next) {
    try {
      let users = await User.findAll();
      users.map((user) => delete user.password);

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async findUserById(req, res, next) {
    try {
      console.log(req.params);
      const { _id } = req.params;
      let user = await User.findOne(_id);
      if (!user) throw { name: "NotFound" };
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      if (
        !username ||
        !email ||
        !password ||
        !role ||
        !phoneNumber ||
        !address
      ) {
        throw { name: "FieldRequired" };
      }

      const checkUser = await User.findByEmail(email);
      if (checkUser) throw { name: "NotUnique" };

      const newUser = await User.create({
        ...req.body,
        password: hashPass(req.body.password),
      });

      res.status(201).json({ message: `${newUser.username} has been added` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { _id } = req.params;
      await User.delete(_id);
      res.status(200).json({ message: `User has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
