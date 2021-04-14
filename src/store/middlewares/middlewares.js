import settings from './settings.middleware.js'
import themes from './themes.middleware.js';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';


export default [
    promise,
    thunkMiddleware,
    settings,
    themes
]