import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FlashCard from "../components/Flashcard";
import Button from "../components/Button";

export default GameScreen = ({ birds, setGameBirds }) => {
  const gameBirds = birds;
  const [currentBirdIndex, setCurrentBirdIndex] = useState(0);

  const handlePrevBird = () => {
    setCurrentBirdIndex(
      (prevIndex) => (prevIndex + gameBirds.length - 1) % gameBirds.length
    );
  };
  const handleNextBird = () => {
    setCurrentBirdIndex((prevIndex) => (prevIndex + 1) % gameBirds.length);
  };
  const handleRestartGame = () => {
    setCurrentBirdIndex(0);
  };
  const handleEndGame = () => {
    setCurrentBirdIndex(0);
    setGameBirds([]);
  };

  return (
    <View style={styles.container}>
      <FlashCard
        bird={gameBirds[currentBirdIndex]}
        birdIdx={currentBirdIndex}
        totalBirdCount={gameBirds.length}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Button title="Prev Bird" onClick={handlePrevBird} />
        <Button title="Next Bird" onClick={handleNextBird} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Button
          title="Restart Game"
          onClick={handleRestartGame}
          isDisabled={currentBirdIndex === 0}
        />
        <Button title="End Game" onClick={handleEndGame} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
