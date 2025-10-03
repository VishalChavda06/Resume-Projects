// Mock user data for demonstration
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "password123" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "password456" }
];

// FIXED: Changed to CommonJS export for Vercel Node.js functions
module.exports = function handler(req, res) {
  // FIXED: Added comprehensive error handling wrapper
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const { method, query } = req;

    // FIXED: Added request body validation for POST requests
    if (method === 'POST' && !req.body) {
      console.error('POST request missing body');
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Request body is required for POST requests' 
      });
    }

    switch (method) {
      case 'GET':
        // Handle login query
        if (query.email && query.password) {
          const user = users.find(u => u.email === query.email && u.password === query.password);
          if (user) {
            res.status(200).json([user]);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } else {
          // Return all users
          res.status(200).json(users);
        }
        break;

      case 'POST':
        // FIXED: Added validation for required fields
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          console.error('POST request missing required fields:', { name, email, password });
          return res.status(400).json({ 
            error: 'Bad Request', 
            message: 'Name, email, and password are required' 
          });
        }

        // FIXED: Check for duplicate email
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          console.error('User with email already exists:', email);
          return res.status(409).json({ 
            error: 'Conflict', 
            message: 'User with this email already exists' 
          });
        }

        const newUser = {
          id: users.length + 1,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim()
        };
        users.push(newUser);
        res.status(201).json(newUser);
        break;

      case 'DELETE':
        const userId = parseInt(query.id);
        if (isNaN(userId)) {
          console.error('Invalid user ID for DELETE:', query.id);
          return res.status(400).json({ 
            error: 'Bad Request', 
            message: 'Valid user ID is required' 
          });
        }

        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
          res.status(200).json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).json({ 
          error: 'Method Not Allowed', 
          message: `Method ${method} not allowed` 
        });
    }
  } catch (error) {
    // FIXED: Comprehensive error logging and response
    console.error('Serverless function error:', error.stack || error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'An unexpected error occurred',
      // Only include error details in development
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};
