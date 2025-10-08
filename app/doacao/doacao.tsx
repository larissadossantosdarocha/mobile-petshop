import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Platform } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { qrcode, pessoa } from "../../assets";

export default function Doacao() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "𝓓𝓸𝓪𝓬̧𝓪̃𝓸",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => router.push("/")}
          >
            <Text style={{ color: "#ffffffff", fontSize: 20, fontWeight: "600" }}>
              Início
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Image
              source={pessoa}
              style={{ width: 40, height: 28 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Ajude nossos pets a terem uma vida melhor 💕
        </Text>
        <Text style={styles.bannerSubtitle}>
          Sua contribuição faz toda a diferença! Cada doação ajuda a comprar
          ração, vacinas e cuidados veterinários para nossos pets resgatados.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pets que precisam da sua ajuda</Text>
        <View style={styles.cards}>
          {[
            {
              nome: "Sol",
              img: "https://s2-g1.glbimg.com/St9bNFOVVt0ptEfCqC8j-tIy5EY=/0x0:1270x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/Z/4/w5aD04SZmwb4oqvnfIAQ/gatinha-resgatada.jpg",
              text: "Resgatada recentemente, precisa de vacinas e alimentação."
            },
            {
              nome: "Max",
              img: "https://fotos.amomeupet.org/uploads/fotos/1683120795_6452629b6bc47_hd.jpg",
              text: "Recuperando-se de um acidente, precisa de tratamento veterinário."
            },
            {
              nome: "Mimi",
              img: "https://fotos.amomeupet.org/uploads/fotos/1628182658_610c18828d55d_hd.jpeg",
              text: "Filhote em busca de um lar, precisa de leite e cuidados."
            }
          ].map((pet, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: pet.img }} style={styles.cardImage} resizeMode="cover" />
              <Text style={styles.cardTitle}>{pet.nome}</Text>
              <Text style={styles.cardText}>{pet.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.doacaoCard}>
          <View style={styles.doacaoTexto}>
            <Text style={styles.doacaoTitle}>Sobre o Pet Gato</Text>
            <Text>
              O <Text style={styles.bold}>Pet Gato</Text> nasceu do amor pelos
              animais e da vontade de transformar a vida daqueles que não
              tiveram um começo fácil. Nosso espaço não é apenas um pet shop:
              também é um ponto de acolhimento para cães e gatos em situação de
              abandono, resgate ou maus-tratos.
            </Text>
            <Text>
              As <Text style={styles.bold}>doações</Text> têm um papel
              fundamental em nossa missão. Todo o valor arrecadado é utilizado
              para:
            </Text>
            <Text>🐾 Alimentação: ração e leite para filhotes;</Text>
            <Text>🐾 Saúde: vacinas, consultas e castrações;</Text>
            <Text>🐾 Bem-estar: medicamentos, brinquedos e caminhas;</Text>
            <Text>🐾 Acolhimento: espaço seguro e limpo para os pets resgatados.</Text>
            <Text style={styles.destaque}>
              ❤️ Sua contribuição faz a diferença. Juntos podemos mudar o
              destino de muitos animais!
            </Text>
          </View>

          <View style={styles.pixBox}>
            <Text style={styles.doacaoTitle}>Doe via PIX 📲</Text>
            <Text>
              <Text style={styles.bold}>Chave PIX:</Text>{"\n"}
              evelynluiz.fernandes@gmail.com
            </Text>
            <Image style={styles.qrcode} source={qrcode} resizeMode="contain" />
            <Text>Escaneie o QR Code com seu aplicativo bancário.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const cardShadow = Platform.select({
  web: { boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" },
  default: { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
});

const doacaoCardShadow = Platform.select({
  web: { boxShadow: "0px 6px 10px rgba(0,0,0,0.1)" },
  default: { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 5 },
});

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: "#ffffffff", 
     paddingHorizontal: 10 },
  banner: { 
    padding: 25, 
    alignItems: "center", 
    backgroundColor: "#edf5f8ff", 
    borderBottomWidth: 1, 
    borderBottomColor: " rgb(180, 227, 241)"
   },
  bannerTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#000000ff", 
    textAlign: "center" 
  },
  bannerSubtitle: {
     fontSize: 14, 
     color: "#555", 
     textAlign: "center", 
     paddingHorizontal: 10
     },
  section: { 
    marginVertical: 30, 
    paddingHorizontal: 10 
  },
  sectionTitle: { 
    fontSize: 20,
    fontWeight: "bold", 
    textAlign: "center",
    marginBottom: 20,
    color: "#42bff5" 
      },
  cards: { 
    flexDirection: "row", 
    justifyContent: "center", 
    flexWrap: "wrap", 
    gap: 15 
  },
  card: { 
    width: 160, 
    backgroundColor: "white", 
    padding: 15, 
    borderRadius: 12, 
    alignItems: "center", 
    ...cardShadow 
  },
  cardImage: { 
    width: 110, 
    height: 90, 
    borderRadius: 8, 
    marginBottom: 10 
  },
  cardTitle: { 
    fontWeight: "bold", 
    fontSize: 16, 
    marginBottom: 5
   },
  cardText: { 
    fontSize: 13,
    color: "#555",
    textAlign: "center" 
  },
  doacaoCard: { 
    flexDirection: "row", 
    backgroundColor: "white", 
    padding: 20, 
    borderRadius: 15, 
    justifyContent: "space-between", 
    flexWrap: "wrap", 
    gap: 20, ...doacaoCardShadow
   },
  doacaoTexto: { 
    flex: 1, 
    minWidth: 250 
  },
  doacaoTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#42bff5"
   },
  bold: { 
    fontWeight: "bold" 
  },
  destaque: { 
    marginTop: 15, 
    fontWeight: "bold", 
    color: "#42bff5" 
  },
  pixBox: { 
    minWidth: 160, 
    alignItems: "center", 
    backgroundColor: "#b3e5fc", 
    padding: 15, 
    borderRadius: 10 
  },
  qrcode: {
     width: 120, 
     height: 120, 
     marginVertical: 10, 
     borderRadius: 6
     },
});
