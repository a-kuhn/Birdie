import { getRandomBirds, getSppCodesByFamily } from "./BirdsService";
import { getSpeciesList } from "../api/ebirdAPI";

export const createGame = async (filtersToApply) => {
  const {
    selectedCountyRegion,
    selectedStateProvince,
    selectedCountry,
    selectedFamily,
    birdsNumber,
  } = filtersToApply;

  let regionCode =
    selectedCountyRegion || selectedStateProvince || selectedCountry || null;

  let sppCodesByRegion = regionCode ? await getSpeciesList(regionCode) : [];
  let sppCodesByFamily = selectedFamily
    ? await getSppCodesByFamily(selectedFamily)
    : [];

  let sppCodes = sppCodesByFamily.filter((sppCode) =>
    sppCodesByRegion.includes(sppCode)
  );

  if (sppCodes.length === 0) {
    throw new Error("No birds matching selected filters");
  }
  const randomBirds = getRandomBirds(sppCodes, birdsNumber);
  return randomBirds;
};
