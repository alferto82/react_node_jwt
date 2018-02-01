# BACKEND

## Node Token Authentication

This repo uses JSON Web Tokens and the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package to implement token based authentication on a simple Node.js API.

### Requirements

- node and npm

### Usage

1. Clone the repo
2. Install dependencies: `npm install`
3. Start the server: `node run dev`

Once everything is set up, we can begin to use our app by creating and verifying tokens.




#FRONTEND

Using React and Redux 
=======================
Usage
-----

#### `npm install`
Install Node modules listed in ./package.json`

#### `npm start`
Runs the webpack build system with HMR. Webpack dev server can be found at `localhost:5000`.

Structure
---------

```
.
├── bin                          # Build/Start scripts
├── build                        # All build-related configuration
│   ├── webpack                  # Environment-specific configuration files for Webpack
├── config                       # Project configuration settings
└── src                          # App source code
    ├── actions                  # Redux actions
    ├── components               # Generic React Components
    ├── reducers                 # Redux reducers (all are imported in index.js)
    ├── styles                   # App SASS styles, all are imported into app.scss
```