export default function errorHandler(err, res) {
    console.log(err)
    
    let { name, status, field, message, code } = err
    
    // * ValidationError
    if (name === "ValidationError"){
        const fields = Object.keys(err.errors)
        // const responseBody = fields.reduce((obj, field) => {
        //     obj[field] = err.errors[field].message
        //     return obj
        // }, {})
        const responseBody = {}
        fields.forEach(field => {
            responseBody[field] = err.errors[field].message
        })
        return res.status(422).json(responseBody)
    }
    
    // * Unique field constraint error
    if (name === "MongoServerError" && code === 11000) {
        const field = Object.keys(err.keyValue)[0]
        return res.status(422).json({ [field]: `${field} is already taken` })
    }

    // * JsonWebTokenError
    if (name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // * All custom error responses
    return res.status(status).json({ [field]: message })
}