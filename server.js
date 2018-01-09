// CONFIGURATIONS

//Express
const express = require('express');
const app = express();

// Path
const path = require('path');

// CORS
const cors = require('cors');
app.use(cors());

// Static Dir
app.use(express.static(__dirname + '/client/dist'));

// Body Parser
const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

//Morgan
let morgan = require("morgan");
app.use(morgan('dev'));

// Session and Cookie Parser
const session = require('express-session');
const cookieParser = require('cookie-parser');

const sessionConfig = {
    saveUninitialized: true,
    secret: 'supersecretstringforsession',
    resave: false,
    name: 'session',
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 360000
    }
};

app.use(cookieParser('supersecretstringforcookies'));
app.use(session(sessionConfig))

// MODEL
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/surveys', {
    useMongoClient: true });
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const surveySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    question: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    options: [{
        option: { type: String, required: true },
        result: {type: Number, required: true, default: 0}
    }]
}, {
    timestamps: true
});
const Survey = mongoose.model('Survey', surveySchema);

//CONTROLLER
const surveyController = {
    index: (request, response) => {
        Survey.find({})
        .then(surveys => response.json(surveys))
        .catch(error => console.log(error));
    },
    create(request, response) {
        response.redirect('/');
    },
    insert: (request, response) => {
        Survey.create(request.body)
        .then(survey => response.json(survey))
        .catch(error => console.log(error));
    },
    single: (request, response) => {
        Survey.findOne({_id: request.params.id})
        .then(survey => response.json(survey))
        .catch(console.log);  
    },
    vote: (request, response) => {
        Survey.findById(request.params.id).then(survey => {
            let option = survey.options.id(request.params.option);
            option.result +=1;
            survey.save();

            response.redirect(`/single/${request.params.id}`);
        });
    },
    destroy(request, response) {
        Survey.remove({_id: request.params.id}, function(err) {
            if(err) { console.log("There is an error"); }
            response.redirect('/list');
        });
    },
    search(request, response){
        var re = new RegExp(request.params.term, 'i');
        Survey.find().or([{ 'name': { $regex: re }}, { 'question': { $regex: re }}])
        .then(surveys => response.json(surveys))
        .catch(error => console.log(error));
    },
    login(request, response) {
        console.log('logging in ', request.params.username);
        request.session.user = request.params.username;
        response.cookie('user', request.params.username);
        response.redirect('/list');
    },
    logout(request, response) {
        console.log('logging out');
        request.session.destroy();
        response.clearCookie('user');
        response.json(true);
        response.redirect('/home');
    }
};

// ROUTES
app
.get('/list', surveyController.index)
.get('/create', surveyController.create)
.post('/insert', surveyController.insert)
.get('/single/:id', surveyController.single)
.get('/vote/:id/:option', surveyController.vote)
.get('/delete/:id', surveyController.destroy)
.get('/search/:term', surveyController.search)
.get('/login/:username', surveyController.login)
.delete('/logout', surveyController.logout)
.all("**", (request, response) => { response.sendFile(path.resolve("./angapp/dist/index.html")) });

// SERVER LISTENER
const port = 5000;
app.listen(port, ()=> console.log(`Express server listening on port ${port}`));
