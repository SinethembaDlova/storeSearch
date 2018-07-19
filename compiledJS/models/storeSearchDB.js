"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var storeSearchSchema = new mongoose_1.Schema({
    search: {
        type: String,
        unique: true,
        sparse: true
    },
    time: Date,
    counter: Number
});
storeSearchSchema.index({
    search: 1
}, {
    unique: true
});
exports["default"] = mongoose_1.model('search', storeSearchSchema);
//# sourceMappingURL=storeSearchDB.js.map