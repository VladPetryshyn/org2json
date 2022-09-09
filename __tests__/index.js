"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const constants_1 = require("../testHelpers/constants");
describe("testing basic functionality", () => {
    let json = [];
    beforeAll(() => {
        json = (0, index_1.orgToJson)(constants_1.org);
    });
    it("should parse org syntax", () => {
        expect(json).toEqual(constants_1.orgInJson);
    });
});
