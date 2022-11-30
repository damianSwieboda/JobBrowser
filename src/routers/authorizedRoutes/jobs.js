const express = require('express')
const router = new express.Router()

router.get('/jobs', async ()=>{
    const offers = await Offers.find()
})

module.exports = router