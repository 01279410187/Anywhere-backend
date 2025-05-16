import { fromZodError } from 'zod-validation-error';

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    const validationError = fromZodError(err);
    return res.status(400).json({
      success: false,
      message: validationError.message,
    });
  }
};

export default validate;