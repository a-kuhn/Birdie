// import axios from "axios";

// const EBIRD_API_KEY = process.env.EBIRD_API_KEY;
// const eBirdApi = axios.create({
//   baseURL: "https://api.ebird.org/v2",
//   headers: {
//     "X-eBirdApiToken": EBIRD_API_KEY,
//   },
// });

// const subNational1Url = `/ref/region/list/subnational1`;
// const subNational2Url = `/ref/region/list/subnational2`;

// export const getSubnational1Regions = (selectedCountry) => {
//   return new Promise((resolve, reject) => {
//     eBirdApi
//       .get(`${subNational1Url}/${selectedCountry}`)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         reject(err);
//       });
//   }).catch((err) => {
//     console.log("An error occurred:", err);
//   });
// };

// export const getSubnational2Regions = (selectedStateProvince) => {
//   return new Promise((resolve, reject) => {
//     eBirdApi
//       .get(`${subNational2Url}/${selectedStateProvince}`)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         reject(err);
//       });
//   }).catch((err) => {
//     console.log("An error occurred:", err);
//   });
// };

// export const getSpeciesList = (regionCode) => {
//   return new Promise((resolve, reject) => {
//     eBirdApi
//       .get(`/product/spplist/${regionCode}`)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         reject(err);
//       });
//   }).catch((err) => {
//     console.log("An error occurred:", err);
//   });
// };
import axios from "axios";
import { EBIRD_API_KEY } from "@env";

export const eBirdApi = axios.create({
  baseURL: "https://api.ebird.org/v2",
  headers: {
    "X-eBirdApiToken": EBIRD_API_KEY,
  },
});

const subNational1Url = `/ref/region/list/subnational1`;
const subNational2Url = `/ref/region/list/subnational2`;

export const getSubnational1Regions = async (selectedCountry) => {
  try {
    const res = await eBirdApi.get(`${subNational1Url}/${selectedCountry}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSubnational2Regions = async (selectedStateProvince) => {
  try {
    const res = await eBirdApi.get(
      `${subNational2Url}/${selectedStateProvince}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSpeciesList = async (regionCode) => {
  try {
    const res = await eBirdApi.get(`/product/spplist/${regionCode}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
