# 🚀 Mini LinkedIn-like Community Platform

A full-stack social networking platform built with React, Node.js, and MongoDB. Users can create profiles, share posts, connect with others, and build their professional network.

## ✨ Features

- **User Authentication**: Register, login, and profile management
- **Post Management**: Create, read, like, comment, and delete posts
- **Social Features**: Follow/unfollow users, view profiles
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

**Frontend**: React, React Router, Axios, React Icons, React Hot Toast
**Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
**Tools**: Nodemon, Concurrently

## 📁 Project Structure

```
linkedin-community-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # Authentication context
│   │   ├── pages/         # Page components
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── index.js
├── .gitignore             # Git ignore rules
├── package.json           # Root dependencies
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14+)
- MongoDB (local or Atlas)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd linkedin-community-platform
   npm run install-all
   ```

2. **Set up environment variables**
   Create `server/.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/linkedin-community
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   NODE_ENV=development
   ```

   **Note**: The `.env` file is not included in the repository for security reasons. You must create it manually.

3. **Run the application**
   ```bash
   npm run dev
   ```

4. **Access the app**
   Open `http://localhost:3000` in your browser

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id/follow` - Follow/unfollow user

## 🔧 Troubleshooting

### Common Issues

**"react-scripts is not recognized"**
```bash
cd client && npm install
```

**"MongoDB connection failed"**
- Check if MongoDB is running
- Verify connection string in `.env` file

**"Port already in use"**
- Kill the process using the port
- Or change port in `.env` file

### Environment Variables Checklist
- ✅ `MONGODB_URI` (valid MongoDB connection string)
- ✅ `JWT_SECRET` (secure random string)
- ✅ `PORT` (server port, default: 5000)

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

2. **Set up Environment Variables in Vercel**
   - Go to your project settings in Vercel
   - Add the following environment variables:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=production
   ```

3. **Update API URL**
   - After deployment, update the API URL in `client/src/config/api.js`
   - Replace `your-vercel-app-name.vercel.app` with your actual Vercel domain

4. **Deploy**
   - Vercel will automatically build and deploy your application
   - The `vercel.json` file handles the routing configuration

### Manual Deployment

**Frontend (Vercel/Netlify)**
```bash
npm run build
```
Upload `client/build` folder

**Backend (Render/Railway)**
- Set environment variables
- Use `npm start` as start command


## Screen shots of the project 
<img width="1920" height="1080" alt="Screenshot 2025-08-03 210648" src="https://github.com/user-attachments/assets/a8e3e611-13b5-4e28-8e63-3528a2eed047" />
<img width="1919" height="825" alt="Screenshot 2025-08-03 210746" src="https://github.com/user-attachments/assets/3953541a-8974-4cb7-9ab5-fab4b5a1b3dd" />
<img width="1919" height="827" alt="Screenshot 2025-08-03 210803" src="https://github.com/user-attachments/assets/349c686a-1ea8-43d2-b737-deab1112f1f7" />
<img width="1919" height="833" alt="Screenshot 2025-08-03 210820" src="https://github.com/user-attachments/assets/4d22b3c0-7a4e-4ffd-9475-b60bbba7b411" />


  ## Vedio Demo


https://github.com/user-attachments/assets/32a8090a-da38-4f15-b23c-69ede7d61c21


## 📝 License

MIT License 
