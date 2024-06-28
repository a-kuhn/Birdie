import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

export default FlashCard = ({ bird, birdIdx, totalBirdCount }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: false,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipCard}>
        <View>
          <Animated.View
            style={[
              styles.card,
              frontAnimatedStyle,
              { opacity: isFlipped ? 0 : 1 },
            ]}
          >
            <Text style={styles.cardCount}>
              bird {birdIdx + 1}/{totalBirdCount}
            </Text>
            <Image source={{ uri: bird.imageUrl }} style={styles.image} />
          </Animated.View>
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              backAnimatedStyle,
              { opacity: isFlipped ? 1 : 0 },
            ]}
          >
            <Text style={styles.cardCount}>
              bird {birdIdx + 1}/{totalBirdCount}
            </Text>
            <Text style={styles.famComName}>{bird.famComName}</Text>
            <Image source={{ uri: bird.imageUrl }} style={styles.smallImage} />
            <Text style={styles.comName}>{bird.comName}</Text>
            <Text style={styles.latinName}>{bird.sciName}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 300,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    backfaceVisibility: "hidden",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  cardBack: {
    position: "absolute",
    top: 0,
  },
  cardCount: {
    fontSize: 14,
    color: "purple",
    position: "absolute",
    top: 10,
    right: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  smallImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  famComName: {
    fontSize: 18,
    marginBottom: 10,
  },
  comName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  latinName: {
    fontSize: 20,
    fontStyle: "italic",
  },
});
