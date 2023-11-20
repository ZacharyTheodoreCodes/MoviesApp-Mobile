const { getDb } = require("../config/connection");
const { ObjectId } = require("mongodb");

class User {
  static users() {
    return getDb().collection("users");
  }

  static async findAll() {
    try {
      const users = this.users();
      return await users.find().toArray();
    } catch (err) {
      throw err;
    }
  }

  static async findOne(_id) {
    try {
      const users = this.users();
      const user = await users.findOne({ _id: new ObjectId(_id) });
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(email) {
    try {
      const users = this.users();
      const user = await users.findOne({ email: email });
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async create(input) {
    try {
      const users = this.users();
      const newUser = await users.insertOne(input);

      return await users.findOne({
        _id: new ObjectId(newUser.insertedId),
      });
    } catch (err) {
      throw err;
    }
  }

  static async delete(_id) {
    try {
      const users = this.users();
      return await users.deleteOne({ _id: new ObjectId(_id) });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
