const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.config.json')

module.exports = {
    mongodb: {
        uri: `mongodb+srv://ecommerce:${envConfig.DB_PASSWORD}@cluster0.hjesg.mongodb.net/?retryWrites=true&w=majority`
    },
    firebase: {
        credentials: firebaseConfig
    }
}