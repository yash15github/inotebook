var jwt = require('jsonwebtoken');
const JWT_SECRET = 'I@mthebe$t';

const fetchuser = (req, res, next) =>{

    // Get the user from the jwt token and add id to req object
    const token = req.header('author-token');
    if(!token){
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;