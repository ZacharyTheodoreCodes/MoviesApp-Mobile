const bcrypt = require("bcryptjs");

// const hashPassword = (password) => {
//   return bcrypt.hashSync(password);
// };

function hashPass(password) {
    return bcrypt.hashSync(password)
}

module.exports = hashPass;
