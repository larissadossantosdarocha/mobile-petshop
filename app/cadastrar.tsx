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
      title: 'Cadastrar',
      headerStyle: { backgroundColor: 'rgb(180, 227, 241)' },
      headerTintColor: '#000000ff',
      headerTitleStyle: { fontWeight: 'bold' },
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 16 }} onPress={() => router.push('/')}>
            <Text style={{ color: '#ffffffff', fontSize: 20, fontWeight: '600' }}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 12 }} onPress={() => router.push('/login')}>
            <Image
              source={require('../assets/images/pessoa.png')}
              style={{ width: 30, height: 28, resizeMode: 'contain' }}
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
        router.push('/login');  // Redireciona para a tela de login após cadastro
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
          style={[styles.button, { backgroundColor: '#323172' }]}
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
