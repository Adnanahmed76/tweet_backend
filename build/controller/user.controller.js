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
exports.deleteUserController = exports.updatedUserController = exports.createUserController = exports.getUserController = void 0;
const user_repositories_1 = require("../repositories/user.repositories");
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield (0, user_repositories_1.getUserRepo)(userId);
        if (user) {
            res.status(200).json({ "data": user });
        }
        else {
            res.status(500).json({ "error": "Found user not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.getUserController = getUserController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const success = yield (0, user_repositories_1.createUserRepo)(user);
        if (success) {
            res.status(200).json({ "data": user });
        }
        else {
            res.status(500).json({ "error": " user Not Created" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.createUserController = createUserController;
const updatedUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUser = req.body;
    try {
        const success = yield (0, user_repositories_1.updateUserRepo)(updateUser.uid, updateUser);
        if (success) {
            res.status(200).json({ data: "User Updated" });
        }
        else {
            res.status(500).json({ error: "User Not Updated" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
exports.updatedUserController = updatedUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const success = yield (0, user_repositories_1.deleteUserRepo)(userId);
        if (success) {
            res.status(200).json({ "data": "User deleted" });
        }
        else {
            res.status(500).json({ "error": " user Not deleted" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.deleteUserController = deleteUserController;
