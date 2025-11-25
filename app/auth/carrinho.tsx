import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg";
import { useNavigation, useRouter } from "expo-router";

export default function Carrinho() {
  const navigation = useNavigation();
  const router = useRouter();

  const [itensCarrinho, setItensCarrinho] = useState([
    { id: 1, nome: "Ração para Gato", preco: 50 },
    { id: 2, nome: "Brinquedo para Cão", preco: 30 },
  ]);

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

  // TOTAL
  const total = itensCarrinho.reduce((acc, item) => acc + item.preco, 0);
  const totalFinal = total - desconto;

  const aplicarCupom = () => {
    if (cupom.toLowerCase() === "desconto5") {
      const desc = total * 0.05;
      setDesconto(desc);
      Alert.alert("Cupom aplicado!", "5% de desconto ativado.");
    } else {
      Alert.alert("Cupom inválido");
    }
  };

  const handleFinalizarCompra = () => {
    if (!nome || !endereco || !telefone) {
      Alert.alert("Erro", "Preencha os dados de entrega.");
      return;
    }

    Alert.alert("Pedido Finalizado!", "Seu pedido foi concluído.");
    router.push("/");
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Carrinho",
      headerStyle: { backgroundColor: "#1B02A8" },
      headerTitleStyle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Início</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tituloCarrinho}>Seu carrinho</Text>

      {/* ITENS */}
      <View style={styles.lista}>
        {itensCarrinho.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.nomeItem}>{item.nome}</Text>
            <Text style={styles.precoItem}>R$ {item.preco.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total: R$ {totalFinal.toFixed(2)}</Text>

      {/* CUPOM */}
      <View style={styles.banner}>
        <Text style={{ color: "#fff" }}>Cupom de presente: desconto5</Text>
      </View>

      <TextInput
        placeholder="Cupom de desconto"
        style={styles.input}
        value={cupom}
        onChangeText={setCupom}
      />

      <TouchableOpacity style={styles.btn} onPress={aplicarCupom}>
        <Text style={styles.btnText}>Aplicar 5%</Text>
      </TouchableOpacity>

      {/* ENTREGA */}
      <Text style={styles.subtitulo}>Informações de Entrega</Text>

      <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Endereço completo" value={endereco} onChangeText={setEndereco} />
      <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
      <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
      <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={setCep} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

      {/* PAGAMENTO */}
      <Text style={styles.subtitulo}>Forma de pagamento</Text>

      <Picker selectedValue={pagamento} onValueChange={setPagamento} style={styles.picker}>
        <Picker.Item label="PIX" value="pix" />
        <Picker.Item label="Cartão de Crédito" value="credito" />
        <Picker.Item label="Cartão de Débito" value="debito" />
      </Picker>

      {/* PIX */}
      {pagamento === "pix" && (
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Text>📱 Escaneie o QR Code:</Text>
          <QRCode value="Pagamento PIX Simulado" size={180} />
        </View>
      )}

      {/* CARTÃO */}
      {(pagamento === "credito" || pagamento === "debito") && (
        <View>
          <TextInput style={styles.input} placeholder="Número do cartão" maxLength={16} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Nome no cartão" />
          <TextInput style={styles.input} placeholder="Validade (MM/AA)" maxLength={5} />
          <TextInput style={styles.input} placeholder="CVV" maxLength={3} keyboardType="numeric" />
        </View>
      )}

      {/* PARCELAS */}
      {pagamento === "credito" && (
        <View style={{ marginTop: 10 }}>
          <Text>Parcelar em:</Text>
          <Picker selectedValue={numParcelas} onValueChange={setNumParcelas}>
            <Picker.Item value="1" label="1x sem juros" />
            <Picker.Item value="2" label="2x" />
            <Picker.Item value="3" label="3x" />
          </Picker>
        </View>
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
    backgroundColor: "#fff",
  },
  tituloCarrinho: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  lista: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  nomeItem: { fontSize: 18 },
  precoItem: { fontSize: 18, fontWeight: "bold" },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  banner: {
    backgroundColor: "#4271B8",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginVertical: 6,
  },
  picker: {
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "#1B02A8",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  subtitulo: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  btnFinalizar: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  textFinalizar: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
