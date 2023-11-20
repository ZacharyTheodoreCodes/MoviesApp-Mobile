import { useNavigation } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Card from "../components/Card";
import { GET_MOVIES } from "../config/queries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { data, loading, error } = useQuery(GET_MOVIES);

  const movies = data?.getMovies;

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
          }}
          style={{
            height: 60,
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 10,
          }}
        />
      </View>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#E61B1F"></ActivityIndicator>
        </View>
      )}

      {error && (
        <View style={styles.errorMsg}>
          <Text>Error: {error.message} </Text>
        </View>
      )}
      <View
        style={{
          flex: 1,
          padding: 24,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <FlatList
          data={movies}
          renderItem={({ item }) => <Card key={item.id} movie={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ gap: 6 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
    // alignItems: "center",
    // justifyContent: "center",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    flex: 1,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
});
