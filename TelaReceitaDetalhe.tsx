import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Receita = {
  id: string;
  nome: string;
  categoria: string;
  area: string;
  instrucoes: string;
  ingredientes: string[];
  imagem: string;
};

type Props = {
  receita: Receita;
  onVoltar: () => void;
};

export default function TelaReceitaDetalhada({ receita, onVoltar }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>{receita.nome}</Text>

        <Image source={{ uri: receita.imagem }} style={styles.imagem} />

        <Text style={styles.subinfo}>
          {receita.categoria} • {receita.area}
        </Text>

        <Text style={styles.subtitulo}>Ingredientes:</Text>
        {receita.ingredientes.map((item, index) => (
          <Text key={index} style={styles.itemIngrediente}>
            • {item}
          </Text>
        ))}

        <Text style={styles.subtitulo}>Modo de preparo:</Text>
        <Text style={styles.instrucoes}>{receita.instrucoes}</Text>
        <View style={styles.botaoVoltar}>
          <Button title="Voltar às receitas" onPress={onVoltar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 12,
  },
  imagem: {
    width: "100%",
    height: 230,
    borderRadius: 12,
    marginBottom: 16,
  },
  subinfo: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 6,
  },
  itemIngrediente: {
    fontSize: 16,
    color: "#444",
    marginLeft: 4,
    marginBottom: 4,
  },
  instrucoes: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginTop: 4,
  },
  botaoVoltar: {
    marginTop: 24,
    marginBottom: 16,
  },
});
