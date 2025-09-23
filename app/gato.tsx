import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";

export default function Gato() {
  const router = useRouter();
  const navigation = useNavigation();

  const gatos = [
    { nome: "Mimi", peso: "300g", idade: "45 Dias", raca: "SRD", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkLbw-tj2Vwz6Tnbw3F697M55rXK7w4CLMA&s" },
    { nome: "Sol", peso: "300g", idade: "45 Dias", raca: "SRD", imagem: "https://www.petz.com.br/blog/wp-content/uploads/2020/05/adocao-de-gatos-felinos.jpg" },
    { nome: "Garfield", peso: "3kg", idade: "2 Anos", raca: "SRD", imagem: "https://www.petz.com.br/blog/wp-content/uploads/2019/01/adotar-gato.jpg" },
    { nome: "Banguela", peso: "1,5kg", idade: "2 Anos", raca: "SRD", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvwfCM6dFtty66bjgys0vCGA1yPB0yghxcuw&s" },
    { nome: "Chitara", peso: "1,5kg", idade: "2 Anos", raca: "SRD", imagem: "https://s2-g1.glbimg.com/J8-1eVsrMHf0dMHuxJRyW1UCFIA=/0x0:1280x1280/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/q/N/MGdKTAT5KnmXDs4D7S1A/whatsapp-image-2021-05-19-at-10.37.08.jpeg" },
    { nome: "Aghata", peso: "1,5kg", idade: "1 Ano", raca: "SRD", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SoWGb8IhIGN_VEgYXcD3Gd_8gp4PB1i3utD7E970h4tihm9XhBrwG1c7z19n55lVRqg&usqp=CAU" },
    { nome: "Tom", peso: "2kg", idade: "1 Ano", raca: "SRD", imagem: "https://img.olx.com.br/images/13/130540646887056.webp" },
    { nome: "Jerry", peso: "1kg", idade: "1 Ano", raca: "SRD", imagem: "https://adotar.com.br/upload/2021-12/animais_imagem786347.jpg" },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: "𝓟𝓮𝓽 𝓖𝓪𝓽𝓸",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={() => router.push("/")}>
            <Text style={{ color: "#ffffffff", fontSize: 20, fontWeight: "600" }}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Image
              source={require("../assets/images/pessoa.png")}
              style={{ width: 50, height: 28, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: "rgb(75, 197, 235)" },
      headerTitleStyle: { color: "rgb(6, 43, 255)", fontSize: 28, fontWeight: "bold" },
      headerTitleAlign: "left",
    });
  }, []);

  const abrirWhatsApp = (gato: any) => {
    const numero = "19995601381";
    const mensagem = `Olá! Quero adotar este gato 🐱\n\nNome: ${gato.nome}\nRaça: ${gato.raca}\nIdade: ${gato.idade}\nPeso: ${gato.peso}\n\nFoto: ${gato.imagem}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Nosso catálogo de adoção</Text>

      {gatos.map((gato, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: gato.imagem }} style={styles.imagem} />
          <Text style={styles.nome}>{gato.nome}</Text>
          <Text>Peso: {gato.peso}</Text>
          <Text>Idade: {gato.idade}</Text>
          <Text>Raça: {gato.raca}</Text>

          <View style={styles.botoesContainer}>
            <TouchableOpacity style={styles.botao} onPress={() => abrirWhatsApp(gato)}>
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
  titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16, color: "rgb(6,43,255)" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 16, marginBottom: 16, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5 },
  imagem: { width: 200, height: 200, borderRadius: 10, marginBottom: 8 },
  nome: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  botoesContainer: { flexDirection: "row", marginTop: 8, gap: 10 },
  botao: { backgroundColor: "rgb(75,197,235)", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  botaoVoltar: { backgroundColor: "gray" },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
});
