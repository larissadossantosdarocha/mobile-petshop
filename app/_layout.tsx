import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, Text, View } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: " rgb(180, 227, 241)"},
        headerTitleStyle: {
          color: "rgba(0, 0, 0, 1)",
          fontSize: 28,
          fontWeight: "bold",
        },
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "𝓟𝓮𝓽 𝓖𝓪𝓽𝓸",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{ marginRight: 16 }}
                onPress={() => router.push("/")}
              >
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
                  Início
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 12 }}
                onPress={() => router.push("/login")}
              >
                <Image
                  source={require("../assets/images/pessoa.png")}
                  style={{ width: 30, height: 28, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
