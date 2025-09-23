import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, Text, View } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: " rgb(180, 227, 241), rgb(75, 197, 235)", // azul do header
        },
        headerTitleStyle: {
          color: "rgb(6, 43, 255)",
          fontSize: 28,
          fontWeight: "bold",
        },
        headerTitleAlign: "left", // agora o título fica no canto esquerdo
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "𝓟𝓮𝓽 𝓖𝓪𝓽𝓸",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Botão Início */}
              <TouchableOpacity
                style={{ marginRight: 16 }}
                onPress={() => router.push("/")}
              >
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
                  Início
                </Text>
              </TouchableOpacity>

              {/* Ícone Pessoa */}
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
