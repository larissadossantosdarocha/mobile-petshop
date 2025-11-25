import React, { useEffect, useState } from "react";
import {View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert,} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";

const urlVercel = "https://backend-tcc-petshop-petgato-2025.vercel.app/produto";

export default function Produtos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<any[]>([]);
  const [categoria, setCategoria] = useState("todos");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: "𝓟𝓻𝓸𝓭𝓾𝓽𝓸𝓼",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ marginRight: 14 }}
            onPress={() => router.push("/")}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
              Início
            </Text>
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
      headerStyle: { backgroundColor: "#1B02A8" },
      headerTitleStyle: {
        color: "#fff",
        fontFamily: "Garamond",
        fontSize: 28,
        fontWeight: "bold",
      },
    });
  }, []);

  const buscarTodosProdutos = async () => {
    try {
      const res = await fetch(urlVercel);
      const dados = res.ok ? await res.json() : [];
      return dados;
    } catch (e) {
      console.error("Erro ao buscar produtos:", e);
      return [];
    }
  };

  const exibirProdutos = async (cat: string = "todos") => {
    const todosProdutos = await buscarTodosProdutos();

    let filtrados = todosProdutos;

    if (cat !== "todos") {
      filtrados = todosProdutos.filter((p: any) => p.categoria === cat);
    }

    setProdutos(todosProdutos);
    setProdutosFiltrados(filtrados);
    setLoading(false);
  };

  useEffect(() => {
    exibirProdutos("todos");
  }, []);

  const adicionarAoCarrinho = async (produto: any) => {
    try {
      const carrinhoAtual = await AsyncStorage.getItem("carrinho");
      let carrinho = carrinhoAtual ? JSON.parse(carrinhoAtual) : [];

      carrinho.push(produto);

      await AsyncStorage.setItem("carrinho", JSON.stringify(carrinho));

      Alert.alert("Sucesso", `Produto "${produto.nome}" adicionado ao carrinho!`);
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />

      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao || ""}</Text>
        <Text style={styles.preco}>R$ {item.preco}</Text>

        <TouchableOpacity
          style={styles.btnComprar}
          onPress={() => adicionarAoCarrinho(item)}
        >
          <Text style={styles.btnComprarTexto}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      <View style={styles.selectBox}>
        <Picker
          selectedValue={categoria}
          onValueChange={(value) => {
            setCategoria(value);
            exibirProdutos(value);
          }}
        >
          <Picker.Item label="Todos os Produtos" value="todos" />
          <Picker.Item label="Cachorro" value="cachorro" />
          <Picker.Item label="Gato" value="gato" />
          <Picker.Item label="Peixe" value="peixe" />
          <Picker.Item label="Pássaro" value="passaro" />
        </Picker>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#1B02A8" />
        </View>
      ) : produtosFiltrados.length === 0 ? (
        <View style={styles.semProdutos}>
          <Text style={styles.semProdutosTexto}>
            Nenhum produto encontrado para "{categoria}".
          </Text>
        </View>
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectBox: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
    flexDirection: "row",
    padding: 10,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  info: { flex: 1, marginLeft: 10 },
  nome: { fontSize: 18, fontWeight: "bold" },
  descricao: { color: "#666" },
  preco: { marginTop: 5, fontSize: 18, fontWeight: "bold" },
  btnComprar: {
    marginTop: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    padding: 8,
    alignItems: "center",
  },
  btnComprarTexto: { color: "#fff", fontWeight: "bold" },

  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  semProdutos: { padding: 20, alignItems: "center" },
  semProdutosTexto: { color: "#444", fontSize: 16 },
});
