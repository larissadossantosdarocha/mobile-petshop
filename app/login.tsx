import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: 'Pet Gato',
      headerStyle: { backgroundColor: '#42bff5' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => router.push('/')}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
              Início
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/cadastrar')}>
            <Image
              source={require('../assets/images/pessoa.png')}
              style={{ width: 40, height: 28, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

 const handleLogin = async () => {
  if (!email || !senha) {
    Alert.alert('Erro', 'Por favor, preencha os campos.');
    return;
  }

  try {
    const response = await fetch('http://back-end-tcc-gamma.vercel.app/login', {  // URL correta do seu backend
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      Alert.alert('Sucesso', data.message || 'Login realizado com sucesso!');
      router.push('/_sitemap');  // Direciona para o dashboard ou tela inicial
    } else {
      const erro = await response.text();
      Alert.alert('Erro ao fazer login', erro);
    }
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#cccccc' }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.loginLinkBox}>
          <Text style={styles.infoText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/cadastrar')}>
            <Text style={styles.linkText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  form: {
    backgroundColor: '#fff',
    padding: 25,
    width: '85%',
    borderRadius: 15,
    elevation: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#42bff5',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
