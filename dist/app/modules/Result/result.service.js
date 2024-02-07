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
exports.ResultService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const answer_model_1 = require("../Answer/answer.model");
const result_model_1 = require("./result.model");
const question_model_1 = require("../Question/question.model");
const utils_1 = require("../../../utils");
const license_model_1 = require("../License/license.model");
const createResult = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAnswerExist = yield answer_model_1.Answer.find({
        user_id: payload.user_id,
    }).populate([
        {
            path: 'user_id',
        },
        {
            path: 'question_id',
        },
    ]);
    console.log('🚀 isUserAnswerExist', isUserAnswerExist);
    if (isUserAnswerExist.length === 0) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'No answer found for this user');
    }
    const isUserResultExist = yield result_model_1.Result.findOne({ user_id: payload.user_id });
    //   console.log('🚀 isUserResultExist', isUserResultExist)
    let result;
    if (!isUserResultExist) {
        result = yield result_model_1.Result.create(payload);
    }
    let score = 0;
    const results = isUserAnswerExist.map(answer => ({
        selected_answer: answer.selected_answer,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        correct_answer: answer.question_id.correct_answer,
    }));
    //   console.log('🚀 results', results)
    // return
    for (const { selected_answer, correct_answer } of results) {
        if (selected_answer === correct_answer) {
            score++;
        }
    }
    const allQuestions = yield question_model_1.Question.find();
    const passingScore = 0.7;
    const totalQuestions = allQuestions.length;
    //   console.log('🚀 total questions', totalQuestions)
    const percentageScore = score / totalQuestions;
    //   console.log('🚀 percentage Score', percentageScore)
    const pass_status = percentageScore >= passingScore ? 'Passed' : 'Failed';
    const generateLicense = (0, utils_1.generateLicenseNumber)();
    // console.log('License number', generateLicense)
    const isUserLicenseExist = yield license_model_1.License.findOne({ user_id: payload.user_id });
    if (isUserLicenseExist) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'User already has a license.');
    }
    let license;
    if (pass_status === 'Passed') {
        license = yield license_model_1.License.create({
            user_id: payload.user_id,
            license_number: generateLicense,
        });
    }
    result = yield result_model_1.Result.findOneAndUpdate({ user_id: payload.user_id }, { score, pass_status, license }, { new: true });
    return result === null || result === void 0 ? void 0 : result.populate([
        {
            path: 'user_id',
        },
        {
            path: 'license',
        },
    ]);
});
exports.ResultService = {
    createResult,
    //   getSingleAnswer,
    //   getAllAnswersByUserId,
};
