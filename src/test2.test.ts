import { generateBody } from "./test2";

describe("Test test2", () => {
  it("can run", async () => {
    expect(["Schere1", "Stein1", "Papier1"]).toContain(generateBody());
  });
});
