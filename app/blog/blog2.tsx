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

export default function Blog2() {
  return (
    <ScrollView style={styles.container}>
      
      {/* BOTÃO DE VOLTAR */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnTxt}>◀ Voltar</Text>
      </TouchableOpacity>

      {/* TÍTULO */}
      <Text style={styles.title}>Manchete: O Que Fazer Se O Seu Pet Estiver Vesgo</Text>
      <Text style={styles.meta}>
        Por <Text style={styles.bold}>Larissa Santos</Text> — 17 de setembro de 2025 • 08:30
      </Text>

      <Text style={styles.lead}>Possíveis causas de um pet com olhos vesgos:</Text>

      {/* IMAGEM PRINCIPAL */}
      <Image
        source={require("../../assets/images/download.avif")}
        style={styles.mainImg}
      />

      {/* TEXTO DO POST */}
      <Text style={styles.paragraph}>
        {"\n"}
        <Text style={styles.bold}>Problemas neurológicos:</Text> alteração nos nervos que
        controlam os músculos dos olhos, podendo causar desalinhamento ocular.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Doenças do ouvido interno:</Text> podem afetar o equilíbrio
        e interferir na orientação dos olhos, causando desvio temporário.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Trauma ou pancada:</Text> batidas na cabeça podem causar
        inflamações nos músculos e nervos deixando o olhar desalinhado.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Infecções ou inflamações:</Text> infecções bacterianas,
        virais ou parasitárias podem atingir estruturas delicadas, como o ouvido interno
        e o sistema nervoso central.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Condição congênita:</Text> comum em gatos siameses e
        orientais, podendo não causar prejuízos à visão.
      </Text>

      {/* IMAGEM 2 */}
      <Image
        source={require("../../assets/images/veterinariopet.jpg")}
        style={styles.secondaryImg}
      />

      <Text style={styles.subTitle}>⚠️ Quando procurar o veterinário com urgência:</Text>

      <Text style={styles.paragraph}>
        Se o olho ficou vesgo de repente ou veio acompanhado de sintomas como:
      </Text>

      <View style={styles.list}>
        {[
          "Falta de equilíbrio ou quedas frequentes",
          "Andar em círculos",
          "Cabeça torta ou movimentos involuntários dos olhos",
          "Vômitos ou perda de apetite",
          "Pupilas de tamanhos diferentes",
          "Alteração de comportamento"
        ].map((item, index) => (
          <Text key={index} style={styles.listItem}>• {item}</Text>
        ))}
      </View>

      <Text style={styles.paragraph}>
        Atendimento deve ser imediato, pois pode indicar problemas neurológicos graves.
      </Text>

      <Text style={styles.subTitle}>✅ O que você pode fazer agora:</Text>
      <Text style={styles.paragraph}>
        Mantenha o pet em ambiente seguro, com poucos estímulos visuais, e observe os sintomas.
        Gravar vídeos pode ajudar o veterinário no diagnóstico.
      </Text>

      {/* IMAGEM 3 */}
      <Image
        source={require("../../assets/images/petdescanso.jpg")}
        style={styles.secondaryImg}
      />

      {/* OUTROS ARTIGOS */}
      <Text style={styles.otherArticles}>Outros Artigos:</Text>

      <TouchableOpacity onPress={() => router.push("/blog/blog3")}>
        <Text style={styles.link}>Como Proteger Seu Pet Durante o Verão</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/blog/blog1")}>
        <Text style={styles.link}>Cuidados Essenciais para Filhotes</Text>
      </TouchableOpacity>

      {/* COMENTÁRIOS */}
      <Text style={styles.commentsTitle}>Comentários:</Text>

      <View style={styles.commentBox}>
        <Text style={styles.comment}>
          <Text style={styles.bold}>Ana:</Text> Muito interessante essa notícia!
        </Text>
      </View>
      <View style={styles.commentBox}>
        <Text style={styles.comment}>
          <Text style={styles.bold}>Pedro:</Text> Estou acompanhando de perto esse caso.
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
  secondaryImg: {
    width: "100%",
    height: 220,
    marginVertical: 18,
    borderRadius: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#1B02A8",
  },
  list: {
    paddingLeft: 10,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
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