const axios = require('axios')

//user axios instance
const userAxios = axios.create({
    baseURL :  "http://localhost:4001/users/"
})

//app axios instance
const appAxios = axios.create({
    baseURL :  "http://localhost:4002/movies/"
})

module.exports = {userAxios,appAxios}