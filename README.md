Technologies Used
Vite: Development server and build tool.
React: Frontend JavaScript library.
Redux Toolkit: State management.
RTK Query: Data fetching and caching.
TailwindCSS: Styling.


## Deployment

### Frontend Deployment with Vercel

1. **Login to Vercel**:
   - Go to [Vercel](https://vercel.com/).
   - Sign in or sign up if you don’t have an account.

2. **Create a New Project**:
   - Click on the **New Project** button.
   - Connect your GitHub, GitLab, or Bitbucket account.
   - Select the repository that contains your Vite project.

3. **Configure the Project**:
   - Ensure the **Build Command** is `npm run build`.
   - Ensure the **Output Directory** is `dist`.

4. **Deploy**:
   - Click the **Deploy** button.

### Backend Deployment with Vercel

1. **Create a New Project**:
   - Go to [Vercel](https://vercel.com/).
   - Click on the **New Project** button.
   - Select the repository that contains your JSON Server project.

2. **Create a `vercel.json` File**:
   Ensure you have a `vercel.json` configuration file in the root of your JSON Server project. This file should look something like this:

   ```json
   {
     "version": 2,
     "builds": [
       { "src": "server.js", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "/server.js" }
     ]
   }

