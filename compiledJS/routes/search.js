"use strict";
exports.__esModule = true;
var storeSearchDB_1 = require("../models/storeSearchDB");
var Search = (function () {
    function Search() {
    }
    Search.prototype.getRegNum = function (req, res) {
        storeSearchDB_1["default"].find({})
            .then(function (allPlates) {
            res.render('registration_number', {
                regPlate: allPlates
            });
        })["catch"](function (error) { return (console.log(error)); });
    };
    Search.prototype.storesSearch = function (req, res) {
        var enteredRegNum = req.body.takeReg;
        var regPlates = new storeSearchDB_1["default"]({
            regNum: enteredRegNum
        });
        regPlates.save()
            .then(function (plate) {
            res.redirect('/');
        })["catch"](function (error) { return (console.log(error)); });
    };
    return Search;
}());
exports.Search = Search;
//# sourceMappingURL=search.js.map