# BrainSINS Documentation static sitegatsby-gitbook-starter

Here you would find instructions to install, improve and deploy the documentation site.

## 🚀 Install

Get started by running the following commands:

```
$ git clone git@github.com:BrainSINS/BrainSINS.github.io.git
$ git checkout develop
$ npm install
$ npm start
```

Visit `http://localhost:8000/` to view the app.

## 🔧 Configure

Write markdown files in `content/lang` folder.

Open `config.js` for templating variables. Broadly configuration is available for `gatsby`, `header`, `sidebar` and `siteMetadata`.

- `gatsby` config for global configuration like 
    - `pathPrefix` - Gatsby Path Prefix
    - `siteUrl` - Gatsby Site URL
    - `gaTrackingId` - Google Analytics Tracking ID

- `header` config for site header configuration like
    - `title` - The title that appears on the top left
    - `githubUrl` - The Github URL for the docs website
    - `helpUrl` - Help URL for pointing to resources
    - `tweetText` - Tweet text
    - `links` - Links on the top right

- `sidebar` config for navigation links configuration
    - `forcedNavOrder` for left sidebar navigation order. It should be in the format "/<filename>"
    - `links` - Links on the bottom left of the sidebar

- `siteMetadata` config for website related configuration
    - `title` - Title of the website
    - `description` - Description of the website
    - `ogImage` - Social Media share og:image tag
    - `docsLocation` - The Github URL for Edit on Github

- For sub nesting in left sidebar, create a folder with the same name as the top level `.md` filename and the sub navigation is auto-generated. Currently it supports only one level of nesting.

## ☁️ Deploy

From the *develop* branch you may execute the command `npm run deploy`. You will need to enter your Github credentials in order to dpeloy the changes. This command will deploy the static build into *master* branch. SO YOU DO NOT NEED TO MODIFY MASTER BRANCH, thanks.

Take into account that you need to commit and push the changes in develop branch to allow other members request pull them.

## 🤖 SEO friendly

This is a static site and comes with all the SEO benefits. Configure meta tags like title and description for each markdown file using MDX Frontmatter

```markdown
---
title: "Title of the page"
metaTitle: "Meta Title Tag for this page"
metaDescription: "Meta Description Tag for this page"
---
```

Canonical URLs are generated automatically.



