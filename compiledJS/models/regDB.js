"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var RegNumSchema = new mongoose_1.Schema({
    regNum: {
        type: String,
        unique: true,
        sparse: true,
        uppercase: true
    }
});
RegNumSchema.index({
    regNum: 1
}, {
    unique: true
});
exports["default"] = mongoose_1.model('regDB', RegNumSchema);
//# sourceMappingURL=regDB.js.map