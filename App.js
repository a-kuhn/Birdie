import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import colors from "./assets/colors";
import GameScreen from "./src/screens/GameScreen";
import CreateGameScreen from "./src/screens/CreateGameScreen";

function App() {
  const [gameBirds, setGameBirds] = useState([]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          marginTop: "20%",
        }}
        style={styles.scrollView}
      >
        {!gameBirds || gameBirds.length === 0 ? (
          <CreateGameScreen setGameBirds={setGameBirds} />
        ) : null}
        {gameBirds && gameBirds.length > 0 ? (
          <GameScreen birds={gameBirds} setGameBirds={setGameBirds} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow_green,
  },
  scrollView: {
    width: "85%",
  },
});

export default App;
