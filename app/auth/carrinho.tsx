import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from "react-native";
import { Picker } from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";

type Item = {
  id: number;
  nome: string;
  preco: number;
};

export default function Carrinho() {
  const navigation = useNavigation();
  const router = useRouter();
  const [itensCarrinho, setItensCarrinho] = useState<Item[]>([]);
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pagamento, setPagamento] = useState("pix");
  const [numParcelas, setNumParcelas] = useState("1");

  useEffect(() => {
    navigation.setOptions({
      title: "Carrinho",
      headerStyle: { backgroundColor: "#1B02A8" },
      headerTitleStyle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
      headerRight: () => (
      <TouchableOpacity onPress={() => router.push("/")}>
      <Text style={{ color: "#fff", fontSize: 20, marginRight: 15 }}>Início</Text>
      </TouchableOpacity>
),

    });
    carregarCarrinho();
  }, []);

  const carregarCarrinho = async () => {
    const json = await AsyncStorage.getItem("carrinho");
    const carrinho: Item[] = json ? JSON.parse(json) : [];
    setItensCarrinho(carrinho);
    aplicarCupomAutomatico(carrinho, cupom);
  };

  const salvarCarrinho = async (novoCarrinho: Item[]) => {
    await AsyncStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const removerItem = async (index: number) => {
    const novaLista = [...itensCarrinho];
    novaLista.splice(index, 1);
    setItensCarrinho(novaLista);
    await salvarCarrinho(novaLista);
    aplicarCupomAutomatico(novaLista, cupom);
  };

  const total = itensCarrinho.reduce((acc, item) => acc + item.preco, 0);

  useEffect(() => {
    aplicarCupomAutomatico(itensCarrinho, cupom);
  }, [cupom, itensCarrinho]);

  const aplicarCupomAutomatico = (carrinho: Item[], codigo: string) => {
    if (codigo.toLowerCase() === "desconto5") {
      setDesconto(carrinho.reduce((acc, item) => acc + item.preco, 0) * 0.05);
    } else {
      setDesconto(0);
    }
  };

  const aplicarCupom = () => {
    if (cupom.toLowerCase() === "desconto5") {
      aplicarCupomAutomatico(itensCarrinho, cupom);
      Alert.alert("Cupom aplicado!", "5% de desconto ativado.");
    } else {
      Alert.alert("Cupom inválido");
      setDesconto(0);
    }
  };

  const totalFinal = total - desconto;

  const handleFinalizarCompra = () => {
    if (!nome || !endereco || !telefone || !cidade || !cep) {
      Alert.alert("Erro", "Preencha todas as informações de entrega.");
      return;
    }

    let mensagem = `*Novo pedido*\n\nNome: ${nome}\nEndereço: ${endereco}, ${bairro}, ${cidade}\nCEP: ${cep}\nTelefone: ${telefone}\n\nItens:\n`;
    itensCarrinho.forEach(item => {
      mensagem += `• ${item.nome} - R$ ${item.preco}\n`;
    });
    mensagem += `\nTotal: R$ ${totalFinal.toFixed(2)}\nPagamento: ${pagamento.toUpperCase()}\n`;

    const numeroVendedor = "5519987735021";
    const url = `https://wa.me/${numeroVendedor}?text=${encodeURIComponent(mensagem)}`;
    Linking.openURL(url);
    AsyncStorage.removeItem("carrinho");
    Alert.alert("Pedido enviado!", "O pedido foi enviado via WhatsApp.");
    router.push("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tituloCarrinho}>Seu carrinho</Text>

      <View style={styles.lista}>
        {itensCarrinho.map((item, i) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.nomeItem}>
              {item.nome.length > 25 ? item.nome.substring(0, 25) + "..." : item.nome}
            </Text>
            <Text style={styles.precoItem}>R$ {item.preco.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removerItem(i)}>
              <Text style={{ color: "red" }}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}
        {itensCarrinho.length === 0 && <Text>Seu carrinho está vazio.</Text>}
      </View>

      <Text style={styles.total}>Total: R$ {totalFinal.toFixed(2)}</Text>

      <View style={styles.banner}>
        <Text style={{ color: "#fff" }}>Cupom de presente: desconto5</Text>
      </View>

      <TextInput placeholder="Cupom de desconto" style={styles.input} value={cupom} onChangeText={setCupom} />
      <TouchableOpacity style={styles.btn} onPress={aplicarCupom}>
        <Text style={styles.btnText}>Aplicar 5%</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Informações de Entrega</Text>
      <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Endereço completo" value={endereco} onChangeText={setEndereco} />
      <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
      <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
      <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={setCep} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

      <Text style={styles.subtitulo}>Forma de pagamento</Text>
      <Picker selectedValue={pagamento} onValueChange={setPagamento} style={styles.picker}>
        <Picker.Item label="PIX" value="pix" />
        <Picker.Item label="Cartão de Crédito" value="credito" />
        <Picker.Item label="Cartão de Débito" value="debito" />
      </Picker>

      {pagamento === "pix" && (
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text>📱 Escaneie o QR Code:</Text>
          <QRCode value={`PIX - R$ ${totalFinal.toFixed(2)}`} size={180} />
        </View>
      )}

      {(pagamento === "credito" || pagamento === "debito") && (
        <View>
          <TextInput style={styles.input} placeholder="Número do cartão" maxLength={16} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Nome no cartão" />
          <TextInput style={styles.input} placeholder="Validade (MM/AA)" maxLength={5} />
          <TextInput style={styles.input} placeholder="CVV" maxLength={3} keyboardType="numeric" />
        </View>
      )}

      {pagamento === "credito" && (
        <Picker selectedValue={numParcelas} onValueChange={setNumParcelas} style={{ marginTop: 10 }}>
          <Picker.Item value="1" label="1x sem juros" />
          <Picker.Item value="2" label="2x" />
          <Picker.Item value="3" label="3x" />
        </Picker>
      )}

      <TouchableOpacity style={styles.btnFinalizar} onPress={handleFinalizarCompra}>
        <Text style={styles.textFinalizar}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  tituloCarrinho: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 15, 
    textAlign: "center" 
  },
  lista: { 
    backgroundColor: "#f9f9f9", 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    flexWrap: "wrap", 
  },
  nomeItem: {
    fontSize: 18,
    flexShrink: 1, 
    marginRight: 10,
  },
  precoItem: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginRight: 10 
  },
  total: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginVertical: 10, 
    textAlign: "center" 
  },
  banner: { 
    backgroundColor: "#4271B8", 
    padding: 10, 
    borderRadius: 5, 
    alignItems: "center", 
    marginBottom: 10 
  },
  input: {
     borderWidth: 1, 
     borderColor: "#aaa", 
     borderRadius: 5, 
     padding: 10, 
     marginVertical: 6 
    },
  picker: { 
    backgroundColor: "#eee", 
    borderRadius: 5 
  },
  btn: { 
    backgroundColor: "#1B02A8", 
    padding: 10, 
    borderRadius: 5, 
    alignItems: "center", 
    marginBottom: 15 
  },
  btnText: { 
    color: "#fff", 
    fontWeight: "bold"
   },
  subtitulo: { 
    marginTop: 20, 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  btnFinalizar: { 
    backgroundColor: "blue", 
    padding: 15, 
    borderRadius: 5, 
    marginTop: 20, 
    alignItems: "center"
   },
  textFinalizar: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});
