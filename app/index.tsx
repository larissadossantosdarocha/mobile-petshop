import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      {/* SEGUNDO HEADER */}
      <View style={styles.secondHeader}>
        <HeaderButton
          label="Consulta"
          image={require("../assets/images/veterinario.jpg")}
          route="/consulta"
        />
        <HeaderButton
          label="Adoção"
          image={require("../assets/images/salveosanimais.jpg")}
          route="/adocao"
        />
        <HeaderButton
          label="Doações"
          image={require("../assets/images/doacao.jpg")}
          route="/doacao"
        />
        <HeaderButton
          label="Cadastrar"
          image={require("../assets/images/cadastro.jpg")}
          route="/cadastrar"
        />
      </View>

      {/* ANÚNCIOS */}
      <View style={styles.anuncios}>
        <AnuncioCard
          image={require("../assets/images/doacao.jpg")}
          title="Brinquedos que fazem a diferença!"
          text="Doe e ajude a levar felicidade para quem mais precisa."
        />
        <AnuncioCard
          image={require("../assets/images/veterinario.jpg")}
          title="Acupuntura para pets:"
          text="Amor e saúde em cada ponto!"
        />
        <AnuncioCard
          image={require("../assets/images/noticia.jpg")}
          title="Amor e cuidado para seu pet!"
          text="Confira nosso blog exclusivo."
        />
      </View>

      {/* BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Compras acima de R$100,00 ganham um brinde
        </Text>
      </View>

      {/* IMAGEM ÚNICA */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/racao.jpg")}
          style={styles.carouselImage}
        />
      </View>

      {/* CARDS DE VANTAGENS */}
      <View style={styles.juros}>
        <CardInfo
          image={require("../assets/images/relogio.jpg")}
          title="Receba em algumas horas!"
          text="Confira as regras ->"
        />
        <CardInfo
          image={require("../assets/images/cartao.jpg")}
          title="Parcele em 3x sem juros!"
          text="Confira as regras ->"
        />
        <CardInfo
          image={require("../assets/images/entrega.jpg")}
          title="Frete Grátis!"
          text="Confira as regras ->"
        />
        <CardInfo
          image={require("../assets/images/petshop.jpg")}
          title="Retire e troque na loja!"
          text="Confira as regras ->"
        />
      </View>
    </ScrollView>
  );
}

/* COMPONENTES */
function HeaderButton({ label, image, route }: any) {
  return (
    <TouchableOpacity onPress={() => router.push(route)} style={styles.headerBtn}>
      <Image source={image} style={styles.headerBtnImage} />
      <Text style={styles.headerBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

function AnuncioCard({ image, title, text }: any) {
  return (
    <View style={styles.anuncioCard}>
      <Image source={image} style={styles.anuncioImg} />
      <Text style={styles.anuncioTitle}>{title}</Text>
      <Text style={styles.anuncioText}>{text}</Text>
    </View>
  );
}

function CardInfo({ image, title, text }: any) {
  return (
    <View style={styles.cardInfo}>
      <Image source={image} style={{ width: 28, height: 28 }} />
      <View>
        <Text style={styles.cardInfoTitle}>{title}</Text>
        <Text style={styles.cardInfoText}>{text}</Text>
      </View>
    </View>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  secondHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#C5DAE2", 
    paddingVertical: 10,
  },
  headerBtn: { alignItems: "center", width: 60 },
  headerBtnImage: {
    width: 30,
    height: 30,
    marginBottom: 6,
    borderRadius: 15, 
  },
  headerBtnText: { fontSize: 12, color: "#444", textAlign: "center" },
  anuncios: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginVertical: 16,
  },
  anuncioCard: {
    width: "30%",
    minWidth: 100,
    padding: 10,
    margin: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10, 
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  anuncioImg: { width: 40, height: 40, marginBottom: 6 },
  anuncioTitle: {
    fontWeight: "bold",
    color: "#4BC5EB",
    fontSize: 14,
    textAlign: "center",
  },
  anuncioText: { fontSize: 12, textAlign: "center", color: "#555" },
  banner: {
    backgroundColor: "#1E90FF", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 12,
  },
  bannerText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15, 
  },
  carouselImage: {
    width: "100%", 
    height: 200, 
    borderRadius: 10, 
    resizeMode: "cover", 
  },
  juros: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", 
    marginVertical: 24,
    paddingHorizontal: 10,  
  },
  cardInfo: {
    width: "45%", 
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 16,
  },
  cardTextContainer: {
    flex: 1, 
    flexWrap: "wrap", 
  },
  cardInfoTitle: {
    fontWeight: "bold",
    color: "#444",
    fontSize: 14, 
  },
  cardInfoText: {
    color: "#555",
    fontSize: 12, 
  },
});