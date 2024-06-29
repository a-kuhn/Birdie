import { SafeAreaView, StyleSheet } from "react-native";
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
