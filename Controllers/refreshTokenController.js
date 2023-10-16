const usersDB = {
    users: require("../Model/users.json"),
    setUsers: function (data) {this.users = data},
  }
  
  

  const jwt = require("jsonwebtoken");
    require("dotenv").config();
  
  
  
  const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    // console.log(cookies);
    if(!cookies?.jwt) return res.sendStatus(401)
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person => person.username === refreshToken);
    if (!foundUser) return res.sendStatus(401); //unauthorize

    jwt.verify (
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)

        const accessToken = jwt.sign(
            {"username": decoded.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "60s"}
        );
        res.json({accessToken})
        }
    )

  };
  
  module.exports = { handleRefreshToken };
  
  
  
  
  
  
  