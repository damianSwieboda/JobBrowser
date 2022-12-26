const express = require('express')
const app = express()

const path = require('path')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/users')

require('./db/mongo')
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());



app.use(userRouter)
 
app.listen(port, ()=>{
    console.log(`App listen on port ${port}`)
})