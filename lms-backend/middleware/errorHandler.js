// Global error handler — catches any error passed via next(error)
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    // Show stack trace only in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// 404 handler for unknown routes
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
