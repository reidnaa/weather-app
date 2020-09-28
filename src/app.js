const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { count } = require('console');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = express.static(path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//  setup handlebars and views location in templates folder
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(publicDirectoryPath);

app.get('', (req, res)=> {
    res.render('index', {
        title : "WEATHER TIME",
        name: "Reid Naaykens"
    })
})
app.get('/about', (req, res)=> {
    res.render('about', {
        title : "About ME",
        name: "Reid Naaykens",
        imgSrc: '/img/image.png'
    })
})
app.get('/help', (req, res)=> {
    res.render('help', {
        title : "The Help Page",
        msg: "Welcome to the help page.",
        name: "Reid Naaykens"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        res.send({
            error: 'please provide an address'
        })
        
    } else {

        const location = req.query.address
        geocode(location, (error, {long, lat} = {}) => {
            if(error) { 
                return res.send({error});
            }

            forecast(long,lat, (error, data) => {
                if(error){
                   return  res.send({ error })
                }
                res.send({
                    location,
                    forecast:  data.message,
                    icon: data.icon
                })
            })
        })
    }
});

app.get('/products', (req, res) => {
    !req.query.search ? res.send({
        error: 'please provide a search term'
    }) : res.send({
        'products':[]
    }) ;

   
    
});

app.get('/help/*' , (req, res) => {
    res.render('404', {
        title : 'Help Article not found',
        name:  "Reid",
        errorMessage: "The page you are looking for does not exist"
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: "404 no page for that",
        name: 'Reid',
        errorMessage: "The page you are looking for does not exist"

    })
});
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})