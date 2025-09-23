import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Adocao() {
  const router = useRouter();
  const navigation = useNavigation();

  // Configura o header
  useEffect(() => {
    navigation.setOptions({
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
            onPress={() => router.push("/login")}
            style={{ marginRight: 24 }} // empurra o ícone para o lado
          >
            <FontAwesome name="user" size={28} color="#1a1919ff" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: "rgb(75, 197, 235)" },
      headerTitleStyle: { color: "rgb(6, 43, 255)", fontSize: 28, fontWeight: "bold" },
      headerTitleAlign: "left",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Faça um animalzinho feliz hoje ❤❤</Text>

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.push("/cachorro")}>
          <Text style={styles.cardText}>Adotar Cachorro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push("/gato")}>
          <Text style={styles.cardText}>Adotar Gato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push("/peixe")}>
          <Text style={styles.cardText}>Adotar Peixe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push("/passaro")}>
          <Text style={styles.cardText}>Adotar Pássaro</Text>
        </TouchableOpacity>

        {/* Botão Voltar centralizado */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                width: 200,   // largura personalizável
                height: 60,   // altura personalizável
              },
            ]}
            onPress={() => router.push("/")}
          >
            <Text style={styles.cardText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(242, 246, 248, 1)",
    alignItems: "center",
    paddingTop: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "rgb(6, 43, 255)",
  },
  cardsContainer: {
    width: "90%",
  },
  card: {
    backgroundColor: "rgb(75, 197, 235)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  backButtonContainer: {
    alignItems: "center",
    marginTop: 12, // espaço acima do botão voltar
  },
  backButton: {
    backgroundColor: "rgb(75, 197, 235)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
