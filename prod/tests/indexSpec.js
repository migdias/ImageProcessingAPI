"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('Api Routes', () => {
    it('Checks if homepage is working', async () => {
        const response = await (0, supertest_1.default)(index_1.default).get('/');
        expect(response.status).toEqual(200);
    });
});
