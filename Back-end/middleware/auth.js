const jwt = require("jsonwebtoken");
const JWT_SECRET = proces.env.JWT_SECRET;
const model = require('')

function authMiddleware(req ,res,next)
{
    const authHeader = req.headears.authorization || "";
    const token = authHeader.startsWith("Bearer ")? authHeader.slice(7):null;
    if(!token) return res.status(401).json({error :"No token ,authorization denied"});
    try
    {
        const decoded = jwt.verify(token.JWT_SECRET);
        req.user={id:decoded.id};


    } catch 
    {
        
    }
}