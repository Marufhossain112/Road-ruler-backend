"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const profile_route_1 = require("../modules/Profile/profile.route");
const question_route_1 = require("../modules/Question/question.route");
const answer_route_1 = require("../modules/Answer/answer.route");
const result_route_1 = require("../modules/Result/result.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/profiles',
        route: profile_route_1.ProfileRoutes,
    },
    {
        path: '/questions',
        route: question_route_1.QuestionRoutes,
    },
    {
        path: '/answers',
        route: answer_route_1.AnswerRoutes,
    },
    {
        path: '/results',
        route: result_route_1.ResultRoutes,
    },
];
moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
