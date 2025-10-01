import { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";

export default function Passaro() {
  const router = useRouter();
  const navigation = useNavigation();
  const passaros = [
    { nome: "Blu", raca: "Periquito azul", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpKhtzVNQnwg9zPbhB_RdQk14aHxo2KBUWnA&s" },
    { nome: "Jorginho", raca: "Calopsita", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVkhsSU35KzQ44ay_aVGwg8-80j3vJ7YSsuw&s" },
    { nome: "Blu", raca: "Arara azul", imagem: "https://avesornamentaisjej.cdn.magazord.com.br/img/2024/03/produto/602/107-arara-azul-3.png?ims=600x600" },
    { nome: "Zé", raca: "Papagaio", imagem: "https://www.petz.com.br/blog/wp-content/uploads/2022/05/como-cortar-unha-de-papagaio-2.jpg" },
    { nome: "Princesa", raca: "Canarinho", imagem: "https://s2-g1.glbimg.com/uI0wxuSxG3QP3cQ5VubyzSc6Gzc=/0x0:1159x692/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/s/v/019zFDQByyBfOmYSRGqQ/canario-da-terra-3.jpg" },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: "Passaros",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => router.push("/")}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Image
              source={require("../assets/images/pessoa.png")}
              style={{ width: 50, height: 28, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: "rgb(75,197,235)" },
      headerTitleStyle: { color: "rgba(255, 255, 255, 1)", fontSize: 28, fontWeight: "bold" },
      headerTitleAlign: "left",
    });
  }, []);

  const abrirWhatsApp = (passaro: any) => {
    const numero = "19995601381";
    const mensagem = `Olá! Quero adotar este pássaro 🐦\n\nNome: ${passaro.nome}\nRaça: ${passaro.raca}\n\nFoto: ${passaro.imagem}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Nosso catálogo de adoção</Text>

      {passaros.map((passaro, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: passaro.imagem }} style={styles.imagem} />
          <Text style={styles.nome}>{passaro.nome}</Text>
          <Text>Raça: {passaro.raca}</Text>

          <View style={styles.botoesContainer}>
            <TouchableOpacity style={styles.botao} onPress={() => abrirWhatsApp(passaro)}>
              <Text style={styles.botaoTexto}>Adotar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoVoltar]}
              onPress={() => router.push("/adocao")}
            >
              <Text style={styles.botaoTexto}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(242,246,248,1)", padding: 16 },
  titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16, color: "rgba(14, 179, 230, 1)" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 16, marginBottom: 16, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, borderColor: "rgb(75, 197, 235)", borderWidth: 1  },
  imagem: { width: 200, height: 200, borderRadius: 10, marginBottom: 8 },
  nome: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  botoesContainer: { flexDirection: "row", marginTop: 8, gap: 10 },
  botao: { backgroundColor: "rgb(75,197,235)", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  botaoVoltar: { backgroundColor: "rgb(75,197,235)" },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
});
