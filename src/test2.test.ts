import { generateBody } from "./test2";

describe("Test test2", () => {
  it("can run", async () => {
    expect(["Schere", "Stein", "Papier"]).toContain(generateBody());
  });
});
