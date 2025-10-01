// Mock user data for demonstration
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "password123" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "password456" }
];

export default function handler(req, res) {
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
      const newUser = {
        id: users.length + 1,
        ...req.body
      };
      users.push(newUser);
      res.status(201).json(newUser);
      break;

    case 'DELETE':
      const userId = parseInt(query.id);
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
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
