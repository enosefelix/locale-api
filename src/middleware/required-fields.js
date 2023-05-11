function validateRequiredFields(fields) {
    return function (req, res, next) {
        const missingFields = fields.filter((field) => !(field in req.body));
        if (missingFields.length > 0) {
            res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`,
            });
        } else {
            next();
        }
    };
}

module.exports = {validateRequiredFields}