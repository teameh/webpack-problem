import reducer from './src/reducers';
import routes from './src/routes';
import thunk from 'redux-thunk'

const config = {
	redux: {
		reducer: reducer,
		middleware: [ thunk ]
	},
	router: {
		routes: routes	
	}
};

export default config