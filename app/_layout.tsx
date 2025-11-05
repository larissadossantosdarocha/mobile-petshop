import { Stack, router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1B02A8",
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 30,
          fontWeight: "bold",
          fontFamily: "Garamond",
        },
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "𝓟𝓮𝓽 𝓖𝓪𝓽𝓸",
          headerBackVisible: false, 
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
    
              <TouchableOpacity
                style={{ marginRight: 16 }}
                onPress={() => router.push("/auth/carrinho")}
              >
                <Image
                  source={require("../assets/images/adicionar-ao-carrinho.png")}
                  style={{
                    width: 26,
                    height: 26,
                    marginRight: 6,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 16 }}
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
