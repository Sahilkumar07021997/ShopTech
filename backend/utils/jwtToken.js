//create and send token and save it in cookie.

const sendToken = (user, statusCode, res) => {
    
    //crerate Jwt token and
    const token = user.getJwtToken();
    
    //options for cookie 
    const options = {
        expires: new Date(Date.now()+ process.env.COOKIE_EXPIRES_TIME*24*60*60*1000         //converting into milliseconds
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports=sendToken;