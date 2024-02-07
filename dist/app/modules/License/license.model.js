"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.License = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const licenseSchema = new mongoose_1.Schema({
    issue_date: {
        type: Date,
        default: Date.now,
    },
    expiry_date: {
        type: Date,
        default: () => {
            const oneYearLater = new Date();
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
            return oneYearLater;
        },
    },
    license_number: {
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
// 3. Create a License  Model.
exports.License = (0, mongoose_2.model)('License', licenseSchema);
