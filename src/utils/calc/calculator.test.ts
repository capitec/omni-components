import { add } from './calculator'

describe("test add function", () => {
  it("should return 15 for add(10,5)", () => {
    expect(add(10, 5)).toBe(13);
  });
it("should return 5 for add(2,3)", () => {
    expect(add(2, 3)).toBe(5);
  });
});