import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity,} from "react-native";
import { useNavigation, useRouter } from "expo-router";

export default function Blog1() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: "𝓑𝓵𝓸𝓰",
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
      headerTitleStyle: {
        color: "#fff",
        fontFamily: "Garamond",
        fontSize: 28,
        fontWeight: "bold",
      },
      headerTitleAlign: "left",
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cuidados Essenciais para Filhotes</Text>
      <Text style={styles.meta}>
        Por <Text style={styles.bold}>Equipe Pet Gatô</Text> — 15 de agosto de 2025 • 09:15
      </Text>

      <Image
        source={require("../../assets/images/banner2.jpg")}
        style={styles.mainImg}
      />

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Alimentação adequada:</Text> Nos primeiros meses de vida,
        o filhote precisa de ração própria para a idade para garantir um crescimento
        saudável e cheio de energia.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Vacinação e vermifugação:</Text> A vacinação é essencial
        para evitar doenças graves. Consulte sempre um veterinário para manter tudo em dia!
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Socialização:</Text> O contato com pessoas, outros animais
        e ambientes diferentes desenvolve confiança e boa convivência.
      </Text>

      <Image
        source={require("../../assets/images/petcomoutropet.jpg")}
        style={styles.secondaryImg}
      />

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Treinamento básico:</Text> Ensine comandos simples desde
        cedo. O aprendizado aos poucos faz toda a diferença na convivência.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Higiene e cuidados diários:</Text> Banhos, escovação e
        limpeza das orelhas previnem problemas de pele e infecções.
      </Text>

      <Image
        source={require("../../assets/images/banhopet.jpg")}
        style={styles.secondaryImg}
      />

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>⚠️ Cuidados adicionais:</Text> Evite quedas, brincadeiras
        perigosas e contato com animais sem vacinação.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>💖 Amor e paciência:</Text> Filhotes aprendem com carinho,
        rotina e reforços positivos!
      </Text>

      <Text style={styles.otherArticles}>Outros Artigos:</Text>

      <TouchableOpacity onPress={() => router.push("/blog/blog2")}>
        <Text style={styles.link}>O Que Fazer Se O Seu Pet Estiver Vesgo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/blog/blog3")}>
        <Text style={styles.link}>Como Proteger Seu Pet Durante o Verão</Text>
      </TouchableOpacity>

      <Text style={styles.commentsTitle}>Comentários:</Text>

      <View style={styles.commentBox}>
        <Text style={styles.comment}>
          <Text style={styles.bold}>Myrella:</Text> Muito interessante, estou aprendendo com meu filhote!
        </Text>
      </View>
      <View style={styles.commentBox}>
        <Text style={styles.comment}>
          <Text style={styles.bold}>Cleitinho:</Text> Estou gostando, está me ajudando muito!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
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
  mainImg: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    resizeMode: "cover",
    marginVertical: 15,
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
