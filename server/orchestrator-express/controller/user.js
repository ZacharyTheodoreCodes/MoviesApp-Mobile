const { userAxios, appAxios } = require("../axiosUrl");
const Redis = require("ioredis");
const redis = new Redis({
  port: 13284, // Redis port
  host: "redis-13284.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "zachary",
  password: process.env.REDIS_PASS,
});

class UserController {
  static async findAllUsers(req, res, next) {
    try {
      const usersCache = await redis.get("user:users");
      let users;
      if (usersCache) {
        users = JSON.parse(usersCache);
      } else {
        const { data } = await userAxios.get("/");
        await redis.set("user:users", JSON.stringify(data));
        users = data;
      }
      res.status(200).json(movies);
    } catch (err) {
      next(err);
    }
  }

  static async findUserById(req, res, next) {
    try{
      const {_id} = req.params;
      const userCache = await redis.get(`user:user:${_id}`)
      let userData;
      if (userCache){
        userData = JSON.parse(userCache)
      } else {
        const {data} = await userAxios.get(`/${_id}`)
        await redis.set(`user:user:${_id}`, JSON.stringify(data))
        userData = data
      }
      res.status(200).json(data);
    }catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try{
      // const { username, email, password, role, phoneNumber, address } = req.body
      const {data} = await userAxios.post('/',req.body)
      await redis.del("user:users")
      res.status(201).json(data)
    }catch(err){
     next(err)
    }
  }

  static async deleteUser(req, res, next) {
    try{
      const {_id} = req.params;
      const {data} = await userAxios.delete(`/${_id}`)
      await redis.del("user:users")
      await redis.del(`user:user:${_id}`)
      res.status(200).json(data)
    }catch(err){
      next(err)
    }
  }
}

module.exports = UserController;
