// API configuration for different environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? (process.env.REACT_APP_API_URL || 'https://your-vercel-app-name.vercel.app/api')  // Replace with your actual Vercel domain
  : (process.env.REACT_APP_API_URL || 'http://localhost:5000/api');

export default API_BASE_URL; 