import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

export default function Carrinho() {
  const navigation = useNavigation();
  const router = useRouter();
  const [itensCarrinho, setItensCarrinho] = useState([
    { id: 1, nome: 'Ração para Gato', preco: 50 },
    { id: 2, nome: 'Brinquedo para Cão', preco: 30 },
  ]);

  const handleFinalizarCompra = () => {
    if (itensCarrinho.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione itens ao carrinho antes de finalizar.');
      return;
    }
    Alert.alert('Finalizar Compra', 'Sua compra foi finalizada com sucesso!');
    router.push('/auth/carrinho');
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Carrinho",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => router.push("/")}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
              Início
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Image
              source={require("../../assets/images/pessoa.png")}
              style={{ width: 40, height: 28, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: { backgroundColor: "#1B02A8" },
      headerTitleStyle: { color: "#fff", fontFamily: "Garamond", fontSize: 28, fontWeight: "bold" },
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.carrinhoContainer}>
        <Text style={styles.titulo}>Itens no Carrinho</Text>
        {itensCarrinho.length === 0 ? (
          <Text style={styles.mensagem}>Seu carrinho está vazio.</Text>
        ) : (
          <View>
            {itensCarrinho.map(item => (
              <View key={item.id} style={styles.item}>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleFinalizarCompra}>
          <Text style={styles.buttonText}>Finalizar Compra</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(66, 113, 184, 1)' }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  carrinhoContainer: {
    borderColor: "rgba(5, 12, 41, 1)",
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 22,
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemNome: {
    color: '#333',
    fontSize: 18,
  },
  itemPreco: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mensagem: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'rgba(66, 113, 184, 1)',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
