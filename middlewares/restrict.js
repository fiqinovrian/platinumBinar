const jwt = require('jsonwebtoken');

const rahasia = 'Ini rahasia ga boleh disebar-sebar';

const restrict = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("autheader:",authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token:", token);
    if(token == null) return res.sendStatus (401);
    jwt.verify(token, rahasia, (err, decoded)=> {
        console.log("err:",err);
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    }) 
}

module.exports = restrict;  
