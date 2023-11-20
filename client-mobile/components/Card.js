import { useNavigation } from "@react-navigation/core";
import { Image, Pressable, Text, View } from "react-native";

export default function Card({ movie }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderRadius: 5,
        width: "50%",
        marginBottom: 10,
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("Detail", { id: movie.id});
        }}
      >
        <Image
          source={{ uri: movie.imgUrl }}
          style={{ width: "100%", objectFit: "contain", aspectRatio: 1 }}
        />
        <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>
          {movie.title}
        </Text>
      </Pressable>
    </View>
  );
}
