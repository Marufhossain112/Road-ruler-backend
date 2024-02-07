"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middleware/auth"));
const answer_controller_1 = require("./answer.controller");
const router = express_1.default.Router();
router.post('/create-answer', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), answer_controller_1.AnswerController.createAnswer);
router.get('/single-answer', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), answer_controller_1.AnswerController.getSingleAnswer);
router.get('/:user_id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), answer_controller_1.AnswerController.getAllAnswersByUserId);
exports.AnswerRoutes = router;
