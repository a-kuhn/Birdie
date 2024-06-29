import {
  getAllSppCodes,
  getRandomBirds,
  getBirdsByFamily,
  getSppCodesByFamily,
  getUniqueFamilies,
  getSingleBirdBySpeciesCode,
  getBirdsBySpeciesCodes,
} from "../BirdsService";

jest.mock("../../../assets/data/AllBirds.json", () =>
  require("../../../assets/data/AllBirds.mock.json")
);

describe("Birds Utils", () => {
  it("should get all species codes", () => {
    const speciesCodes = getAllSppCodes();
    expect(speciesCodes).toEqual(["abc123", "def456", "ghi789"]);
  });

  it("should get random birds", () => {
    const sppCodes = ["abc123", "def456", "ghi789"];
    const randomBirds = getRandomBirds(sppCodes, 2);
    expect(randomBirds).toHaveLength(2);
    randomBirds.forEach((bird) => {
      expect(sppCodes).toContain(bird.sppCode);
    });
  });

  it("should get birds by family", () => {
    const birds = getBirdsByFamily("family1");
    expect(birds).toHaveLength(2);
    expect(birds[0].famComNameCode).toBe("family1");
  });

  it("should get species codes by family", () => {
    const sppCodes = getSppCodesByFamily("family1");
    expect(sppCodes).toEqual(["abc123", "def456"]);
  });

  it("should get unique families", () => {
    const uniqueFamilies = getUniqueFamilies();
    expect(uniqueFamilies).toHaveLength(2);
    expect(uniqueFamilies).toEqual([
      { famComNameCode: "family1", famComName: "Family One" },
      { famComNameCode: "family2", famComName: "Family Two" },
    ]);
  });

  it("should get a single bird by species code", () => {
    const bird = getSingleBirdBySpeciesCode("abc123");
    expect(bird).toEqual({
      speciesCode: "abc123",
      sppCode: "abc123",
      famComNameCode: "family1",
      famComName: "Family One",
    });
  });

  it("should get birds by species codes", () => {
    const birds = getBirdsBySpeciesCodes(["abc123", "ghi789"]);
    expect(birds).toHaveLength(2);
    expect(birds[0].sppCode).toBe("abc123");
    expect(birds[1].sppCode).toBe("ghi789");
  });
});
