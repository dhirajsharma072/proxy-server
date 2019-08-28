const express = require('express')
const AnalyzerController = require('../controllers/analyzer')

const router = express.Router()

router.get('/faces', AnalyzerController.getFacialAnalyzerDetails)


module.exports = router