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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const result_service_1 = require("./result.service");
const createResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ResultData = __rest(req.body, []);
    const result = yield result_service_1.ResultService.createResult(ResultData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Result created successfully',
        data: result,
    });
}));
// const getSingleAnswer = catchAsync(async (req: Request, res: Response) => {
//   const { user_id, question_id } = req.body
//   const result = await AnswerService.getSingleAnswer(user_id, question_id)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Single Answer fetched by user id successfully',
//     data: result,
//   })
// })
// const getAllAnswersByUserId = catchAsync(
//   async (req: Request, res: Response) => {
//     const { user_id } = req.params
//     const result = await AnswerService.getAllAnswersByUserId(user_id)
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'All Answers fetched by user id successfully',
//       data: result,
//     })
//   }
// )
exports.ResultController = {
    createResult,
    //   getSingleAnswer,
    //   getAllAnswersByUserId,
};
