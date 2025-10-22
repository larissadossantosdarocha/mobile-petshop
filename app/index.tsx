import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View,Text,Image,ScrollView,StyleSheet,TouchableOpacity,Dimensions,useWindowDimensions,} from "react-native";

export default function Index() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { width } = useWindowDimensions();

  const banners = [
    { text: "Frete fixo de R$10,00 para todo o Brasil", color: "#1E90FF" },
    { text: "Compras acima de R$100,00 ganham um brinde", color: "#5e6effff" },
  ];

  const carouselImages = [
    require("../assets/images/racao.gif"),
    require("../assets/images/petisco.gif"),
    require("../assets/images/tosa.gif"),
  ];

  const produtos = [
    { id: 1, nome: "Ração Premium", imagem: require("../assets/images/premium.jpeg") },
    { id: 2, nome: "Petisco Saudável", imagem: require("../assets/images/petiscos.jpeg") },
    { id: 3, nome: "Kit Higiene", imagem: require("../assets/images/banho.jpeg") },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.secondHeader}>
          <HeaderButton
            label="Consulta"
            image={require("../assets/images/veterinario.gif")}
            route="/consulta/consulta"
          />
          <HeaderButton
            label="Adoção"
            image={require("../assets/images/salve-os-animais.gif")}
            route="/adocao/adocao"
          />
          <HeaderButton
            label="Doações"
            image={require("../assets/images/doacao.gif")}
            route="/doacao/doacao"
          />
          <HeaderButton
            label="Cadastrar"
            image={require("../assets/images/cadastro.gif")}
            route="/auth/cadastrar"
          />
        </View>

        <View style={styles.anuncios}>
          <AnuncioCard
            image={require("../assets/images/doacao.gif")}
            title="Brinquedos que fazem a diferença!"
            text="Doe e ajude a levar felicidade para quem mais precisa."
          />
          <AnuncioCard
            image={require("../assets/images/veterinario.gif")}
            title="Consulta para pets:"
            text="Amor e saúde em cada ponto!"
          />
          <AnuncioCard
            image={require("../assets/images/salve-os-animais.gif")}
            title="Amor e cuidado para seu pet!"
            text="Faça a vida de um animalzinho feliz hoje! Adote um pet!"
          />
        </View>

        <View style={[styles.banner, { backgroundColor: banners[bannerIndex].color }]}>
          <Text style={styles.bannerText}>{banners[bannerIndex].text}</Text>
        </View>

        <View style={styles.carouselWrapper}>
          <Image
            source={carouselImages[carouselIndex]}
            style={[styles.carouselImage, { width: width * 0.8 }]}
          />

          <View style={styles.dotsContainer}>
            {carouselImages.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.dot, carouselIndex === i && styles.activeDot]}
                onPress={() => setCarouselIndex(i)}
              />
            ))}
          </View>
        </View>

        <View style={styles.juros}>
          <CardInfo
            image={require("../assets/images/relogio.png")}
            title="Receba em algumas horas!"
            text="Confira as regras ->"
          />
          <CardInfo
            image={require("../assets/images/cartao.png")}
            title="Parcele em 3x sem juros!"
            text="Confira as regras ->"
          />
          <CardInfo
            image={require("../assets/images/entrega-rapida.png")}
            title="Frete Grátis!"
            text="Confira as regras ->"
          />
          <CardInfo
            image={require("../assets/images/petshop.png")}
            title="Retire e troque na loja!"
            text="Confira as regras ->"
          />
        </View>

        <View style={styles.produtosSection}>
          <Text style={styles.produtosTitle}>Produtos Recomendados:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.produtosScroll}
          >
            {produtos.map((p) => (
              <View key={p.id} style={[styles.produtoCard, { width: width > 500 ? 160 : 140 }]}>
                <Image source={p.imagem} style={styles.produtoImg} />
                <Text style={styles.produtoNome}>{p.nome}</Text>
                <TouchableOpacity style={styles.produtoBtn}>
                  <Text style={styles.produtoBtnText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriasSection}>
  <Text style={styles.sectionTitle}>Categorias:</Text>
  <View style={styles.categoriasRow}>
    <CategoriaButton
      label="Cachorros"
      image={require("../assets/images/cachorro.gif")}
    />
    <CategoriaButton
      label="Gatos"
      image={require("../assets/images/gato.gif")}
    />
    <CategoriaButton
      label="Outros Pets"
      image={require("../assets/images/peixe-palhaco.gif")}
    />
    <CategoriaButton
      label="Farmacia"
      image={require("../assets/images/farmacia.gif")}
    />
  </View>
</View>

        <View style={styles.cuidados}>
          <View style={styles.cuidadoCard}>
            <Text style={styles.cuidadoTitle}>Banho & Tosa</Text>
            <Text style={styles.cuidadoText}>
              Higiene e Conforto para o seu melhor amigo!
            </Text>
            <Image
              source={require("../assets/images/banho-tosa-pet-shop.jpg")}
              style={styles.cuidadoImg}
            />
          </View>

          <View style={styles.cuidadoCard}>
            <Text style={styles.cuidadoTitle}>Veterinário</Text>
            <Text style={styles.cuidadoText}>
              A saúde de seu pet, a sua prioridade
            </Text>
            <Image
              source={require("../assets/images/veterinario.png")}
              style={styles.cuidadoImg}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardInfoTitle}>{title}</Text>

        <TouchableOpacity onPress={() => router.push("/consulta/confira")}>
          <Text style={styles.cardInfoTextLink}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function CategoriaButton({ label, image, route }: any) {
  return (
    <TouchableOpacity
      style={styles.categoriaBtn}
    >
      <Image source={image} style={styles.categoriaImg} />
      <Text style={styles.categoriaText}>{label}</Text>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  secondHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#b0e9ffff",
    paddingVertical: 10,
  },
  headerBtn: { alignItems: "center", width: 60 },
  headerBtnImage: { width: 30, height: 30, marginBottom: 6, borderRadius: 15 },
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
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 12,
  },
  bannerText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  carouselWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    width: "100%",
  },
  carouselImage: {
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    width: "100%",
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: { backgroundColor: "#1E90FF" },
  produtosSection: { marginVertical: 20, paddingHorizontal: 10 },
  produtosTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c80ffff",
    marginBottom: 10,
  },
  produtosScroll: { flexDirection: "row" },
  produtoCard: {
    marginRight: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  produtoImg: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  produtoNome: { fontSize: 14, fontWeight: "600", marginBottom: 6, textAlign: "center" },
  produtoBtn: {
    backgroundColor: "#2c80ffff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  produtoBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  categoriasSection: { marginVertical: 20, paddingHorizontal: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10, color: "#2c80ffff" },
  categoriasRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 12,
    marginVertical: 10,
  },
  categoriaBtn: {
    width: "30%",
    minWidth: 100,
    margin: 6,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#4BC5EB",
  },
  categoriaImg: { width: 40, height: 40, marginBottom: 6 },
  categoriaText: { fontSize: 12, fontWeight: "600", textAlign: "center" },

  cuidados: {
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: 12,
  },
  cuidadoCard: {
    width: 180,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#eef7fb",
    alignItems: "center",
  },
  cuidadoTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  cuidadoText: { fontSize: 14, marginBottom: 10, textAlign: "center" },
  cuidadoImg: { width: "100%", height: 160, borderRadius: 10 },
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
  cardTextContainer: { flex: 1, flexWrap: "wrap" },
  cardInfoTitle: { fontWeight: "bold", color: "#444", fontSize: 14 },
  cardInfoTextLink: {
    color: "#4BC5EB",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
  },
});