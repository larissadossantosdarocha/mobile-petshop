import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

export default function Produto() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<any[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const navigation = useNavigation();
  const router = useRouter();

  const categorias = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Cachorro', value: 'cachorro' },
    { label: 'Gato', value: 'gato' },
    { label: 'Peixe', value: 'peixe' },
    { label: 'Pássaro', value: 'passaro' }
  ];

  useEffect(() => {
    navigation.setOptions({
      title: '𝓟𝓻𝓸𝓭𝓾𝓽𝓸𝓼',
      headerStyle: { backgroundColor: '#1B02A8' },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Garamond',
      },
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 16 }} onPress={() => router.push('/')}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Image source={require('../../assets/images/pessoa.png')} style={{ width: 40, height: 28, resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await fetch('https://backend-tcc-petshop-petgato-2025.vercel.app/produto');
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const data = await response.json();
      setProdutos(data);
      setProdutosFiltrados(data);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao carregar produtos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    carregarProdutos();
  };

  const filtrarPorCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);

    if (categoria === 'Todos') {
      setProdutosFiltrados(produtos);
    } else {
      const filtrados = produtos.filter((item) => item.categoria?.toLowerCase() === categoria.toLowerCase());
      setProdutosFiltrados(filtrados);
    }

    setModalVisible(false);
  };

  const adicionarAoCarrinho = (produto: any) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, produto]);
    Alert.alert('Produto Adicionado', `${produto.nome} foi adicionado ao carrinho.`);
  };

  const handleFinalizarCompra = () => {
    if (carrinho.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione itens ao carrinho antes de finalizar.');
      return;
    }
    router.push({
      pathname: '/auth/carrinho',
      params: { carrinho }, 
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imagem} />}
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.preco}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
        <Text style={styles.categoria}>Categoria: {item.categoria}</Text>
        <TouchableOpacity style={styles.buyButton} onPress={() => adicionarAoCarrinho(item)}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1B02A8" />
        <Text style={{ marginTop: 10, color: '#1B02A8' }}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.filterButtonText}>
          {categoriaSelecionada === 'Todos' ? 'Filtrar por Categoria' : `Categoria: ${categoriaSelecionada}`}
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {categorias.map((item) => (
              <Pressable key={item.value} onPress={() => filtrarPorCategoria(item.value)} style={styles.modalOption}>
                <Text style={styles.modalOptionText}>{item.label}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {produtosFiltrados.length === 0 ? (
        <View style={styles.semProdutos}>
          <Text style={{ color: '#555', fontSize: 18 }}>
            Nenhum produto encontrado para "{categoriaSelecionada}".
          </Text>
        </View>
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      <TouchableOpacity style={styles.finalizarButton} onPress={handleFinalizarCompra}>
        <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa', 
    paddingTop: 20 
  },
  filterButton: {
    backgroundColor: '#1B02A8',
    paddingVertical: 10,
    borderRadius: 25,
    margin: 15,
    alignItems: 'center',
  },
  filterButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  modalOverlay: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10,
    width: '80%', 
    alignItems: 'center',
  },
  modalOption: {
    paddingVertical: 15, 
    width: '100%',
    borderBottomWidth: 1, 
    borderColor: '#ddd', 
    alignItems: 'center'
  },
  modalOptionText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1B02A8' },
  closeButton: {
    marginTop: 15, 
    backgroundColor: '#1B02A8',
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 25
  },
  closeButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  card: {
    backgroundColor: '#fff', 
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden', 
    elevation: 3, 
    flexDirection: 'row'
  },
  imagem: { 
    width: 100, 
    height: 100 
  },
  info: { 
    flex: 1, 
    padding: 10 
  },
  nome: { 
    fontSize: 18,
    fontWeight: 'bold', 
    color: '#1B02A8' 
  },
  descricao: { 
    fontSize: 14, 
    color: '#555' 
  },
  preco: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#28a745' 
  },
  categoria: { 
    fontSize: 13, 
    color: '#888' 
  },
  loading: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  semProdutos: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  buyButton: {
    backgroundColor: '#1B02A8',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalizarButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 25,
    margin: 15,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
