const bcrypt = require('bcrypt');

exports.hashPassword = async(password) => {
    const saltRounds = 7; 
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

exports.verifyPassword = async(enteredPassword, userPassword) => {
    return bcrypt.compare(enteredPassword, userPassword);
}