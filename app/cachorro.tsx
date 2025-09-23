import { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking,} from "react-native";
import { useRouter, useNavigation } from "expo-router";

export default function Cachorro() {
  const router = useRouter();
  const navigation = useNavigation();

  const pets = [
    { nome: "Thalia", peso: "500g", idade: "60 Dias", raca: "Pug", imagem: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/03/07/759717358-pug.jpg" },
    { nome: "Athena", peso: "25kg", idade: "2 Anos", raca: "Dalmata", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwibKuMFrdaNbPlY3Pm2yKbBFnKCvvCd2jmiKy3BupUeKNI-FU122Suh0y10lP6Lkv1Nc&usqp=CAU" },
    { nome: "Caramelo", peso: "7kg", idade: "5 Anos", raca: "SRD", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpIWchB2XUi584Uo7sRMNq_mU2p20u7JEHA&s" },
    { nome: "Max", peso: "8kg", idade: "10 Anos", raca: "SRD", imagem: "https://media.istockphoto.com/id/1285465107/pt/foto/loyal-golden-retriever-dog-sitting-on-a-green-backyard-lawn-looks-at-camera-top-quality-dog.jpg?s=612x612&w=0&k=20&c=nTG4sxYJWfQdoaPTYmt5Vcq9cyixwmMyGzU1w-9l6Ls=" },
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

  const abrirWhatsApp = (pet: any) => {
    const numero = "19995601381"; 
    const mensagem = `Olá! Quero adotar este pet 🐶\n\nNome: ${pet.nome}\nRaça: ${pet.raca}\nIdade: ${pet.idade}\nPeso: ${pet.peso}\n\nFoto: ${pet.imagem}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Nosso catálogo de adoção</Text>

      {pets.map((pet, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: pet.imagem }} style={styles.imagem} />
          <Text style={styles.nome}>{pet.nome}</Text>
          <Text>Peso: {pet.peso}</Text>
          <Text>Idade: {pet.idade}</Text>
          <Text>Raça: {pet.raca}</Text>

          <View style={styles.botoesContainer}>
            <TouchableOpacity style={styles.botao} onPress={() => abrirWhatsApp(pet)}>
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
