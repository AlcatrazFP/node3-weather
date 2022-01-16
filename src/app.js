const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
// app.use is used to run various express function 
app.use(express.static(publicDirectoryPath))

//app.get is used as routing purpose
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Om Verma'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Om verma'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        message: 'help Page',
        title: 'Help',
        name: 'Om Verma'
    })
})

app.get('/weather', (req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: "You must provide the address"
        })
    }
    geocode(address, (error, {location, latitude, longitude}= {})=>{
        if(error){
           return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error,forecastData) =>{
            if(error){
                return res.send({ error })
            }
            res.send({
                address,
                location,
                forecast: forecastData
                
            }
    
        )
    
      })

    })
    
    
}) 

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error', {
        title: 'Error',
        message: 'Help article not found',
        name: 'Om Verma'
    })
})

app.get('*', (req,res)=>{
    res.render('error', {
        message: 'Page not found',
        title: 'Error',
        name: 'Om Verma'
    })
})


//app.listen is used to provide port to the user
app.listen(port, ()=>{
    console.log('Server is up on port '+ port +'.')
})