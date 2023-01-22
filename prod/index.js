"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000;
// Default route for the home page
app.use('/', index_1.default);
// Starting the express server
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});
exports.default = app;
