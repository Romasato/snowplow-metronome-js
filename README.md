# Snowplow Metronome React JS App
A simple digital metronome app created as part of the front-end coding interview task at Snowplow Analytics.

Written using Javascript, NodeJS, TypeScript and React.
* Both server-side and front-end app are transpiled using TypeScript.
* Server itself is a very simple one to serve static files - currently no APIs implemented.
* Metronome also emits sound in addition to the visual animation.  

Tested in latest version of Chrome, Opera, Firefox and IE Edge browsers.

![App screenshot](/docs/app_screenshot.png?raw=true "The app as seen in browser")

## Directory Tree

```
server/                 --> NodeJS server TS source files.
    server.ts           --> Server entry file.
src/                    --> Front-end web SPA sources and assets
    assets /            --> Non-source asset files
        fonts/          --> Font files in formats for different browsers
        audio/          --> Audio files for metronome sounds
    components/         --> React components
    styles/             --> SASS files that will get transformed into regular CSS
        common/         --> SASS styles shared across the app
        components/     --> SASS files specific to components
        sass-globals.scss --> Global SASS variables and definitions
        styles.scss     --> CSS entry file
    ts-definitions/     --> Global TypeScript definitions
    config.json         --> Static config file - currently contains the songs and their BPM information.
    index.tsx           --> SPA entry file.
www/                    --> Any other files to be served by our NodeJS web server
package.json            --> NPM package file
tsconfig.server.json    --> TypeScript config for NodeJS server transpilation
tsconfig.spa.json       --> TypeScript config for client-side browser app
webpack.config.js       --> Webpack configuration file 
```

## Build Steps
All the building and deploying ideally should be done via `npm run` scripts listed below.

| Command                       | Purpose                               |      
|-------------------------------|---------------------------------------|
| `npm run spa:dev`             | (DEV) Runs Webpack and watches files for changes. |
| `npm run server:dev`          | (DEV) Runs NodeJS web server and watches files for changes restarting server automatically . |
| `npm run spa:prod`            | (Prod) Builds production version of the web app in `dist` directory. |
| `npm run server:prod`         | (Prod) Generates production-ready NodeJS server files in `dist-server` dir. |
| `npm run build:all`           | (Prod) Cleans previous build and generates production-ready server and web app files. |
| `npm start`                   | (Prod) Starts NodeJS web server after generating production-ready server and web app files. |

Check `package.json` for more detailed command lines.

### Running the App Locally
1. Install Node.js and NPM versions compatible with the ones specified in `package.json`. Check it all is good by executing `node -v` command which should output something similar to the below:
    ```
    v12.13.1
    ```
1. Git-clone  repo locally on your PC:
    ```bash
    git clone git@github.com:Romasato/snowplow-metronome-js.git
    ```
1. Change dir to `snowplow-metronome-js` and initialize project with required Node.js modules:
   
   ```bash
   cd snowplow-metronome-js
   ```
1. Install all NPM packages required for the app:
   ```bash
   npm ci
   ```
1. Just to see the app working simply run:
   ```bash
       npm start
   ```
   The app files will be built and web server started.
1. Load the web app in your browser via URL:
    ```
    http://localhost:3000/
    ```

For development it is easier to run server and client-side app processes in two separate terminal windows:
1. Start server:
    ```bash
    npm run server:dev
    ```
1. Run Webpack transpilation and watch for file changes:
    ```bash
    npm run spa:dev
    ```

Good luck!
