const notFoundHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    timestamp: new Date().toISOString()
  });
};

module.exports = { notFoundHandler };