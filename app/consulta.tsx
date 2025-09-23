import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image,} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Consulta() {
  const router = useRouter();
  const navigation = useNavigation();

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
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Image
              source={require("../assets/images/pessoa.png")}
              style={{ width: 40, height: 28, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: "rgb(75,197,235)" },
      headerTitleStyle: {
        color: "rgb(6,43,255)",
        fontSize: 28,
        fontWeight: "bold",
      },
    });
  }, []);

  const [nomePet, setNomePet] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [nomeProprietario, setNomeProprietario] = useState("");
  const [nascPet, setNascPet] = useState("");
  const [email, setEmail] = useState("");
  const [dados, setDados] = useState("");

  function cadastrar() {
    if (
      !nomePet ||
      !especie ||
      !raca ||
      !nomeProprietario ||
      !nascPet ||
      !email
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }
    Alert.alert("Sucesso", "Pet cadastrado para consulta!");
    setNomePet("");
    setEspecie("");
    setRaca("");
    setNomeProprietario("");
    setNascPet("");
    setEmail("");
    setDados("");
  }

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.containerForm}>
          <Text style={styles.title}>Cadastro do Pet para Consulta</Text>

          <Text style={styles.label}>Nome do Pet:</Text>
          <TextInput
            style={styles.input}
            value={nomePet}
            onChangeText={setNomePet}
            placeholder="Digite o nome do pet"
          />
          <Text style={styles.label}>Espécie:</Text>
          <View style={styles.radioContainer}>
            {["Cachorro", "Gato", "Peixe", "Pássaro"].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.radioButton}
                onPress={() => setEspecie(item)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    especie === item && styles.radioSelected,
                  ]}
                />
                <Text style={styles.radioLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Raça:</Text>
          <TextInput
            style={styles.input}
            value={raca}
            onChangeText={setRaca}
            placeholder="Digite a raça"
          />
          <Text style={styles.label}>Nome do Proprietário:</Text>
          <TextInput
            style={styles.input}
            value={nomeProprietario}
            onChangeText={setNomeProprietario}
            placeholder="Nome do dono"
          />
          <Text style={styles.label}>Data de Nascimento do Pet:</Text>
          <TextInput
            style={styles.input}
            value={nascPet}
            onChangeText={setNascPet}
            placeholder="AAAA-MM-DD"
          />
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite o email"
            keyboardType="email-address"
          />
          <Text style={styles.label}>
            Possui algum problema de saúde ou alergias:
          </Text>
          <TextInput
            style={styles.input}
            value={dados}
            onChangeText={setDados}
            placeholder="Informe se houver"
          />
          <TouchableOpacity style={styles.button} onPress={cadastrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => router.push("/")}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={() => router.push("https://wa.me/19995601381")}
      >
        <FontAwesome name="whatsapp" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgb(180,227,241)",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  containerForm: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "rgb(23,140,175)",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: "#fff",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  radioContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 6,
  },
  radioSelected: {
    backgroundColor: "#fff",
  },
  radioLabel: {
    fontSize: 14,
    color: "#fff",
  },
  button: {
    backgroundColor: "rgb(20,20,20)",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "rgba(15, 15, 15, 1)",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
  },
  whatsappButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#25D366",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
