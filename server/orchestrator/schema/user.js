const { userAxios, appAxios } = require("../axiosUrl");
const Redis = require("ioredis");
const redis = new Redis({
  port: 13284, // Redis port
  host: "redis-13284.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "zachary",
  password: process.env.REDIS_PASS,
});

const typeDefs = `#graphql
    type User {
        _id: String
        username: String 
        email: String 
        role: String 
        phoneNumber: String
        address: String
    }

    type Message {
        message: String
    }

    input UserInput {
        username: String
        email: String
        password: String 
        role: String 
        phoneNumber: String 
        address: String 
    }

    type Query {
        getUsers: [User]
        getUser(_id: String): User 
    }

    type Mutation {
        addUser(userInput: UserInput): Message
        deleteUser(_id: String): Message
    }
`;

const resolvers = {
    Query: {
        getUsers: async () => {
            try{
                const usersCache = await redis.get("user:users")
                let users;
                if (usersCache){
                    users = JSON.parse(usersCache)
                }else {
                    const {data} =  await userAxios.get('/')
                    await redis.set("user:users", JSON.stringify(data))
                    users = data
                }
                return users
            }catch (err){
                throw new Error(err.response ? err.response.data.message : err.message);
            }
        },
        getUser: async (parent,args) => {
            try{
                const { _id } = args;
                const userCache = await redis.get(`user:user:${_id}`)
                let user;
                if (userCache){
                    user = JSON.parse(userCache)
                } else {
                    const {data}  = await userAxios.get(`/${_id}`)
                    await redis.set(`user:user:${_id}`, JSON.stringify(data))
                    user = data
                }
                return user
            }catch(err){
                throw new Error(err.response ? err.response.data.message : err.message);
            }
        }
    },
    Mutation :{
        addUser: async (parent,args) => {
            try{
                 const {userInput} = args;
                 const {data} = await userAxios.post('/',userInput)
                 await redis.del("user:users")
                 return data;
            }catch(err){
                if (err.response && err.response.status === 400) {
                    throw new Error("Bad Request: " + err.response.data.message);
                  }
                  throw new Error(err.response ? err.response.data.message : err.message);
            }
        },
        deleteUser: async (parent,args) => {
            try{
                const {_id} = args;
                const {data} = await userAxios.delete(`/${_id}`)
                await redis.del("user:users")
                return data;
            }catch(err){
                if (err.response && err.response.status === 400) {
                    throw new Error("Bad Request: " + err.response.data.message);
                  }
                  throw new Error(err.response ? err.response.data.message : err.message);  
            }
        }
    }
}

 module.exports = {typeDefs,resolvers}