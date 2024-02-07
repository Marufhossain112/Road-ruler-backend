"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const result_controller_1 = require("./result.controller");
const router = express_1.default.Router();
router.post('/create-result', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), result_controller_1.ResultController.createResult);
// router.get(
//   '/single-answer',
//   auth(ENUM_USER_ROLE.USER),
//   AnswerController.getSingleAnswer
// )
// router.get(
//   '/:user_id',
//   auth(ENUM_USER_ROLE.USER),
//   AnswerController.getAllAnswersByUserId
// )
exports.ResultRoutes = router;
