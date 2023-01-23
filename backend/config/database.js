const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.set('strictQuery', false); //used to avoiding one warning!
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}


module.exports = connectDatabase