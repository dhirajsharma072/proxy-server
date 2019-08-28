const logger = require('winston')
const AnaylzerService= require('../services/analyzer')
const getFacialAnalyzerDetails = async (req, res, next) => {
    const payload = req.query
    const userRole=req.headers['user-role']
    try {
      const result = await AnaylzerService.getFacialAnalyzerDetails(payload,userRole)
      return res.send(result)
    } catch (error) {
      logger.error(`An error occured while saving comment ${error.message}`)
      return next(error)
    }
  }

  module.exports={
    getFacialAnalyzerDetails
  }