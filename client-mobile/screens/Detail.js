import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@apollo/client";
import { GET_MOVIE } from "../config/queries";
import TrailerButton from "../components/TrailerButton";

export default function Detail({ route }) {
  const { id } = route.params;
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      getMovieId: id,
    },
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E61B1F"></ActivityIndicator>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMsg}>Error: {error.message} </Text>
      </View>
    );
  }

  const movie = data?.getMovie;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View>
        <LinearGradient
          style={{
            height: 500,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          }}
          locations={[0.3, 0.9]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={["transparent", "black"]}
        ></LinearGradient>
        <Image
          style={{
            width: "100%",
            height: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          source={{
            uri: movie?.imgUrl,
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 36,
            fontWeight: "bold",
            textAlign: "center",
            position: "absolute",
            marginTop: 400,
            zIndex: 1,
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          {movie?.title}
        </Text>
        <Text
          style={{
            marginTop: 14,
            color: "white",
            fontSize: 14,
            fontWeight: "normal",
            textAlign: "center",
            position: "absolute",
            marginTop: 468,
            zIndex: 1,
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          Rating: {movie?.rating}/10 | Genre: {movie?.Genre?.name}
        </Text>
        <Text
          style={{
            marginTop: 22,
            color: "white",
            fontSize: 12,
            fontWeight: "normal",
            textAlign: "center",
            opacity: 0.6,
            marginHorizontal: 40,
            lineHeight: 18,
          }}
        >
          {movie?.synopsis}
        </Text>
        <TrailerButton trailerUrl={movie?.trailerUrl} />
        <View
          style={{
            // borderBottomColor: "#fff",
            // borderBottomWidth: 1,
            marginHorizontal: 40,
            marginTop: 40,
            marginBottom: 28,
            // opacity: 0.2,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginHorizontal: 40,
              borderBottomColor: "#E61B1F",
              paddingBottom: 10,
              borderBottomWidth: 4,
              textAlign: "center",
            }}
          >
            Casts
          </Text>
          <ScrollView
            style={{
              marginVertical: 20,
              paddingHorizontal: 40,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {movie?.Casts?.map((cast, index) => (
              <View
                key={index}
                style={{
                  marginRight: 16,
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Image
                  style={{
                    width: 60,
                    height: 60,
                  }}
                  source={{ uri: cast.profilePict }}
                />
                <Text
                  style={{
                    marginTop: 12,
                    textAlign: "center",
                    color: "white",
                    fontSize: 10,
                  }}
                >
                  {cast.name?.length > 10
                    ? cast.name.slice(0, 10) + ".."
                    : cast.name}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              marginHorizontal: 40,
              marginTop: 16,
              marginBottom: 28,
              // opacity: 0.2,
              // borderBottomColor: "#fff",
              // borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                marginHorizontal: "auto",
              }}
            >
              Created By :{" "}
              <Text
                style={{
                  color: "gray",
                }}
              >
                {movie?.User?.username}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    flex: 1,
  },
  errorMsg: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
