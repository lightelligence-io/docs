# Lightelligence Developer Documentation

This README explains how to install and set-up the documentation website which is available under https://developer.lightelligence.io

The developer documentation website (short: docs) is created via the static site generator [Hugo] (https://gohugo.io/), the frontend search engine [Fuse.js](https://fusejs.io/) and a custom theme. Hosting is done via a Github page.

<br/>

## Local Development

### Installation of Dependencies

1. download & install Node.js & NPM] from [npmjs.com](https://www.npmjs.com/get-npm)
1. clone this docs repo using Git
1. open your Terminal and go into the repo’s root folder
1. install all dependencies with `npm install`
1. install Hugo as described at [Hugo instructions](https://gohugo.io/getting-started/installing/)
1. verify your installation by with `npm -v` and `hugo version`


### Run the Docs Locally

1. build the styles including auto-updating with `npm run watch`
1. build the docs and run a local, auto-updating Hugo server with `hugo server`
1. open the local docs website in your browser http://localhost:1313/
1. adjust the content in the `content` folder to add pages, change texts, etc. and see them instantly available in your browser

**Good to know:**

1. with `hugo server -wD` you are able to also see pages which are still in draft mode (page property `draft: true`).
2. The search index is not updated via `hugo server`. To update it you need to run `hugo` which will generate search index file at `public/search/index.json`.

<br/>

## Publishing to Production

1. adjust the `baseURL` of the target domain in the file `config/_default/config.toml`
1. build the docs with `hugo`
1. upload the files from the `public` subfolder to the destination


<br/>

## Learn More

- to contribute please create a pull request to the `beta` branch and add [skreutzberger](https://github.com/skreutzberger) as reviewer
- for more customization read [customization.md](https://github.com/lightelligence-io/docs/blob/master/customization.md)

<br/>

## License
The Lightelligence Developer Documentation is licensed under the [MIT License](https://github.com/lightelligence-io/docs/blob/master/LICENSE)
