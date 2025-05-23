export class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;


    console.error(err.stack);

    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }


    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

export const ErrorResponses = (res, err) => {
    if (err instanceof ErrorResponse) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
    }
    res.status(500).json({
        success: false,
        error: 'Server Error',
    });
};