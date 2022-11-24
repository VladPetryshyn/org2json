import { orgToJson, Note } from "../index";
import { org, orgInJson } from "../testHelpers/constants";

describe("testing basic functionality", () => {
  let json: Array<Note> = [];
  beforeAll(() => {
    json = orgToJson(org).notes;
  });
  it("should parse org syntax", () => {
    console.log(json);
    // expect(json).toEqual({});
  });
});
