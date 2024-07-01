import { createGame } from "../CreateGameService";
import { getRandomBirds, getSppCodesByFamily } from "../BirdsService";
import { getSpeciesList } from "../../api/ebirdAPI";

// Mock the dependencies
jest.mock("../BirdsService", () => ({
  getRandomBirds: jest.fn(),
  getSppCodesByFamily: jest.fn(),
}));
jest.mock("../../api/ebirdAPI", () => ({
  getSpeciesList: jest.fn(),
}));

describe("createGame", () => {
  it("should create a game with the correct number of birds", async () => {
    const filters = {
      selectedCountyRegion: "US-NY",
      selectedStateProvince: "",
      selectedCountry: "",
      selectedFamily: "Hirundinidae",
      birdsNumber: 5,
    };
    const sppCodesByRegion = ["swallow1", "swallow2", "sparrow1"];
    const sppCodesByFamily = ["swallow1", "swallow2"];
    const expectedBirds = ["swallow1", "swallow2"];

    getSpeciesList.mockResolvedValue(sppCodesByRegion);
    getSppCodesByFamily.mockResolvedValue(sppCodesByFamily);
    getRandomBirds.mockReturnValue(expectedBirds);

    const result = await createGame(filters);

    expect(getSpeciesList).toHaveBeenCalledWith("US-NY");
    expect(getSppCodesByFamily).toHaveBeenCalledWith("Hirundinidae");
    expect(getRandomBirds).toHaveBeenCalledWith(sppCodesByFamily, 5);
    expect(result).toEqual(expectedBirds);
  });

  it("should throw an error if no birds match selected filters", async () => {
    const filters = {
      selectedCountyRegion: "US-NY",
      selectedStateProvince: "",
      selectedCountry: "",
      selectedFamily: "Accipitridae", // A family that doesn't match the region's species
      birdsNumber: 5,
    };
    const sppCodesByRegion = ["swallow1", "swallow2"];
    const sppCodesByFamily = ["eagle1", "hawk1"]; // Species not present in the region

    getSpeciesList.mockResolvedValue(sppCodesByRegion);
    getSppCodesByFamily.mockResolvedValue(sppCodesByFamily);

    await expect(createGame(filters)).rejects.toThrow(
      "No birds matching selected filters"
    );
  });
});
