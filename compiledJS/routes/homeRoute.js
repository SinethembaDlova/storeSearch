"use strict";
exports.__esModule = true;
var HomeRoute = (function () {
    function HomeRoute() {
    }
    HomeRoute.prototype.getRegNum = function (req, res) {
        regDB.find({})
            .then(function (allPlates) {
            res.render('registration_number', {
                regPlate: allPlates
            });
        })["catch"](function (error) { return (console.log(error)); });
    };
    HomeRoute.prototype.createRegNum = function (req, res) {
        var enteredRegNum = req.body.takeReg;
        var regPlates = new regDB({
            regNum: enteredRegNum
        });
        regPlates.save()
            .then(function (plate) {
            res.redirect('/');
        })["catch"](function (error) { return (console.log(error)); });
    };
    return HomeRoute;
}());
exports.HomeRoute = HomeRoute;
//# sourceMappingURL=homeRoute.js.map