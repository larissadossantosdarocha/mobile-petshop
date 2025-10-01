import { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking,} from "react-native";
import { useRouter, useNavigation } from "expo-router";

export default function Peixe() {
  const router = useRouter();
  const navigation = useNavigation();
  const peixes = [
    { nome: "Nemo", raca: "Peixe Palhaço", imagem: "https://cdn.awsli.com.br/1845/1845715/produto/223193791/img_5837-jjkmghdktx.jpeg" },
    { nome: "Vivi", raca: "Baiacú", imagem: "https://img.odcdn.com.br/wp-content/uploads/2022/12/baiacu.jpg" },
    { nome: "Stella", raca: "Peixe Dourado", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvf6HBscK3Ho6eoHHElWZOBWQTCk_xe6-O6w58jxs3G7RfQC10cUP7Uh96FaNTNdXYu8&usqp=CAU" },
    { nome: "Ector", raca: "Betta", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjcAuQ_URvjgMBfhpe0Oj85KKBpAhJMHVsJA&s" },
    { nome: "Groselia", raca: "Acará Bandeira", imagem: "https://www.agrosete.com.br/wp-content/uploads/2017/10/WhatsApp-Image-2023-08-18-at-12.01.03-800x600.jpeg" },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: "Peixes",
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

  const abrirWhatsApp = (peixe: any) => {
    const numero = "19995601381"; 
    const mensagem = `Olá! Quero adotar este peixe 🐟\n\nNome: ${peixe.nome}\nRaça: ${peixe.raca}\n\nFoto: ${peixe.imagem}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Nosso catálogo de adoção</Text>

      {peixes.map((peixe, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: peixe.imagem }} style={styles.imagem} />
          <Text style={styles.nome}>{peixe.nome}</Text>
          <Text>Raça: {peixe.raca}</Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <TouchableOpacity style={styles.botao} onPress={() => abrirWhatsApp(peixe)}>
              <Text style={styles.botaoTexto}>Adotar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.botaoVoltar]} onPress={() => router.back()}>
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
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 16, marginBottom: 16, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5,  borderColor: "rgb(75, 197, 235)", borderWidth: 1 },
  imagem: { width: 200, height: 200, borderRadius: 10, marginBottom: 8 },
  nome: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  botao: { backgroundColor: "rgb(75,197,235)", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, marginHorizontal: 5 },
  botaoVoltar: { backgroundColor: "rgb(75,197,235)" },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
});
