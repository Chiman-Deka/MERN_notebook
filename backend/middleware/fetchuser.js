var jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb&oy";

const fetchuser = (req, res, next)=>{   // fetchuser is a middleware 
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');   // we named the header as auth-token
    if(!token){    // if token not found
        res.status(401).send(({ error: "Please authenticate using a valid token"}))
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;    // we will get the user
        next();     // here next function is the async function present in the /getuser Route
    } catch (error) {
        res.status(401).send(({ error: "Please authenticate using a valid token"}))
    }
}
module.exports = fetchuser;