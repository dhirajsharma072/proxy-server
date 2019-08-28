const requestPromise = require('request-promise')
const logger = require('winston')
const CONSTANT = require('../constant/index')
const getFacialAnalyzerDetails = async (payload, userRole) => {
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
    const apiResponse = await requestPromise(options)

    if (userRole !== CONSTANT.ROLE.ADMIN) {
        const documents = apiResponse.Documents.map(doc => {
            return {
                fileName: doc.fileName,
                mimeType: doc.mimeType,
                fileUrl: doc.fileUrl,
                _id: doc._id,
            }
        })
        apiResponse.Documents = documents
        return apiResponse
    }
    return apiResponse
}

module.exports = {
    getFacialAnalyzerDetails
}