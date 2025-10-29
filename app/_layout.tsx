import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, Text, View } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1B02A8", 
        },
        headerTitleStyle: {
          color: "#fff",
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
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  Início
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 12 }}
                onPress={() => router.push("/auth/login")}
              >
                <Image
                  source={require("../assets/images/pessoa.png")}
                  style={{
                    width: 30,
                    height: 28,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
