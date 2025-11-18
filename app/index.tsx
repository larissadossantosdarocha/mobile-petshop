import React, { useEffect, useState, useRef } from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking,} from "react-native";
import { router } from "expo-router";

export default function Index() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const blogRef = useRef<ScrollView>(null);

  const banners = [
    { text: "Frete fixo de R$10,00 para todo o Brasil", color: "#0303fffb" },
    { text: "Compras acima de R$100,00 ganham um brinde", color: "#00a6f3f6" },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setBannerIndex((prev) => (prev + 1) % banners.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subHeader}>
        <HeaderButton
          label="Consulta"
          route="/consulta/consulta"
        />
        <HeaderButton
          label="Adoção"
          route="/adocao/adocao"
        />
        <HeaderButton
          label="Doações"
          route="/doacao/doacao"
        />
        <HeaderButton
          label="Cadastrar"
          route="/auth/cadastrar"
        />
        <HeaderButton
          label="Blog"
          route="/blog/blog1"
        />
      </View>

      <View
        style={[styles.banner, { backgroundColor: banners[bannerIndex].color }]}
      >
        <Text style={styles.bannerText}>{banners[bannerIndex].text}</Text>
      </View>

      <View style={styles.juros}>
        <CardInfo
          image={require("../assets/images/relogio.png")}
          title="Receba em algumas horas!"
          text="Clique e confira"
        />
        <CardInfo
          image={require("../assets/images/cartao.png")}
          title="Parcele em até 3x"
          text="Clique e confira"
        />
        <CardInfo
          image={require("../assets/images/entrega-rapida.png")}
          title="Frete Grátis"
          text="Clique e confira"
        />
        <CardInfo
          image={require("../assets/images/petshop.png")}
          title="Retire na loja"
          text="Clique e confira"
        />
      </View>

      <TouchableOpacity
        style={styles.todosProdutosBtn}
        onPress={() => router.push("/auth/produtos")}
      >
        <Image
          source={require("../assets/images/produtos.png")}
          style={styles.todosProdutosIcon}
        />
        <Text style={styles.todosProdutosTxt}>Ver Todos os Produtos</Text>
      </TouchableOpacity>

      <View style={styles.cuidadosSection}>
        <TouchableOpacity
          style={styles.banhoTosaBox}
          onPress={() => Linking.openURL("https://daycarepet.com.br/banho-tosa")}
        >
          <View style={styles.cuidadoTextContainer}>
            <Text style={styles.cuidadoSubTitle}>Banho & Tosa</Text>
            <Text style={styles.cuidadoDesc}>
              Higiene e Conforto para o seu melhor amigo!
            </Text>
          </View>

          <Image
            source={require("../assets/images/banho-tosa-pet-shop.jpg")}
            style={styles.cuidadoImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cuidadosBox}
          onPress={() => router.push("/consulta/consulta")}
        >
          <View style={styles.cuidadoTextContainer}>
            <Text style={styles.cuidadoSubTitle}>Veterinário</Text>
            <Text style={styles.cuidadoDesc}>
              A saúde de seu pet, a sua prioridade
            </Text>
          </View>
          <Image
            source={require("../assets/images/veterinario.png")}
            style={styles.cuidadoImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.blogSection}>
        <Text style={styles.sectionTitle}>Blog Pet Gatô:</Text>
        <View style={styles.arrowWrapper}>
          <ScrollView
            horizontal
            ref={blogRef}
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
            scrollEventThrottle={16}
          >
            <BlogCard
              image={require("../assets/images/blog1.jpg")}
              title="Cuidados Essenciais para Filhotes"
              route="/blog/blog1"
            />
            <BlogCard
              image={require("../assets/images/download.avif")}
              title="O que fazer se o seu pet estiver vesgo"
              route="/blog/blog2"
            />
            <BlogCard
              image={require("../assets/images/blog3.jpg")}
              title="Como proteger seu pet durante o verão"
              route="/blog/blog3"
            />
          </ScrollView>
        </View>
      </View>

      <View style={styles.indicacoesSection}>
        <Text style={styles.sectionTitleWhite}>
          Indicações de quem entende:
        </Text>
        <View style={styles.indicacoesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {indicacoes.map((item, i) => (
              <View key={i} style={styles.indCard}>
                <Image source={item.image} style={styles.indImg} />
                <Text style={styles.indTitle}>{item.title}</Text>
                <Text style={styles.indDesc}>{item.desc}</Text>
                <TouchableOpacity
                  style={styles.vejamaisBtn}
                  onPress={() => Linking.openURL(item.link)}
                >
                  <Text style={styles.vejamaisTxt}>Veja mais</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerSectionsWrapper}>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Sobre o PetShop</Text>
            <Text style={styles.footerText}>
              Somos uma loja dedicada ao bem-estar dos seus pets. Aqui você
              encontra os melhores produtos e serviços personalizados.
            </Text>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Contato</Text>
            <Text style={styles.footerText}>
              📍 Rua das Flores, 123 - São Paulo - SP
            </Text>
            <Text style={styles.footerText}>📞 (11) 99999-9999</Text>
            <Text style={styles.footerText}>✉️ contato@petshop.com.br</Text>
            <Text style={styles.footerText}>
              🕘 Seg-Sex: 9h às 18h | Sáb: 9h às 14h
            </Text>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.footerBottomText}>
            © 2025 PetShop. Todos os direitos reservados. ❤️🐾
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const indicacoes = [
  {
    image: require("../assets/images/viajar.jpg"),
    title: "Viajar com quem mais ama",
    desc: "Proporcione uma viagem inesquecível com seu pet!",
    link: "https://www.petworktravel.com.br/pt/",
  },
  {
    image: require("../assets/images/sitter.jpg"),
    title: "Pet Sitter!",
    desc: "Serviço de babá de animais de estimação.",
    link: "https://www.doghero.com.br/",
  },
  {
    image: require("../assets/images/creche.jpg"),
    title: "Um lugar para socializar!",
    desc: "Onde seu pet pode ficar enquanto você trabalha.",
    link: "https://www.dogresort.com.br/",
  },
  {
    image: require("../assets/images/spa.jpg"),
    title: "Relaxar é um privilégio!",
    desc: "Proporcione uma experiência única para seu pet.",
    link: "https://daycarepet.com.br/pet-spa",
  },
  {
    image: require("../assets/images/bolsinha.jpg"),
    title: "Hospedagem de elite!",
    desc: "Hotel e creche sob medida para seu companheiro.",
    link: "https://alfdogpetcreche.com.br/",
  },
  {
    image: require("../assets/images/lama.jpg"),
    title: "Conheça passeios com seu pet!",
    desc: "Passear com o seu pet é essencial — conheça lugares incríveis!",
    link: "https://passeios.petsturistas.com.br/",
  },
];

function HeaderButton({ image, label, route }: any) {
  return (
    <TouchableOpacity onPress={() => router.push(route)} style={styles.headerBtn}>
      <Image source={image} style={styles.headerBtnImage} />
      <Text style={styles.headerBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

function BlogCard({ image, title, route }: any) {
  return (
    <TouchableOpacity onPress={() => router.push(route)}>
      <View style={styles.blogCard}>
        <Image source={image} style={styles.blogImg} />
        <Text style={styles.blogTxt}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

function CardInfo({ image, title, text }: any) {
  return (
    <View style={styles.cardInfo}>
      <Image source={image} style={styles.cardIcon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardInfoTitle}>{title}</Text>
        <TouchableOpacity onPress={() => router.push("/consulta/confira")}>
          <Text style={styles.cardInfoTextLink}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  subHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#a6c2ebff",
    height: 40,
  },

  headerBtn: { alignItems: "center" },
  headerBtnImage: { width: 35, height: 10, borderRadius: 10 },
  headerBtnText: {
    fontSize: 14,
    color: "#1B02A8",
    fontWeight: "600",
    textAlign: "center",
  },

  banner: {
    margin: 14,
    borderRadius: 60,
    padding: 14,
    alignItems: "center",
  },
  bannerText: { color: "#fff", fontWeight: "bold", textAlign: "center" },

  juros: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 20,
  },

  cardInfo: {
    width: "48%",
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4BC5EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
  },
  cardIcon: { width: 36, height: 36, tintColor: "#1B02A8" },
  cardTextContainer: { flex: 1 },
  cardInfoTitle: {
    fontWeight: "bold",
    color: "#1B02A8",
    fontSize: 14,
    textAlign: "center",
  },
  cardInfoTextLink: {
    color: "#4BC5EB",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
  },

  cuidadosSection: {
    marginVertical: 30,
    alignItems: "center",
  },

  cuidadosBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4BC5EB",
    borderRadius: 15,
    padding: 12,
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#fff",
  },

  banhoTosaBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4BC5EB",
    borderRadius: 15,
    padding: 12,
    marginVertical: 10,
    width: "90%",
    backgroundColor: "#fff",
  },

  cuidadoTextContainer: { flex: 1, paddingRight: 10 },

  cuidadoSubTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B02A8",
    textAlign: "center",
  },
  cuidadoDesc: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
    textAlign: "center",
  },
  cuidadoImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: "cover",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B02A8",
    marginLeft: 10,
    marginVertical: 10,
    textAlign: "center",
  },
  sectionTitleWhite: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    marginVertical: 10,
    textAlign: "center",
  },

  blogSection: { marginBottom: 30 },
  blogCard: {
    width: 200,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4BC5EB",
    borderRadius: 12,
    marginHorizontal: 10,
    elevation: 3,
  },
  blogImg: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    resizeMode: "cover",
  },
  blogTxt: {
    fontWeight: "bold",
    color: "#1B02A8",
    textAlign: "center",
    paddingVertical: 8,
    alignItems: "center",
  },

  arrowWrapper: { flexDirection: "row", alignItems: "center" },

  indicacoesSection: {
    marginVertical: 30,
    backgroundColor: "#1B02A8",
    paddingVertical: 20,
  },
  indicacoesWrapper: { flexDirection: "row", alignItems: "center" },

  indCard: {
    width: 220,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#4BC5EB",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },
  indImg: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    resizeMode: "cover",
  },
  indTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1B02A8",
    marginTop: 5,
    textAlign: "center",
  },
  indDesc: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
    marginTop: 3,
  },
  vejamaisBtn: {
    backgroundColor: "#E8F6FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 6,
  },
  vejamaisTxt: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },

  footerContainer: {
    backgroundColor: "#1B02A8",
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  footerSectionsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  footerSection: {
    width: "100%",
    maxWidth: 350,
    marginBottom: 26,
    alignItems: "center",
  },
  footerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  footerText: {
    color: "#eee",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 6,
  },

  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#0faada50",
    paddingTop: 18,
    alignItems: "center",
  },
  footerBottomText: {
    color: "#eee",
    fontSize: 12,
    textAlign: "center",
  },

  todosProdutosBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffff",
    borderWidth: 2,
    borderColor: "hsla(244, 85%, 62%, 1.00)",
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignSelf: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  todosProdutosIcon: {
    width: 45,
    height: 36,
    tintColor: "#1B02A8",
    marginRight: 10,
  },
  todosProdutosTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B02A8",
    textAlign: "center",
  },
});
