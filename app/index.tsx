import { router } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { posts } from "../assets/mockups/posts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(242, 246, 248, 1)", // cor de fundo dos posts
  },
  secondHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "rgba(197, 218, 226, 0.623)", // cor opaca do header
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgb(136, 132, 132)",
  },
  list: {
    width: "100%",
    paddingHorizontal: 6,
    paddingTop: 10,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    padding: 20,
    backgroundColor: "rgba(36, 248, 17, 1)",
    borderRadius: 8,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
    color: "rgba(27, 143, 75, 1)",
  },
  text: {
    fontSize: 16,
    color: "rgba(224, 59, 59, 1)",
  },
});

export default function Index() {
  function irParaDetalhes(id: number) {
    router.push(`/detalhes?id=${id}`);
  }

  return (
    <View style={styles.container}>
      {/* SEGUNDO HEADER */}
      <View style={styles.secondHeader}>
        <TouchableOpacity onPress={() => router.push("/consulta")}>
          <Text style={styles.button}>Consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/adocao")}>
          <Text style={styles.button}>Adoção</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/doacao")}>
          <Text style={styles.button}>Doação</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/cadastrar")}>
          <Text style={styles.button}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
