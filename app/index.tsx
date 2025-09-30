import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import axios from "axios"; // Importando axios para fazer requisições

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
  // Estado para armazenar os dados da API e o estado de carregamento
  const [data, setData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);  // Estado para controlar o carregamento

  // Função para buscar os dados da API
  const fetchData = async () => {
    try {
      const response = await axios.get("https://back-end-tcc-gamma.vercel.app/api/posts"); // Substitua pelo seu endpoint
      setData(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Hook useEffect para chamar a função fetchData ao carregar o componente
  useEffect(() => {
    fetchData();
  }, []);

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

      {/* Renderização da lista de posts */}
      <View style={styles.list}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Exibe um indicador de carregamento
        ) : (
          <FlatList
            data={data} // Dados que virão do backend
            keyExtractor={(item) => item.id.toString()} // Certifique-se de que cada item tenha um ID único
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style={styles.text}>{item.descricao}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
