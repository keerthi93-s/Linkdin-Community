# 🔧 Troubleshooting Deployment Issues

## Common Vercel Deployment Errors

### 1. "react-scripts: command not found" Error

**Error Message:**
```
sh: line 1: react-scripts: command not found
Error: Command "npm run build" exited with 127
```

**Cause:** React dependencies are not being installed properly during the build process.

**Solutions:**

#### Solution 1: Update Vercel Build Settings
1. Go to your Vercel project dashboard
2. Navigate to Settings → General → Build & Development Settings
3. Update the following:
   - **Framework Preset**: Other
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm install`

#### Solution 2: Check Package.json Files
Ensure both `package.json` files have the correct dependencies:

**Root package.json should have:**
```json
{
  "scripts": {
    "install-all": "npm install && cd client && npm install",
    "build": "cd client && npm run build"
  }
}
```

**Client package.json should have:**
```json
{
  "dependencies": {
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "build": "react-scripts build"
  }
}
```

#### Solution 3: Manual Build Test
Test the build locally before deploying:
```bash
# Install dependencies
npm run install-all

# Test build
npm run build
```

### 2. MongoDB Connection Issues

**Error Message:**
```
MongoDB connection error: MongoNetworkError
```

**Solutions:**
1. Check your MongoDB Atlas connection string
2. Ensure your IP is whitelisted in MongoDB Atlas
3. Verify environment variables are set correctly in Vercel

### 3. API Routes Not Working

**Error Message:**
```
404 Not Found
```

**Solutions:**
1. Check that your `vercel.json` has correct routing
2. Ensure API routes are prefixed with `/api`
3. Verify server is properly configured for serverless deployment

### 4. CORS Issues

**Error Message:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solutions:**
1. Update CORS configuration in `server/index.js`
2. Add your Vercel domain to the allowed origins
3. Check that credentials are properly configured

## Environment Variables Checklist

Make sure these are set in Vercel:
- ✅ `MONGODB_URI` (MongoDB Atlas connection string)
- ✅ `JWT_SECRET` (secure random string)
- ✅ `NODE_ENV=production`

## Build Process Debugging

### Step 1: Check Build Logs
1. Go to Vercel dashboard
2. Click on your latest deployment
3. Check the build logs for specific errors

### Step 2: Test Locally
```bash
# Install all dependencies
npm run install-all

# Test server
npm run server

# Test client build
cd client && npm run build
```

### Step 3: Verify File Structure
Ensure your project structure is correct:
```
project/
├── client/
│   ├── package.json
│   ├── src/
│   └── public/
├── server/
│   ├── index.js
│   └── routes/
├── package.json
└── vercel.json
```

## Quick Fixes

### If build still fails:
1. Delete `node_modules` and `package-lock.json` from both root and client
2. Run `npm install` in both directories
3. Commit and push changes
4. Redeploy on Vercel

### If API calls fail:
1. Check that your Vercel domain is updated in `client/src/config/api.js`
2. Verify environment variables are set
3. Test API endpoints manually

## Support

If you're still having issues:
1. Check Vercel deployment logs
2. Test the build process locally
3. Verify all environment variables
4. Ensure MongoDB Atlas is properly configured 