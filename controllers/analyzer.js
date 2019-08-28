const logger = require('winston')
const AnaylzerService= require('../services/analyzer')
const getFacialAnalyzerDetails = async (req, res, next) => {
    const payload = req.query
    try {
      const result = await AnaylzerService.getFacialAnalyzerDetails(payload)
      return res.send(result)
    } catch (error) {
      logger.error(`An error occured while saving comment ${error.message}`)
      return next(error)
    }
  }

  module.exports={
    getFacialAnalyzerDetails
  }