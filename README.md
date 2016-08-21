# Flypostr-Web

Repository for the dynamic map and the static website for [flypostr.li](https://flypostr.li/).

* `/app`: React/JS for the dynamic app/map.
* `/web`: HTML/CSS for the static website.

Please check those folders for more information.

## Publish

Please make sure you have [Node.js](https://nodejs.org/) installed.

1. Install tools: `npm install -g gulp firebase-tools`
2. Build `/app`:
  1. `$ cd app`
  2. Optional: Update Firebase config (key, auth domain, etc.) at `/app/src/components/App/App.js`
  3. `$ npm install`
  4. `$ npm run build`
3. Build `/web`:
  1. `$ cd web`
  2. `$ npm install`
  3. `$ gulp`
4. Publish: `$ firebase deploy`
