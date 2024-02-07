"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const profile_constant_1 = require("./profile.constant");
const profileSchema = new mongoose_1.Schema({
    document_type: {
        type: String,
        required: true,
        enum: profile_constant_1.DocumentTypes,
    },
    document_img: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
// 3. Create a Profile  Model.
exports.Profile = (0, mongoose_2.model)('Profile', profileSchema);
