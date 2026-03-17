# OctoTS - visualiser

## How to Deploy to Your Own GitHub Pages

### Update the Configuration Files
Because GitHub Pages hosts project sites at a specific sub-path (e.g., `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`), you must edit two specific files so the app knows exactly where to look for its assets. 

**A. Edit `package.json`:**
Find the `"homepage"` field near the top of the file and change it to your new GitHub Pages URL.

    "homepage": "https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/",

**B. Edit `vite.config.js`:**
Find the `base` property inside the configuration object and change it to your exact repository name. Make sure you include the slashes at the beginning and the end!

    export default defineConfig({
      // ... other configs
      base: '/<YOUR-REPO-NAME>/', 
    })

### 4. Install Dependencies
Run the following command to install all the necessary packages for your fork:

    npm install

### 5. Deploy Your Site
Once the configuration is updated and packages are installed, you need to save your changes and run the deploy command. 

First, commit and push your configuration changes:

    git add .
    git commit -m "chore: update base URL for GitHub Pages deployment"
    git push origin main

Next, run the deployment script:

    npm run deploy

*(This command builds the project and automatically pushes the compiled files to a special `gh-pages` branch).*

### 6. Enable GitHub Pages in Settings
Finally, tell GitHub to serve your website:

1. Go to your forked repository on GitHub.
2. Click on **Settings** > **Pages** (on the left sidebar).
3. Under **Build and deployment**, ensure the **Source** is set to **Deploy from a branch**.
4. Under **Branch**, select the `gh-pages` branch from the dropdown and leave the folder as `/ (root)`.
5. Click **Save**.