module.exports = {
  entry: [
    'isomorphic-fetch',
    './src/render.js'
  ],
  output: {
    // The build folder.
    path: 'dist/server',
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'server-render.js',
  },
}