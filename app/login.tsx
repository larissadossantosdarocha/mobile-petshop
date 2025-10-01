import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: 'Login',
      headerStyle: { backgroundColor: 'rgb(180, 227, 241)' },
      headerTintColor: '#000000ff',
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

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha os campos.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    setIsLoading(true); 

    try {
      const response = await fetch('https://back-end-tcc-gamma.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
 
        Alert.alert('Sucesso', data.message || 'Login realizado com sucesso!');
        router.push('/login'); 
      } else {
        const erro = await response.json();  
        Alert.alert('Erro ao fazer login', erro.message || 'Erro desconhecido. Tente novamente mais tarde.');
      }
    } catch (error: any) {
      Alert.alert('Erro', `Não foi possível conectar ao servidor. Detalhes: ${error.message}`);
    } finally {
      setIsLoading(false); 
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

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(29, 172, 255, 1)' }]} onPress={() => router.push('/')}
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
    borderColor: "rgba(29, 172, 255, 1)",
    borderWidth: 1,
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
    backgroundColor: 'rgba(29, 172, 255, 1)',
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
