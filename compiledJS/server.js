"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var session = require("express-session");
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
    }
    Server.prototype.config = function () {
        var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/storedSearches";
        mongoose.connect(mongoURL || undefined, { useMongoClient: true })
            .then(function () {
            console.log("Connected to Mongo.");
        })["catch"](function (err) {
            console.log(err);
            process.exit(1);
        });
        this.app.set('view engine', 'hbs');
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(session({
            secret: 'keyboard cat',
            cookie: {
                maxAge: 6000 * 30
            }
        }));
        this.app.use(logger("dev"));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
                return res.status(200).json({});
            }
            next();
        });
        var port = process.env.PORT || 8000;
        this.app.listen(port, function () { return console.log("Server running on port " + port); });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map