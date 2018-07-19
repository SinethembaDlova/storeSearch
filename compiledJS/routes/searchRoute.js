"use strict";
exports.__esModule = true;
var storeSearchDB_1 = require("../models/storeSearchDB");
var Search = (function () {
    function Search() {
    }
    Search.prototype.getAllSearches = function (req, res) {
        storeSearchDB_1["default"].find({}, null, { sort: { counter: -1 } })
            .then(function (allSearches) {
            res.json({
                status: 200,
                message: "Got all the searches from the database.",
                data: allSearches
            });
        })["catch"](function (error) { return (console.log(error)); });
    };
    Search.prototype.storeSearch = function (req, res) {
        var enteredSearch = req.body.takeSearch;
        if (!enteredSearch) {
            return;
        }
        var newSearch = new storeSearchDB_1["default"]({
            search: enteredSearch.toLowerCase(),
            time: Date.now(),
            counter: 1
        });
        newSearch.save()
            .then(function (search) {
            res.json({
                status: 200,
                message: "Search saved in the database.",
                data: newSearch
            });
        })["catch"](function (err) {
            if (err.code === 11000) {
                storeSearchDB_1["default"].findOne({ search: enteredSearch.toLowerCase() }).then(function (matchingSearch) {
                    console.log("matching search: ", matchingSearch);
                    matchingSearch.counter++;
                    matchingSearch.save().then(function (updatedSearch) {
                        res.json({
                            status: 200,
                            message: "Updated counter.",
                            data: newSearch
                        });
                    });
                });
            }
        });
    };
    return Search;
}());
exports.Search = Search;
//# sourceMappingURL=searchRoute.js.map