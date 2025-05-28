# ESB Network Dashboard – GitHub Pages Deployment Guide

## Preparing for GitHub Pages Deployment

The project has been configured for GitHub Pages deployment with the following additions:

1. Added the `gh-pages` package as a development dependency
2. Added a `homepage` field in package.json
3. Added `predeploy` and `deploy` scripts in package.json

## Deployment Steps

1. Create a GitHub repository for your project
2. Update the `homepage` field in `package.json` with your actual GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/esb-network-dashboard"
   ```
3. Initialize Git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
4. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/yourusername/esb-network-dashboard.git
   ```
5. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
6. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

After running the deploy script, your application will be available at the URL specified in the homepage field of your package.json.

## Additional Notes

- The first deployment might take a few minutes to become available
- You may need to configure GitHub Pages in your repository settings to use the `gh-pages` branch
- If you make changes to your code, commit them and run `npm run deploy` again to update your deployed site
