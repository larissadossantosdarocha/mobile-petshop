import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Adocao() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "𝓐𝓭𝓸𝓬̧𝓪̃𝓸",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => router.push("/")}
          >
            <Text style={{ color: "#ffffffff", fontSize: 20, fontWeight: "600" }}>
              Início
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            style={{ marginRight: 24 }}
          >
            <Image
                source={require("../assets/images/pessoa.png")}
              style={{ width: 30, height: 28, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: "#4bc6eb85" },
      headerTitleStyle: {
        color: "rgba(0, 0, 0, 1)",
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: "Garamond", 
      },
      headerTitleAlign: "left",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://img.freepik.com/vetores-premium/adocao-de-animais-de-estimacao-maos-segurando-caes-gatos-bandeira-de-abrigo-animais-fofos-isolados-adotar-o-fundo-do-vetor_81894-4962.jpg" }}
        style={styles.banner}
      />

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#7bb9bbff" }]}
          onPress={() => router.push("/cachorro")}
        >
          <FontAwesome5 name="dog" size={28} color="#fff" />
          <Text style={styles.cardText}>Adotar Cachorro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#e9bfc3ff" }]}
          onPress={() => router.push("/gato")}
        >
          <FontAwesome5 name="cat" size={28} color="#fff" />
          <Text style={styles.cardText}>Adotar Gato</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#8fbde6ff" }]}
          onPress={() => router.push("/peixe")}
        >
          <MaterialCommunityIcons name="fish" size={28} color="#fff" />
          <Text style={styles.cardText}>Adotar Peixe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#fac98dff" }]}
          onPress={() => router.push("/passaro")}
        >
          <MaterialCommunityIcons name="bird" size={28} color="#fff" />
          <Text style={styles.cardText}>Adotar Pássaro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={[styles.backButton, { width: 200, height: 55 }]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.cardText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    alignItems: "center",
    paddingTop: 10,
  },
  banner: {
    width: "90%",
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
  },
  titulo: {
    borderColor: "rgba(29, 172, 255, 1)", 
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 10,
    borderRadius: 10,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(14, 179, 230, 1)",
    marginBottom: 20,
    fontFamily: "Garamond",
  },
  cardsContainer: {
    width: "90%",
  },
  card: {
    padding: 18,
    borderRadius: 15,
    marginBottom: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  backButtonContainer: {
    alignItems: "center",
    marginTop: 18,
  },
  backButton: {
    backgroundColor: "rgb(75, 197, 235)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});