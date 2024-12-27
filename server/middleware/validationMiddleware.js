export const validateRequest = (req, res, next) => {
  const contentType = req.headers['content-type'];
  
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({ 
      message: 'Content-Type must be application/json' 
    });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ 
      message: 'Request body cannot be empty' 
    });
  }

  next();
};