var render = require('../dist/server/server-render').default;

render('/beans/amanti', function(err, result) {
	console.log(result);
});
