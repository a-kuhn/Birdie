// import axios from "axios";
// import {
//   getSubnational1Regions,
//   getSubnational2Regions,
//   getSpeciesList,
// } from "../ebirdAPI";

// jest.mock("axios");

// describe("eBird API", () => {
//   const mockData = {
//     data: [{ code: "mockCode", name: "mockName" }],
//   };

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("getSubnational1Regions", () => {
//     it("should fetch subnational1 regions", async () => {
//       axios.get.mockResolvedValue(mockData);

//       const result = await getSubnational1Regions("US");
//       expect(result).toEqual(mockData.data);
//       expect(axios.get).toHaveBeenCalledWith(
//         "/ref/region/list/subnational1/US"
//       );
//     });

//     it("should handle errors", async () => {
//       const errorMessage = "Network Error";
//       axios.get.mockRejectedValue(new Error(errorMessage));

//       await expect(getSubnational1Regions("US")).rejects.toThrow(errorMessage);
//       expect(axios.get).toHaveBeenCalledWith(
//         "/ref/region/list/subnational1/US"
//       );
//     });
//   });

//   describe("getSubnational2Regions", () => {
//     it("should fetch subnational2 regions", async () => {
//       axios.get.mockResolvedValue(mockData);

//       const result = await getSubnational2Regions("CA");
//       expect(result).toEqual(mockData.data);
//       expect(axios.get).toHaveBeenCalledWith(
//         "/ref/region/list/subnational2/CA"
//       );
//     });

//     it("should handle errors", async () => {
//       const errorMessage = "Network Error";
//       axios.get.mockRejectedValue(new Error(errorMessage));

//       await expect(getSubnational2Regions("CA")).rejects.toThrow(errorMessage);
//       expect(axios.get).toHaveBeenCalledWith(
//         "/ref/region/list/subnational2/CA"
//       );
//     });
//   });

//   describe("getSpeciesList", () => {
//     it("should fetch species list", async () => {
//       axios.get.mockResolvedValue(mockData);

//       const result = await getSpeciesList("US-CA");
//       expect(result).toEqual(mockData.data);
//       expect(axios.get).toHaveBeenCalledWith("/product/spplist/US-CA");
//     });

//     it("should handle errors", async () => {
//       const errorMessage = "Network Error";
//       axios.get.mockRejectedValue(new Error(errorMessage));

//       await expect(getSpeciesList("US-CA")).rejects.toThrow(errorMessage);
//       expect(axios.get).toHaveBeenCalledWith("/product/spplist/US-CA");
//     });
//   });
// });
import axios from "axios";
import {
  eBirdApi,
  getSubnational1Regions,
  getSubnational2Regions,
  getSpeciesList,
} from "../ebirdAPI"; // Adjust the import according to your file structure

jest.mock("axios");

describe("eBird API", () => {
  const mockData = {
    data: [{ code: "mockCode", name: "mockName" }],
  };

  beforeEach(() => {
    axios.create.mockReturnValue({
      get: jest.fn(),
    });
    eBirdApi.get = axios.create().get;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getSubnational1Regions", () => {
    it("should fetch subnational1 regions", async () => {
      mockGet.mockResolvedValue(mockData);

      const result = await getSubnational1Regions("US");
      expect(result).toEqual(mockData.data);
      expect(mockGet).toHaveBeenCalledWith("/ref/region/list/subnational1/US");
    });

    it("should handle errors", async () => {
      const errorMessage = "Network Error";
      mockGet.mockRejectedValue(new Error(errorMessage));

      await expect(getSubnational1Regions("US")).rejects.toThrow(errorMessage);
      expect(mockGet).toHaveBeenCalledWith("/ref/region/list/subnational1/US");
    });
  });

  describe("getSubnational2Regions", () => {
    it("should fetch subnational2 regions", async () => {
      mockGet.mockResolvedValue(mockData);

      const result = await getSubnational2Regions("CA");
      expect(result).toEqual(mockData.data);
      expect(mockGet).toHaveBeenCalledWith("/ref/region/list/subnational2/CA");
    });

    it("should handle errors", async () => {
      const errorMessage = "Network Error";
      mockGet.mockRejectedValue(new Error(errorMessage));

      await expect(getSubnational2Regions("CA")).rejects.toThrow(errorMessage);
      expect(mockGet).toHaveBeenCalledWith("/ref/region/list/subnational2/CA");
    });
  });

  describe("getSpeciesList", () => {
    it("should fetch species list", async () => {
      mockGet.mockResolvedValue(mockData);

      const result = await getSpeciesList("US-CA");
      expect(result).toEqual(mockData.data);
      expect(mockGet).toHaveBeenCalledWith("/product/spplist/US-CA");
    });

    it("should handle errors", async () => {
      const errorMessage = "Network Error";
      mockGet.mockRejectedValue(new Error(errorMessage));

      await expect(getSpeciesList("US-CA")).rejects.toThrow(errorMessage);
      expect(mockGet).toHaveBeenCalledWith("/product/spplist/US-CA");
    });
  });
});
