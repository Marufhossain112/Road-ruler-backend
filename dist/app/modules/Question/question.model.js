"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correct_answer: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
// 3. Create a Question  Model.
exports.Question = (0, mongoose_2.model)('Question', questionSchema);
