import { Text, Pressable, Linking, StyleSheet } from "react-native";

export default function TrailerButton(props) {
  const { trailerUrl } = props;
  return (
    <>
      <Pressable
        onPress={() => {
          Linking.openURL(trailerUrl);
        }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#080808" : "#E61B1F" },
        ]}
      >
        {({ pressed }) => (
          <Text style={[styles.text, { color: pressed ? "#fff" : "#fff" }]}>
            See Trailer
          </Text>
        )}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    marginHorizontal: 100,
    marginTop: 20,
    paddingVertical: 16,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
