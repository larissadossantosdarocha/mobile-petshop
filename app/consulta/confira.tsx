import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function Confira() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "𝓒𝓸𝓷𝓯𝓲𝓻𝓪",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 14 }} onPress={() => router.push("/")}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>Início</Text>
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
      headerStyle: { backgroundColor: "rgb(180, 227, 241)" },
      headerTitleStyle: {
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Garamond",
        fontSize: 28,
        fontWeight: "bold",
      },
    });
  }, []);

  return (
    <ScrollView style={styles.container}>

      <View style={styles.section}>
        <Text style={styles.title}>Conheça também a parte de consulta!</Text>
        <Text style={styles.paragraph}>
          Seu pet com a saúde em dia! A visita ao veterinário vai promover as
          medidas de medicina preventiva, aumentando assim a longevidade do
          animal, com qualidade de vida e diretamente proporcionando bem-estar e
          satisfação para os humanos envolvidos.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/consulta/consulta")}
        >
          <Text style={styles.buttonText}>Agendar Consulta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Image
          source={require("../../assets/images/icon.jpg")}
          style={styles.imageIcon}
        />
        <Text style={styles.title}>Confira nossas vantagens!</Text>
        <Text style={styles.paragraph}>
          Oferecemos diversas vantagens para você e seu pet, confira abaixo:
        </Text>
      </View>

      <View style={styles.sectionRow}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Receba em algumas horas!</Text>
          <Text style={styles.subtitle}>Regras:</Text>
          <Text style={styles.paragraph}>• Compre pelo site</Text>
          <Text style={styles.paragraph}>
            • Adicione o produto ao carrinho e finalize, se for da mesma cidade
            de uma loja física, entregaremos o mais rápido possível!
          </Text>
          <Text style={styles.paragraph}>
            • Pedidos realizados até as 14h, enviados no mesmo dia.
          </Text>
          <Text style={styles.paragraph}>
            • Após as 14h, enviados no dia seguinte.
          </Text>
        </View>
        <Image
          source={require("../../assets/images/receba.jpg")}
          style={styles.sideImage}
        />
      </View>

      <View style={styles.sectionRow}>
        <Image
          source={require("../../assets/images/parcele.jpg")}
          style={styles.sideImage}
        />
        <View style={styles.textBlock}>
          <Text style={styles.title}>Parcele em 3x sem juros!</Text>
          <Text style={styles.subtitle}>Regras:</Text>
          <Text style={styles.paragraph}>
            • Parcele suas compras em até 3x sem juros no cartão de crédito.
          </Text>
          <Text style={styles.paragraph}>• Parcelas mínimas de R$50,00.</Text>
        </View>
      </View>

      <View style={styles.sectionRow}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Frete Grátis!</Text>
          <Text style={styles.subtitle}>Regras:</Text>
          <Text style={styles.paragraph}>
            • Compras acima de R$150,00 têm frete grátis!
          </Text>
        </View>
        <Image
          source={require("../../assets/images/frete.jpg")}
          style={styles.sideImage}
        />
      </View>

      <View style={styles.sectionRow}>
        <Image
          source={require("../../assets/images/petshopdois.png")}
          style={styles.sideImage}
        />
        <View style={styles.textBlock}>
          <Text style={styles.title}>Retire na loja!</Text>
          <Text style={styles.subtitle}>Regras:</Text>
          <Text style={styles.paragraph}>
            • Compras realizadas online podem ser retiradas na loja física em até
            2 horas após a compra.
          </Text>
          <Text style={styles.paragraph}>
            • Somente em horários comerciais (7:00 às 11:30 - 13:15 às 18:00).
          </Text>
        </View>
      </View>

      <View style={styles.sectionRow}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Troque em até 30 dias!</Text>
          <Text style={styles.subtitle}>Regras:</Text>
          <Text style={styles.paragraph}>• Troque seu pedido em até 30 dias.</Text>
          <Text style={styles.paragraph}>• Deve estar dentro do prazo.</Text>
          <Text style={styles.paragraph}>
            • É necessário apresentar nota fiscal ou comprovante de compra.
          </Text>
          <Text style={styles.paragraph}>
            • Horário de troca: entre 8h e 14h.
          </Text>
        </View>
        <Image
          source={require("../../assets/images/troca.png")}
          style={styles.sideImage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    alignItems: "center",
    padding: 20,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    flexWrap: "wrap",
  },
  textBlock: {
    flex: 1,
    marginRight: 10,
  },
  imageIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  sideImage: {
    width: 170,
    height: 150,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(29, 172, 255, 1)",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    textAlign: "justify",
  },
  button: {
    backgroundColor: "rgba(29, 172, 255, 1)",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
