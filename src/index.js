const express = require('express')
const app = express()
const path = require('path')
const userRouter = require('./routers/users')

require('./db/mongo')

const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


app.use(userRouter)
 
app.listen(port, ()=>{
    console.log(`App listen on port ${port}`)
})