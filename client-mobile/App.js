import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Splash from "./screens/Splash";

import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
}
