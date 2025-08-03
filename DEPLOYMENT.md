# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub repository with your LinkedIn Community project
- MongoDB Atlas account (for database)
- Vercel account

## Step 1: Prepare Your Database

1. **Create MongoDB Atlas Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster
   - Get your connection string

2. **Set up Database Access**
   - Create a database user with read/write permissions
   - Note down username and password

## Step 2: Deploy to Vercel

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In your Vercel project settings, go to "Environment Variables"
   - Add the following variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-community?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   ```

3. **Configure Build Settings (Important!)**
   - In your Vercel project settings, go to "Build & Development Settings"
   - Set the following:
     - **Framework Preset**: Other
     - **Build Command**: `npm run install-all && npm run build`
     - **Output Directory**: `client/build`
     - **Install Command**: `npm install`

4. **Deploy**
   - Vercel will automatically detect the configuration from `vercel.json`
   - Click "Deploy"
   - Wait for the build to complete

## Step 3: Update API URL

After deployment, you'll get a URL like `https://your-app-name.vercel.app`

1. **Update API Configuration**
   - Go to your GitHub repository
   - Edit `client/src/config/api.js`
   - Replace `your-vercel-app-name.vercel.app` with your actual domain
   - Commit and push the changes
   - Vercel will automatically redeploy

## Step 4: Test Your Application

1. **Test Authentication**
   - Try registering a new user
   - Try logging in
   - Check if profiles work

2. **Test Posts**
   - Create a new post
   - Like and comment on posts
   - Test the social features

## Troubleshooting

### Common Issues

**"react-scripts: command not found" Error**
- This happens when React dependencies aren't installed properly
- **Solution**: 
  1. Go to Vercel project settings
  2. Set Build Command to: `npm run install-all && npm run build`
  3. Set Install Command to: `npm install`
  4. Redeploy the project

**Build Fails**
- Check that all dependencies are in `package.json`
- Ensure `vercel.json` is properly configured
- Check the build logs in Vercel dashboard

**API Calls Fail**
- Verify environment variables are set correctly
- Check that MongoDB connection string is valid
- Ensure API routes are working

**Database Connection Issues**
- Verify MongoDB Atlas network access settings
- Check that your IP is whitelisted (or use 0.0.0.0/0 for all IPs)
- Ensure database user has correct permissions

### Environment Variables Checklist
- ✅ `MONGODB_URI` (valid MongoDB Atlas connection string)
- ✅ `JWT_SECRET` (secure random string, at least 32 characters)
- ✅ `NODE_ENV=production`

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check MongoDB Atlas connection

Your application should now be live and accessible at your Vercel URL! 