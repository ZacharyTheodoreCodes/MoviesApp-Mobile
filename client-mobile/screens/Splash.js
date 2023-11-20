import { useNavigation } from "@react-navigation/core";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";

export default function Splash() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
        }}
        style={{
          height: 90,
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#080808" : "#E61B1F" },
        ]}
      >
        {({ pressed }) => (
          <Text style={[styles.text, { color: pressed ? "#fff" : "#fff" }]}>
            See Movies
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 4,
    marginHorizontal: 100,
    marginTop: 20,
    padding: 16,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
