const express = require('express');
const config = require('./config');
const apiRoutes = require('./routers/app.routers')

const PORT = process.env.PORT || 8080;
const app = express()


const ASYNC_DATASOURCE = {
    mongo: require('./model/containers/mongo.container')
}


app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/', apiRoutes)

app.get('*', (req, res) => {
    res.json({ error: -2, description: `route: ${req._parsedOriginalUrl.pathname} method: ${req.route.stack[0].method}, not implemented` });
})

const serverConnected = app.listen(PORT, () => {
    if (Object.keys(ASYNC_DATASOURCE).includes(config.DATASOURCE || "")) {
        ASYNC_DATASOURCE[config.DATASOURCE].conect().then(() => {
            console.log('Connected to' + config.DATASOURCE + 'sucessfully')
        })
    }
    console.log(`Server is up and running`)
})

serverConnected.on('error', (error) => {
    console.log(error.message)
})