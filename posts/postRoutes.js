const express = require('express');  // imports express
const db = require('../data/db');
const router = express.Router();   // defines express

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(204).json({
            message:'make sure nothing is missing in the body of your post !'
        })
    } else {
        db.insert(req.body).status(200).json('req.body');
    }
})


module.exports = router;