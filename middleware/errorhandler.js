const { CustomError } = require('../errors/error-class')

const ErrorHandler = (err, req, res, next) =>{
    if (err instanceof CustomError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({ msg: 'You fucked up something, try again'})
}

module.exports = ErrorHandler