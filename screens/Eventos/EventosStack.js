import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Promo from "./Promo";
import Eventos from "./A-Eventos";

const Stack = createNativeStackNavigator();

export default function NegociosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={"Eventos"}
        component={Eventos}
        options={{ title: "Eventos" }}
      />
      <Stack.Screen
        name={"Promo"}
        component={Promo}
        options={{ title: "Promo" }}
      />
    </Stack.Navigator>
  );
}
