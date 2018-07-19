"use strict";
exports.__esModule = true;
var storeSearchDB_1 = require(".././models/storeSearchDB");
var FilterRoute = (function () {
    function FilterRoute() {
    }
    ;
    FilterRoute.prototype.filter = function (req, res) {
        var filterText = req.body.textr;
        console.log(filterText);
        storeSearchDB_1["default"].find({ regNum: { $regex: filterText } })
            .then(function (searchResults) {
            res.json({
                status: 200,
                message: "Got the searchs with your typed text.",
                data: searchResults
            });
        })["catch"](function (error) { return console.log(error); });
    };
    return FilterRoute;
}());
exports.FilterRoute = FilterRoute;
//# sourceMappingURL=filterRoute.js.map