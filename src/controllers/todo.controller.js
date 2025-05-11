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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoById = exports.updateTodo = exports.updateStatus = exports.removeTodo = exports.addTodo = exports.getTodos = void 0;
const todo_schema_1 = require("../models/todo.schema");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTodos = yield todo_schema_1.todoModel.find();
        if (!getTodos) {
            return res.status(400).send({
                success: false,
                message: "Todos not found",
            });
        }
        return res.status(200).send({
            success: true,
            getTodos,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "Internal server error",
        });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(404).send({
                success: false,
                message: "Title and Description are required",
            });
        }
        const todo = yield todo_schema_1.todoModel.create({ title, description });
        if (!todo) {
            return res.status(400).send({
                success: false,
                message: "Error to create todo",
                todo,
            });
        }
        return res.status(201).send({
            success: true,
            message: "Todo added successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "Internal server error",
        });
    }
});
exports.addTodo = addTodo;
const removeTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        if (!todoId) {
            return res.status(404).send({
                success: false,
                message: "Todo id is required to remove todo",
            });
        }
        const removeTodo = yield todo_schema_1.todoModel.findOneAndDelete({ _id: todoId });
        if (!removeTodo) {
            return res.status(400).send({
                success: false,
                message: "Error to remove todo",
            });
        }
        return res.status(200).send({
            success: false,
            message: "Todo removed successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "Internal server error",
        });
    }
});
exports.removeTodo = removeTodo;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        const todo = yield todo_schema_1.todoModel.findById(todoId);
        if (!todo) {
            return res.status(400).send({
                success: false,
                message: "Todo not found",
            });
        }
        const updatedTodo = yield todo_schema_1.todoModel.findByIdAndUpdate(todoId, { isread: todo.isread === 1 ? 0 : 1 }, { new: true });
        if (!updatedTodo) {
            return res.status(400).send({
                success: false,
                message: "Todo not updated",
            });
        }
        const status = (updatedTodo === null || updatedTodo === void 0 ? void 0 : updatedTodo.isread) ? "read" : "un-read";
        return res.status(200).send({
            success: true,
            message: `Todo marked as ${status}`,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.updateStatus = updateStatus;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId, title, description } = req.body;
        const todo = yield todo_schema_1.todoModel.findById(todoId);
        if (!todo) {
            return res.status(400).send({
                success: false,
                message: "Todo not found",
            });
        }
        const updatedTodo = yield todo_schema_1.todoModel.findByIdAndUpdate(todoId, {
            title,
            description,
        });
        return res.status(200).send({
            success: true,
            message: "Todo updated successfully",
            updatedTodo,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.updateTodo = updateTodo;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query);
        const { todoId } = req.query;
        if (!todoId) {
            return res.status(404).send({
                success: false,
                message: "todoId is required",
            });
        }
        const todo = yield todo_schema_1.todoModel.findById(todoId);
        return res.status(200).send({
            todo,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getTodoById = getTodoById;
