require("dotenv").config();

import { SafeAreaView, StyleSheet } from "react-native";
import CreateGameScreen from "./src/screens/CreateGameScreen";
import Flashcard from "./src/components/Flashcard";

export default function App() {
  const bird = {
    famComName: "bird",
    imageUrl: "bird",
    comName: "bird",
    sciName: "bird",
  };
  return (
    <SafeAreaView style={styles.container}>
      <CreateGameScreen />
      <Flashcard bird={bird} birdIdx={0} totalBirdCount={1} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
});
