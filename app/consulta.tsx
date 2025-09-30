import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

// Interface para os dados do pet
interface PetData {
  nomePet: string;
  especiePet: string;
  racaPet: string;
  nomeProprietario: string;
  nascpet: string;
  emailProprietario: string;
  dados: string;
}

export default function Consulta() {
  const router = useRouter();
  const navigation = useNavigation();

  // Definindo os estados
  const [nomePet, setNomePet] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [nomeProprietario, setNomeProprietario] = useState("");
  const [nascPet, setNascPet] = useState("");
  const [email, setEmail] = useState("");
  const [dados, setDados] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "𝓟𝓮𝓽 𝓖𝓪𝓽𝓸",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 16 }} onPress={() => router.push("/")}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Image source={require("../assets/images/pessoa.png")} style={{ width: 40, height: 28, resizeMode: "contain" }} />
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

  // Validação de E-mail
  function validarEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Função de Validação de Data
  function validarData(nascPet: string) {
    const dataAtual = new Date();
    const dataNasc = new Date(nascPet);
    return dataNasc <= dataAtual;
  }

  // Função de Cadastro
  async function cadastrar() {
    if (!nomePet || !especie || !raca || !nomeProprietario || !nascPet || !email) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "Digite um e-mail válido!");
      return;
    }

    if (!validarData(nascPet)) {
      Alert.alert("Erro", "A data de nascimento não pode ser no futuro!");
      return;
    }

    const petData: PetData = {
      nomePet,
      especiePet: especie,
      racaPet: raca,
      nomeProprietario,
      nascpet: nascPet,
      emailProprietario: email,
      dados,
    };

    console.log("Dados enviados para o backend:", petData); // Verificando os dados enviados

    try {
      const response = await fetch("https://back-end-tcc-gamma.vercel.app/consultas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      console.log("Resposta do backend:", response); // Verificando a resposta da requisição

      const responseBody = await response.json();
      console.log("Resposta do backend (JSON):", responseBody); // Verificando o corpo da resposta

      if (response.ok) {
        setIsSuccess(true);
        Alert.alert("Sucesso", "Pet cadastrado para consulta!");
        setNomePet("");
        setEspecie("");
        setRaca("");
        setNomeProprietario("");
        setNascPet("");
        setEmail("");
        setDados("");
        router.push("/"); // Navega para a página inicial após sucesso
      } else {
        Alert.alert("Erro ao cadastrar", responseBody.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      Alert.alert("Erro", "Erro ao conectar ao servidor.");
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.containerForm}>
          <Text style={styles.title}>Cadastro do Pet para Consulta</Text>

          <Text style={styles.label}>Nome do Pet:</Text>
          <TextInput style={styles.input} value={nomePet} onChangeText={setNomePet} placeholder="Digite o nome do pet" />
          
          <Text style={styles.label}>Espécie:</Text>
          <View style={styles.radioContainer}>
            {["Cachorro", "Gato", "Peixe", "Pássaro"].map((item) => (
              <TouchableOpacity key={item} style={styles.radioButton} onPress={() => setEspecie(item)}>
                <View style={[styles.radioCircle, especie === item && styles.radioSelected]} />
                <Text style={styles.radioLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Raça:</Text>
          <TextInput style={styles.input} value={raca} onChangeText={setRaca} placeholder="Digite a raça" />

          <Text style={styles.label}>Nome do Proprietário:</Text>
          <TextInput style={styles.input} value={nomeProprietario} onChangeText={setNomeProprietario} placeholder="Nome do dono" />

          <Text style={styles.label}>Data de Nascimento do Pet:</Text>
          <TextInput style={styles.input} value={nascPet} onChangeText={setNascPet} placeholder="AAAA-MM-DD" />

          <Text style={styles.label}>E-mail:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Digite o email" keyboardType="email-address" autoCapitalize="none" />

          <Text style={styles.label}>Possui algum problema de saúde ou alergias:</Text>
          <TextInput style={styles.input} value={dados} onChangeText={setDados} placeholder="Informe se houver" />

          <TouchableOpacity style={styles.button} onPress={cadastrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.push("/")}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          {isSuccess && (
            <View style={styles.successMessage}>
              <Text style={styles.successText}>Pet cadastrado com sucesso!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.whatsappButton} onPress={() => router.push("https://wa.me/19995601381")}>
        <FontAwesome name="whatsapp" size={32} color="#fff" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 10,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: "rgb(75,197,235)",
  },
  radioLabel: {
    color: "#fff",
    fontSize: 14,
  },
  button: {
    backgroundColor: "rgb(75,197,235)",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#ff4c4c",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  whatsappButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  successMessage: {
    marginTop: 20,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  successText: {
    color: "#fff",
    fontSize: 16,
  },
});
