const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const jsonfile = require('jsonfile');
require('./public/App.test.js');
require('dotenv').config();

class WEB{
    constructor(port){
        this.active = true;
        this.port = port;
        this.filename = path.basename(__filename);
        this.appInfo = jsonfile.readFileSync('./public/manifest.json');
    }
}

const app = express();
let server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const AppName = "CBCONCORD 25";
let web = new WEB(PORT);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'assets')));

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use((req, res, next) => {
    next();
});

const promises = [
    ejs.renderFile('./views/header.ejs'),
    ejs.renderFile('./views/previewImage.ejs'),
    ejs.renderFile('./views/previewSponsor.ejs'),
    ejs.renderFile('./views/footer.ejs')
];

app.get('/', (req, res) => {
    Promise.all(promises).then(([header, previewImage, previewSponsor, footer]) => {
        res.status(200).render('index',{header, footer});
    });
});

app.get('/index', (req, res) => {
    res.redirect('/');
});

app.get('/gallery', (req, res) => {
    Promise.all(promises).then(([header, previewImage, previewSponsor, footer]) => {
        res.status(200).render('gallery',{header, previewImage, footer});
    });
});

app.get('/about', (req, res) => {
    Promise.all(promises).then(([header, previewImage, previewSponsor, footer]) => {
        res.status(200).render('about',{header, footer});
    });
});

app.get('/sponsors', (req, res) => {
    Promise.all(promises).then(([header, previewImage, previewSponsor, footer]) => {
        res.status(200).render('sponsors',{header, previewSponsor, footer});
    });
});

app.get('/contact', (req, res) => {
    Promise.all(promises).then(([header, previewImage, previewSponsor, footer]) => {
        res.status(200).render('contact',{header, footer});
    });
});

app.get('/events', (req, res) => {
    Promise.all(promises).then(([header, previewImage, previewSponsor, footer]) => {
        res.status(200).render('events',{header, footer});
    });
});

app.all(/.*/, (req, res) => {
    res.status(404).render('notfound',{error: 404, message: "Page not found on this url, check the source or report it"});
});

server.listen(PORT, (err) => {
    if(err) console.log("Oops an error occure:  "+err);
    console.log(`Compiled successfully!\n\nYou can now view \x1b[33m./${path.basename(__filename)}\x1b[0m in the browser.`);
    console.info(`\thttp://localhost:${PORT}`);
    console.log("\n\x1b[32mNode web compiled!\x1b[0m \n");
});



