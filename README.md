<p align="center">
    <img src="./public/project-icons/personal-site-logo.png" alt="React & Material UI Personal Website" width="300"/>
    <h1 align="center">
        React & Material UI Personal Website
    </h1>
</p>

# Introduction

This project is home to the code for my personal website, https://katdonegan.com. It was built using React, SCSS, and Material UI, and is integrated with Google Firebase for hosting.

## resume.json

Much of what you see on the site is pulled from metadata rather than being hardcoded in React. The [resume.json](./src/resume.json) file (mostly) follows the [JSON Resume spec](https://jsonresume.org/), with a few exceptions where I needed additional attributes beyond what the spec supported.

Data is pulled from that file and is used to dynamically build sections like the links to my socials and my list of projects.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `npm run deploy`

Runs `npm run build` and then deploys it to Firebase hosting.

The live site can be visited at https://katdonegan.com.