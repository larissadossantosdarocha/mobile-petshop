import { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter, useNavigation } from "expo-router";

export default function Consulta() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Cadastrar",
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
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Image
              source={require("../assets/images/pessoa.png")}
              style={{ width: 40, height: 28, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Conteúdo da tela Cadastrar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(242, 246, 248, 1)",
  },
});
