import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Consulta() {
  const [nomePet, setNomePet] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [nomeProprietario, setNomeProprietario] = useState('');
  const [nascPet, setNascPet] = useState('');
  const [email, setEmail] = useState('');
  const [dados, setDados] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: "𝓒𝓸𝓷𝓼𝓾𝓵𝓽𝓪",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 14 }} onPress={() => router.push("/")}>
            <Text style={{ color: "#ffffffff", fontSize: 20, fontWeight: "600" }}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Image
              source={require("../../assets/images/pessoa.png")}
              style={{ width: 40, height: 28 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: "rgb(180, 227, 241)" },
      headerTitleStyle: {
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Garamond",
        fontSize: 28,
        fontWeight: "bold",
      },
    });
  }, []);

  const handleConsulta = async () => {
    console.log("🚀 Botão Cadastrar clicado!");

    if (!nomePet || !email || !nascPet || !especie || !raca || !nomeProprietario) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(nascPet);
    if (!isValidDate) {
      Alert.alert('Erro', 'Data de nascimento inválida. Use o formato YYYY-MM-DD.');
      return;
    }

    setIsSubmitting(true);

    const petData = {
      nomePet,
      especiePet: especie,
      racaPet: raca,
      nomeProprietario,
      nascpet: nascPet,
      emailProprietario: email,
      dados,
    };

    console.log("📤 Dados que serão enviados:", petData);

    try {
      const response = await fetch('https://back-end-tcc-gamma.vercel.app/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData),
      });

      const result = await response.json();
      console.log("📡 Resposta do servidor:", response.status, result);

      if (response.ok) {
        Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
        setNomePet('');
        setEspecie('');
        setRaca('');
        setNomeProprietario('');
        setNascPet('');
        setEmail('');
        setDados('');
      } else {
        Alert.alert('Erro ao agendar consulta', result.message || 'Erro desconhecido.');
      }
    } catch (error) {
      console.error("🚨 Erro de rede:", error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <Text style={styles.label}>Problemas de saúde ou alergias:</Text>
          <TextInput style={styles.input} value={dados} onChangeText={setDados} placeholder="Informe se houver" />

          <TouchableOpacity style={styles.button} onPress={handleConsulta} disabled={isSubmitting}>
            <Text style={styles.buttonText}>{isSubmitting ? "Cadastrando..." : "Cadastrar"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.push("/")}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.whatsappButton} onPress={() => router.push("https://wa.me/19995601381")}>
        <FontAwesome name="whatsapp" size={32} color="#fff" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  containerForm: {
    borderColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    maxWidth: 600,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        }),
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#1dacff", 
    textAlign: "center", 
    marginBottom: 20 
  },
  label: { 
    color: "#1dacff", 
    fontSize: 16, 
    marginBottom: 5 
  },
  input: { 
    borderColor: "#000", 
    borderWidth: 1, 
    height: 40, 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    marginBottom: 20, 
    paddingHorizontal: 10 
  },
  button: { 
    backgroundColor: "#1dacff", 
    borderRadius: 8, 
    paddingVertical: 15, 
    marginVertical: 10, 
    width: "100%", 
    alignItems: "center"
   },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "600" 
  },
  backButton: { 
    backgroundColor: "#1dacff" 
  },
  radioContainer: { 
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    marginBottom: 20 
  },
  radioButton: { 
    flexDirection: "row", 
    alignItems: "center"
   },
  radioCircle: { 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    borderWidth: 2, 
    borderColor: "#29acff",
     marginRight: 10 
    },
  radioSelected: { 
    backgroundColor: "#29acff" 
  },
  radioLabel: { 
    fontSize: 16, 
    color: "#000" 
  },
  whatsappButton: { 
    position: "absolute", 
    bottom: 20, 
    right: 20, 
    backgroundColor: "#25D366", 
    borderRadius: 50, 
    padding: 15 
  },
});
