import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function Blog3() {
  return (
    <ScrollView style={styles.container}>

      {/* BOTÃO DE VOLTAR */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnTxt}>◀ Voltar</Text>
      </TouchableOpacity>

      {/* TÍTULO */}
      <Text style={styles.title}>Como Proteger Seu Pet Durante o Verão</Text>
      <Text style={styles.meta}>
        Por <Text style={styles.bold}>Larissa Santos</Text> — 17 de setembro de 2025 • 08:30
      </Text>

      {/* SUBTÍTULO */}
      <Text style={styles.lead}>
        Dicas essenciais para manter seu pet saudável e seguro nos dias quentes.
      </Text>

      {/* IMAGEM PRINCIPAL */}
      <Image
        source={require("../../assets/images/petagua.jpg")}
        style={styles.mainImg}
      />

      {/* TEXTO PRINCIPAL */}
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Hidratação é essencial:</Text> Durante o verão, os pets precisam de água fresca
        constantemente. Tenha sempre tigelas disponíveis e incentive a hidratação.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Evite passeios em horários quentes:</Text> O asfalto quente queima as patas
        e pode causar insolação. Prefira passeios pela manhã ou no final da tarde.
      </Text>

      <Image
        source={require("../../assets/images/petpraia.jpg")}
        style={styles.secondaryImg}
      />

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Proteção contra o sol:</Text> Pets de pelagem curta têm maior risco de queimaduras.
        Use protetor solar próprio para animais nas regiões mais sensíveis.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Cuidado com a desidratação:</Text> Sinais como boca seca, cansaço e olhos fundos
        exigem atenção! Ofereça água imediatamente e, se necessário, procure um veterinário.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Evite locais fechados e quentes:</Text> Nunca deixe o pet dentro do carro!
        A temperatura interna sobe muito rápido e pode ser fatal.
      </Text>

      <Text style={styles.subTitle}>⚠️ Quando procurar ajuda imediata:</Text>
      <Text style={styles.paragraph}>
        Respiração ofegante extrema, tremores, desmaios e vômitos podem indicar insolação.
      </Text>

      <Image
        source={require("../../assets/images/petfeliz.jpg")}
        style={styles.secondaryImg}
      />

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>✅ O que fazer agora:</Text> Ofereça sombra, água fresca, ventiladores e evite
        exposição direta ao sol.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Dica extra:</Text> Se ele gostar de água, invista em uma piscininha ou passeios em locais
        com água para refrescar!
      </Text>

      {/* OUTROS ARTIGOS */}
      <Text style={styles.otherArticles}>Outros Artigos:</Text>

      <TouchableOpacity onPress={() => router.push("/blog/blog2")}>
        <Text style={styles.link}>O Que Fazer Se O Seu Pet Estiver Vesgo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/blog/blog1")}>
        <Text style={styles.link}>Cuidados Essenciais para Filhotes</Text>
      </TouchableOpacity>

      {/* COMENTÁRIOS */}
      <Text style={styles.commentsTitle}>Comentários:</Text>

      <View style={styles.commentBox}>
        <Text style={styles.comment}>
          <Text style={styles.bold}>Mônica:</Text> Estava precisando desse artigo!
        </Text>
      </View>
      <View style={styles.commentBox}>
        <Text style={styles.comment}>
          <Text style={styles.bold}>Carlos:</Text> Estou acompanhando e tendo resultados!
        </Text>
      </View>

    </ScrollView>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backBtnTxt: {
    fontSize: 16,
    color: "#1B02A8",
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B02A8",
  },
  meta: {
    fontSize: 12,
    marginTop: 4,
    color: "#555",
  },
  bold: { fontWeight: "bold" },
  lead: {
    marginVertical: 12,
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
  },
  mainImg: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
    color: "#1B02A8",
  },
  secondaryImg: {
    width: "100%",
    height: 220,
    marginVertical: 18,
    borderRadius: 12,
  },
  otherArticles: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    color: "#1B02A8",
  },
  link: {
    fontSize: 15,
    color: "#007BFF",
    fontWeight: "600",
    marginBottom: 8,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    color: "#1B02A8",
  },
  commentBox: {
    backgroundColor: "#E8F6FF",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  comment: {
    fontSize: 14,
    color: "#222",
  },
});