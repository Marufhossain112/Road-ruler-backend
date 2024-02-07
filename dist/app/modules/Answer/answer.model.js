"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const answerSchema = new mongoose_1.Schema({
    selected_answer: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    question_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
}, {
    timestamps: true,
});
// 3. Create a Answer  Model.
exports.Answer = (0, mongoose_2.model)('Answer', answerSchema);
