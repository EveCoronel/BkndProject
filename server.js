const express = require('express');
const config = require('./config');
const apiRoutes = require('./routers/app.routers')
const errorMiddleware = require('./middlewares/error.middleware')


const PORT = process.env.PORT || 8080;
const app = express()


const ASYNC_DATASOURCE = {
    mongo: require('./model/containers/mongo.container'),
    file: require('./model/containers/file.container')
}


app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/', apiRoutes)

app.get('*', (req, res) => {
    res.json({ error: -2, description: `route: ${req._parsedOriginalUrl.pathname} method: ${req.route.stack[0].method}, not implemented` });
})

const serverConnected = app.listen(PORT, () => {
    if (config.DATASOURCE == 'mongo') {
        ASYNC_DATASOURCE[config.DATASOURCE].connect().then(() => {
            console.log('Connected to ' + config.DATASOURCE + ' sucessfully')
        })
    }
    console.log(`Server is up and running`)
})

app.use(errorMiddleware)

serverConnected.on('error', (error) => {
    console.log(error.message)
})