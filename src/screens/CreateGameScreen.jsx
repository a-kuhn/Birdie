import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";
import Dropdown from "../components/Dropdown";
import allCountries from "../../assets/data/AllCountries.json";
import { getUniqueFamilies } from "../services/BirdsService";
import { createGame } from "../services/CreateGameService";
import {
  getSubnational1Regions,
  getSubnational2Regions,
} from "../api/ebirdAPI";

export default CreateGameScreen = ({ setGameBirds }) => {
  const uniqueFamilies = getUniqueFamilies();
  const birdNumberOpts = ["25", "50", "all"];
  const [birdsNumber, setBirdsNumber] = useState("25");
  const [selectedFamily, setSelectedFamily] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStateProvince, setSelectedStateProvince] = useState("");
  const [selectedCountyRegion, setSelectedCountyRegion] = useState("");
  const [allSubnational1, setAllSubnational1] = useState([]);
  const [allSubnational2, setAllSubnational2] = useState([]);

  useEffect(() => {
    setSelectedCountyRegion("");
    setSelectedStateProvince("");
    setAllSubnational2([]);
    if (selectedCountry) {
      getSubnational1Regions(selectedCountry)
        .then((subNational1Regions) => {
          setAllSubnational1(subNational1Regions);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedStateProvince) {
      getSubnational2Regions(selectedStateProvince)
        .then((subNational2Regions) => {
          setAllSubnational2(subNational2Regions);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedStateProvince]);

  const handleCreateGame = async () => {
    const filtersToApply = {
      birdsNumber,
      selectedFamily,
      selectedCountry,
      selectedStateProvince,
      selectedCountyRegion,
    };
    const gameBirds = await createGame(filtersToApply);
    setGameBirds(gameBirds);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 24,
          color: "purple",
          paddingVertical: 5,
        }}
      >
        Create New Game
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingTop: 10 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "purple" }} />
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: 4,
            color: "purple",
          }}
        >
          Number of flashcards
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "purple" }} />
      </View>
      <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
        {birdNumberOpts.map((opt, i) => (
          <RadioButton
            key={i}
            radioText={opt}
            selected={opt === birdsNumber}
            onClick={() => {
              setBirdsNumber(opt);
            }}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "purple" }} />
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: 4,
            color: "purple",
          }}
        >
          Family (optional)
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "purple" }} />
      </View>
      <Dropdown
        dropdownLabel={"Family"}
        dropdownData={uniqueFamilies}
        labelField={"famComName"}
        valueField={"famComNameCode"}
        placeholder={"Select a family"}
        selectedValue={selectedFamily}
        onSelect={(item) => {
          setSelectedFamily(item.famComNameCode);
        }}
      />
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingTop: 10 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "purple" }} />
        <View>
          <Text
            style={{
              textAlign: "center",
              paddingHorizontal: 4,
              color: "purple",
            }}
          >
            Location (optional)
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "purple" }} />
      </View>
      <Dropdown
        dropdownLabel={"Country"}
        dropdownData={allCountries}
        labelField={"name"}
        valueField={"code"}
        placeholder={"Select a country"}
        selectedValue={selectedCountry}
        onSelect={(item) => {
          setSelectedCountry(item.code);
        }}
      />
      {selectedCountry && allSubnational1.length > 0 && (
        <Dropdown
          dropdownLabel={"State/Province"}
          dropdownData={allSubnational1}
          labelField={"name"}
          valueField={"code"}
          placeholder={"Select a state/province"}
          selectedValue={selectedStateProvince}
          onSelect={(item) => {
            setSelectedStateProvince(item.code);
          }}
        />
      )}
      {selectedStateProvince && allSubnational2.length > 0 && (
        <Dropdown
          dropdownLabel={"County/Region"}
          dropdownData={allSubnational2}
          labelField={"name"}
          valueField={"code"}
          placeholder={"Select a county/region"}
          selectedValue={selectedCountyRegion}
          onSelect={(item) => {
            setSelectedCountyRegion(item.code);
          }}
        />
      )}
      <Button title="create game" onClick={handleCreateGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});
