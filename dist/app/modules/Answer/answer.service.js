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
exports.AnswerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const answer_model_1 = require("./answer.model");
const createAnswer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAnswerExist = yield answer_model_1.Answer.findOne({
        user_id: payload.user_id,
        question_id: payload.question_id,
    });
    if (isAnswerExist) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'User already selected answer for this question');
    }
    const result = yield answer_model_1.Answer.create(payload);
    return result;
});
const getSingleAnswer = (user_id, question_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield answer_model_1.Answer.findOne({ user_id, question_id }).populate([
        {
            path: 'user_id',
        },
        {
            path: 'question_id',
        },
    ]);
    return result;
});
const getAllAnswersByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield answer_model_1.Answer.find({ user_id }).populate([
        {
            path: 'user_id',
        },
        {
            path: 'question_id',
        },
    ]);
    return result;
});
exports.AnswerService = {
    createAnswer,
    getSingleAnswer,
    getAllAnswersByUserId,
};
