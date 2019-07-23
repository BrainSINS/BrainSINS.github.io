# BrainSINS Documentation static site

Here you would find instructions to install, improve and deploy the documentation site.

## 🚀 Install

Get started by running the following commands ([NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) required):

```
$ git clone git@github.com:BrainSINS/BrainSINS.github.io.git
$ git checkout develop
$ npm install
$ npm start
```

Visit `http://localhost:8000/` to view the app. Anytime you make a change in the content the app will hot reload, allowing you to view changes in realtime. 

Also, instead of using `npm`commands, you may use `Gatsby`commands:

```
$ gatsby develop <- this one let you view the debugger in the terminal window
$ gatsby build <- this will make a fast build if you need to deploy the site in a place like Surge
$ gatsby serve <- this will serve the site in `http://localhost:8000/` without developing capabitlities
```

## 🔧 Develop

Write markdown files in `content/lang` folder.

Open `config.js` and take a look at the attribute `sidebar.forcedNavOrder`. That attribute servers the left menu tree, and it is a map of the current files location within the project tree.

**IMPORTAT** So in case you need to add an option, you must add the path within the `sidebar.forcedNavOrder` and also the file in the files tree.

## ☁️ Deploy

From the **develop** branch you may execute the command `npm run deploy`. You will need to enter your Github credentials in order to dpeloy the changes. This command will deploy the static build into **master** branch. SO YOU DO NOT NEED TO MODIFY MASTER BRANCH, thanks.

Take into account that you need to commit and push the changes in develop branch to allow other members request pull them.

### Example

Imagine you modify the content of the file `es/index.mdx`. Just execute the following commands to view changes in the cloud:
```
#first we update our repo
$ git add -A
$ git commit -m "My commit message"
$ git push origin develop

#now build and deploy
$ npm run deploy
```

## Configuration files

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



