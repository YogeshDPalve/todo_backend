"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoModel = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    isread: {
        type: Number,
        default: 0,
    },
}, { strict: true, timestamps: true });
exports.todoModel = (0, mongoose_1.model)("Todo", todoSchema);
