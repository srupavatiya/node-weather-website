const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static content directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Sunil Rupavatiya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sunil Rupavatiya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sunil Rupavatiya',
        message: 'Dynamic help content is loaded from database to this page.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address for search.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            
            if(error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address        
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', { 
        title: '404',
        name: 'Sunil Rupavatiya',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', { 
        title: '404',
        name: 'Sunil Rupavatiya',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})