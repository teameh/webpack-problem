# webpack-problem

This is a repository to show my Webpack problem. My kingdom for anyone that can solve it.

The problem is (relatively) simple:

* There is a Reac App in the `customer` directory (Created with the create-react-app application) do `npm 
* In the `src` directory are 2 main javascript files: `render.js` and `client.js`.
* In the webpack directory will be 2 webpack configuration files. One for the server and one for the client.
* The server config file only has to create a JS file, ideally without CSS and stuff. You should be able to run `test-render.js` on it and get results
* The client config needs to build a few different assets. Most important is the HTML from `customer/public/index.html` with the JS and CSS injected.
* CSS and all other assets need to be taken out of the JS
* You should be able to host the files and see a React app.

Bonus points can be had for showing how to take libraries out of the main JS and inject them into the HTML with script tags.
