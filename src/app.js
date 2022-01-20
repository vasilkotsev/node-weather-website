const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const path = require('path');
const express = require('express');
const hbs = require('hbs')

const app = express();

/* Define paths for Express config */
const publicDirectoryPath = path.join(__dirname, '../public') // generate the path to public folder
const viewsPath = path.join(__dirname, '../templates/views') // customize path which Express to use for rendering the views
const partialsPath = path.join(__dirname, '../templates/partials')

/* Setup Handlebars engine and views location */
app.set('view engine', 'hbs') // provide to express hbs template engine
app.set('views', viewsPath) // provide to express customized views path
hbs.registerPartials(partialsPath)

/* Setup static directory to serve */
app.use(express.static(publicDirectoryPath)) //provide the path to the static assets and this in some way configures our express application

app.get("", (req, res) => {
    res.render('index', { //renders one of the views and
        title: "Weather",// provides dynamic values to the template
        name: "Vasil Kotsev"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Vasil Kotsev"
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        message: "This is example message",
        title: "Help",
        name: "Vasil Kotsev"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                adrress: req.query.address
            })
        })
    })


    // res.send({
    //     address: req.query.address,
    //     location: 'Plovdiv',
    //     forecast: "Partly cloudy"
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render("page404", {
        title: "404",
        name: "Vasil Kotsev",
        message: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("page404", {
        title: "404",
        name: "Vasil Kotsev",
        message: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) // server starting