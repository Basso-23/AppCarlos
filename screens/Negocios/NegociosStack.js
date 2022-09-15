import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ficha from "../../screens/Negocios/Ficha";
import Negocios from "../../screens/Negocios/A-Negocios";

const Stack = createNativeStackNavigator();

export default function NegociosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={"Negocio"}
        component={Negocios}
        options={{ title: "Negocios" }}
      />
      <Stack.Screen
        name={"Restaurante"}
        component={Ficha}
        options={{ title: "Restaurante" }}
      />
    </Stack.Navigator>
  );
}
