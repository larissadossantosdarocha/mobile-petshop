import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image,} from 'react-native';
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
          <TouchableOpacity onPress={() => router.push('/login')}>
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
      const response = await fetch('https://SEU_BACKEND/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Login realizado!');
        router.push('/');
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#323172' }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        {/* Texto abaixo do botão Voltar */}
        <View style={styles.loginLinkBox}>
          <Text style={styles.infoText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}>Faca login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#B4E3F1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  form: {
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
    marginTop: 10,
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
    backgroundColor: '#323172',
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