const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const userRouter = require('./routers/users');
const jobOffersRouter = require('./routers/jobs');
const { MissingPageError } = require('./routers/helpers/applicationError');
const { errorHandling }= require('./middleware/errorHandling.js');

require('./db/mongo');
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(userRouter);
app.use(jobOffersRouter);
app.use(handleMissingPage);
app.use(errorHandling);

function handleMissingPage(req, res, next) {
    const error = new MissingPageError();
    next(error);
};

app.listen(port, ()=>{
    console.log(`App listen on port ${port}`);
});