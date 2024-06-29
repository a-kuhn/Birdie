import birdsData from "../../assets/data/AllBirds.json";

export const getAllSppCodes = () => {
  return birdsData.map((bird) => bird.speciesCode);
};

export const getRandomBirds = (sppCodes, count) => {
  const allBirds = getBirdsBySpeciesCodes(sppCodes);
  const randomBirds = allBirds
    .sort(() => Math.random() - Math.random())
    .slice(0, count);
  return randomBirds;
};

export const getBirdsByFamily = (famComNameCode) => {
  return birdsData.filter((bird) => bird.famComNameCode === famComNameCode);
};

export const getSppCodesByFamily = (famComNameCode) => {
  return birdsData
    .filter((bird) => bird.famComNameCode === famComNameCode)
    .map((bird) => bird.sppCode);
};

export const getUniqueFamilies = () => {
  return birdsData.reduce((acc, bird) => {
    if (!acc.some((family) => family.famComNameCode === bird.famComNameCode)) {
      acc.push({
        famComNameCode: bird.famComNameCode,
        famComName: bird.famComName,
      });
    }
    return acc;
  }, []);
};

export const getSingleBirdBySpeciesCode = (speciesCode) => {
  return birdsData.find((bird) => bird.speciesCode === speciesCode);
};

export const getBirdsBySpeciesCodes = (speciesCodes) => {
  return birdsData.filter(
    (bird) => speciesCodes && speciesCodes.includes(bird.sppCode)
  );
};
