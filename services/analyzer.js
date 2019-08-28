const requestPromise = require('request-promise')
const logger = require('winston')
const CONSTANT = require('../constant/index')
const getFacialAnalyzerDetails = (payload) => {
    var options = {
        uri: CONSTANT.ANALYZER_BASE_URL,
        qs: {
            query: '(tags:facial_recognition)',
            index: 'file',
            pageNumber: payload.pageNumber || 1,
            itemsPerPage: payload.itemsPerPage || 12
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    logger.info('Request parameter for analyzer api ', options)

    return requestPromise(options)
}

module.exports = {
    getFacialAnalyzerDetails
}