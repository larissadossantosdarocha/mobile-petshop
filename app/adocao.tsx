import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Adocao() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Adoção",
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
            style={{ marginRight: 24 }} 
          >
            <FontAwesome name="user" size={28} color="#000000ff" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: " rgb(180, 227, 241)" },
      headerTitleStyle: { color: "rgba(0, 0, 0, 1)", fontSize: 28, fontWeight: "bold", fontFamily: 'Garamond'
 },
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
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                width: 200,  
                height: 60,  
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
    borderColor: "rgba(29, 172, 255, 1)",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 10,
    borderRadius: 10,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "rgba(14, 179, 230, 1)",
  },
  cardsContainer: {
    width: "90%",
  },
  card: {
    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    backgroundColor: "rgba(14, 179, 230, 1)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
  },
  backButtonContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  backButton: {
    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    backgroundColor: "rgba(14, 179, 230, 1)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
