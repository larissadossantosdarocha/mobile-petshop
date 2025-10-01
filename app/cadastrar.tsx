import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
         title: "𝓒𝓪𝓭𝓪𝓼𝓽𝓻𝓸",
         headerRight: () => (
           <View style={{ flexDirection: "row", alignItems: "center" }}>
             <TouchableOpacity
               style={{ marginRight: 10 }}
               onPress={() => router.push("/")}
             >
               <Text style={{ color: "#ffffffff", fontSize: 20, fontWeight: "600" }}>
                 Início
               </Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => router.push("/login")}>
               <Image
                 source={require("../assets/images/pessoa.png")}
                 style={{ width: 40, height: 28, resizeMode: "contain"}}
               />
             </TouchableOpacity>
           </View>
      ),
    });
  }, []);

  const handleCadastro = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha os campos.');
      return;
    }

    try {
      const response = await fetch('https://back-end-tcc-gamma.vercel.app/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        router.push('/login'); 
      } else {
        const erro = await response.text();
        Alert.alert('Erro ao cadastrar', erro);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(29, 172, 255, 1)' }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.loginLinkBox}>
          <Text style={styles.infoText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}>Faça login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  form: {
    borderColor: "rgba(29, 172, 255, 1)",
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 13,
    alignSelf: 'flex-start',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#333',
    paddingVertical: 5,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(29, 172, 255, 1)',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLinkBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    color: '#555',
    fontSize: 14,
  },
  linkText: {
    color: '#42bff5',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
