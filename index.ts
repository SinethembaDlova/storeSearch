import {Server} from './server';
import { Search } from './routes/searchRoute';
import { FilterRoute} from './routes/filterRoute';
var path = require('path');

//instances of my routes
var server = new Server();
var searchRoute = new Search();
var filterRoute = new FilterRoute();

server.app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'))
});

server.app.get('/search', searchRoute.getAllSearches);
server.app.post('/search', searchRoute.storeSearch);
server.app.post('/filter', filterRoute.filter);
