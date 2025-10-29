import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";

export default function Blog1() {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.section}>
        <Text style={styles.headline}>Cuidados Essenciais para Filhotes</Text>
        <Text style={styles.lead}>
          O que você precisa saber para cuidar bem do seu filhote e garantir um crescimento feliz e saudável:
        </Text>

        <Image
          source={require("../../assets/images/banner2.jpg")}
          style={styles.image}
        />

        <Text style={styles.text}>
          <Text style={styles.bold}>Alimentação adequada:</Text> Nos primeiros meses de vida, o filhote precisa de uma dieta balanceada e rica em nutrientes...
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Vacinação e vermifugação:</Text> A vacinação é fundamental para proteger o animal contra doenças graves...
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Socialização:</Text> O contato com pessoas, outros animais e diferentes ambientes é essencial...
        </Text>

        <Image
          source={require("../../assets/images/petcomoutropet.jpg")}
          style={styles.image}
        />

        <Text style={styles.text}>
          <Text style={styles.bold}>Treinamento básico:</Text> Ensinar comandos simples como “sentar”, “ficar” e “vir aqui” desde cedo é importante...
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>Higiene e cuidados diários:</Text> Banhos, escovação dos pelos e limpeza das orelhas devem ser feitos...
        </Text>

        <Image
          source={require("../../assets/images/banhopet.jpg")}
          style={styles.image}
        />

        <Text style={styles.text}>
          <Text style={styles.bold}>⚠️ Cuidados adicionais:</Text> Evite brincadeiras perigosas, quedas de escadas e contato com animais não vacinados...
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>✅ Dica importante:</Text> Crie um ambiente seguro e aconchegante para o descanso do filhote...
        </Text>

        <Text style={styles.text}>
          <Text style={styles.bold}>💖 Amor e paciência:</Text> Filhotes aprendem aos poucos. O carinho e a constância nos cuidados diários...
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subTitle}>Outros Artigos:</Text>

        <TouchableOpacity onPress={() => Linking.openURL("blog2.tsx")}>
          <Text style={styles.link}>O Que Fazer Se O Seu Pet Estiver Vesgo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL("blog3.tsx")}>
          <Text style={styles.link}>Como Proteger Seu Pet Durante o Verão</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.comments}>
        <Text style={styles.commentTitle}>Comentários</Text>
        <Text style={styles.comment}><Text style={styles.bold}>Myrella:</Text> Muito interessante, estou praticando com meu animalzinho!</Text>
        <Text style={styles.comment}><Text style={styles.bold}>Cleitinho:</Text> Estou gostando do contato, está me ajudando muito.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  section: { marginVertical: 16 },
  headline: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  lead: { fontSize: 14, color: "#555", marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 10, textAlign: "justify" },
  bold: { fontWeight: "bold" },
  image: { width: "100%", height: 200, borderRadius: 10, marginVertical: 10 },
  subTitle: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  link: { color: "#007AFF", marginBottom: 5 },
  comments: { marginTop: 20, padding: 10, backgroundColor: "#f9f9f9", borderRadius: 8 },
  commentTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  comment: { fontSize: 14, marginBottom: 6 },
});