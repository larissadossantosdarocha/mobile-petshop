import { router, useLocalSearchParams } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { posts } from "../assets/mockups/posts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(75, 235, 88, 1)",
    padding: 16,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
    color: "rgba(191, 201, 51, 1)",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "rgba(235, 147, 75, 1)",
    marginBottom: 10,
  },
  imagem: {
    width: "100%",
    height: 200,  // Adjusted to a fixed height for better control
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default function Index() {
  const { id } = useLocalSearchParams();
  let indice = posts.findIndex((post) => post.id === Number(id));

  if (indice === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Post not found</Text>
        <Text style={styles.text}>Sorry, we couldn't find the post you're looking for.</Text>
        <Button
          title="Voltar"
          color="rgba(235, 75, 227, 1)"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{posts[indice].title}</Text>
      <Text style={styles.text}>{posts[indice].content}</Text>
      {posts[indice].image && (
        <Image source={{ uri: posts[indice].image }} style={styles.imagem} />
      )}
      <Button
        title="Voltar"
        color="rgba(235, 75, 75, 1)"
        onPress={() => router.back()}
      />
    </View>
  );
}
