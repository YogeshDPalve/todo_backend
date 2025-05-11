"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodoValidation = exports.updateTodoValidation = exports.todoIdValidation = void 0;
const express_validator_1 = require("express-validator");
exports.todoIdValidation = [
    (0, express_validator_1.param)("todoId").notEmpty().withMessage("Todo id is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    },
];
exports.updateTodoValidation = [
    (0, express_validator_1.body)("todoId").notEmpty().withMessage("Todo id is required"),
    (0, express_validator_1.body)("title").notEmpty().withMessage("Todo title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Todo description is required"),
    (req, res, next) => {
        console.log("From validation");
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    },
];
exports.addTodoValidation = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Todo title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Todo description is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    },
];
