"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const profile_model_1 = require("./profile.model");
const user_modal_1 = require("../User/user.modal");
const createProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.create(payload);
    return result;
});
const getSingleProfileByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.findOne({ user_id }).populate('user_id');
    return result;
});
const updateSingleProfileByUserId = (user_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield profile_model_1.Profile.findOne({ user_id });
    if (!userProfile) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'No user found');
    }
    // const user = await User.findById( user_id )
    const updatedUser = yield user_modal_1.User.findOneAndUpdate({ _id: user_id }, {
        $set: {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            contact_details: payload.contact_details,
        },
    }, {
        new: true,
    });
    return updatedUser;
});
exports.ProfileService = {
    createProfile,
    getSingleProfileByUserId,
    updateSingleProfileByUserId,
};
