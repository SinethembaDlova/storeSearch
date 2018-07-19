"use strict";
exports.__esModule = true;
var server_1 = require("./server");
var searchRoute_1 = require("./routes/searchRoute");
var filterRoute_1 = require("./routes/filterRoute");
var path = require('path');
var server = new server_1.Server();
var searchRoute = new searchRoute_1.Search();
var filterRoute = new filterRoute_1.FilterRoute();
server.app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});
server.app.get('/search', searchRoute.getAllSearches);
server.app.post('/search', searchRoute.storeSearch);
server.app.post('/filter', filterRoute.filter);
//# sourceMappingURL=index.js.map