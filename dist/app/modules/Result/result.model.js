"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const result_constant_1 = require("./result.constant");
const resultSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    license: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'License',
        required: true,
    },
    score: {
        type: Number,
        required: true,
        default: 0,
    },
    pass_status: {
        type: String,
        enum: result_constant_1.passStatus,
        required: true,
        default: 'Failed',
    },
}, {
    timestamps: true,
});
// 3. Create a Result  Model.
exports.Result = (0, mongoose_2.model)('Result', resultSchema);
