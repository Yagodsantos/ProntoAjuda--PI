import React, { useState, useEffect } from "react";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleBlackBarWithToggle from "@/components/SimpleBlackBarWithToggle";
import CardReceitas from "@/components/CardReceita";
import { Receita } from "@/utils/types"; // importa o tipo Receita

type Props = {
  onVoltar: () => void;
};

export default function TelaReceita({ onVoltar }: Props) {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [quantidadeExibida, setQuantidadeExibida] = useState<number>(5);
  const [receitaSelecionada, setReceitaSelecionada] = useState<Receita | null>(
    null
  );

  // tipando explicitamente o array
  const receitasFixas: Receita[] = [
    {
      id: "1",
      nome: "Omelete Simples",
      categoria: "Café da manhã",
      area: "Brasil",
      instrucoes:
        "Bata dois ovos com sal e pimenta. Aqueça uma frigideira com manteiga, despeje os ovos e cozinhe até firmar. Dobre ao meio e sirva quente.",
      ingredientes: ["2 ovos", "Sal", "Pimenta", "1 colher de manteiga"],
      imagem:
        "https://www.receiteria.com.br/wp-content/uploads/omelete-simples.jpeg",
    },
    {
      id: "2",
      nome: "Macarrão ao Alho e Óleo",
      categoria: "Almoço",
      area: "Itália",
      instrucoes:
        "Cozinhe o macarrão até ficar al dente. Em uma panela, refogue alho no azeite, junte o macarrão e misture bem. Finalize com salsa e queijo ralado.",
      ingredientes: [
        "200g de macarrão",
        "2 dentes de alho",
        "Azeite de oliva",
        "Salsa e queijo a gosto",
      ],
      imagem:
        "https://tse2.mm.bing.net/th/id/OIP.ZAOepNBWE0332NHuoUL_HwHaD4?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: "3",
      nome: "Bolo de Cenoura com Cobertura de Chocolate",
      categoria: "Sobremesa",
      area: "Brasil",
      instrucoes:
        "Bata no liquidificador cenoura, ovos e óleo. Misture com farinha e açúcar. Asse até dourar e cubra com calda de chocolate.",
      ingredientes: [
        "3 cenouras",
        "3 ovos",
        "2 xícaras de farinha",
        "1 xícara de açúcar",
        "Chocolate em pó",
      ],
      imagem:
        "https://images.unsplash.com/photo-1587306433599-44cd81cbde86?auto=format&fit=crop&q=80&w=870",
    },
    {
      id: "4",
      nome: "Frango Grelhado com Legumes",
      categoria: "Jantar",
      area: "Brasil",
      instrucoes:
        "Tempere o frango e grelhe até dourar. Sirva com legumes grelhados no azeite de oliva.",
      ingredientes: [
        "Peito de frango",
        "Cenoura",
        "Brócolis",
        "Azeite",
        "Sal e pimenta",
      ],
      imagem:
        "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=869",
    },
    {
      id: "5",
      nome: "Panqueca Doce de Banana",
      categoria: "Sobremesa",
      area: "Brasil",
      instrucoes:
        "Amasse a banana, misture com o ovo e a aveia. Cozinhe em frigideira antiaderente até dourar dos dois lados. Sirva com mel.",
      ingredientes: ["1 banana madura", "1 ovo", "2 colheres de aveia", "Mel a gosto"],
      imagem:
        "https://images.unsplash.com/photo-1590137869152-5da5e617667e?auto=format&fit=crop&q=80&w=870",
    },
    {
      id: "6",
      nome: "Sopa de Legumes",
      categoria: "Jantar",
      area: "Brasil",
      instrucoes:
        "Cozinhe batata, cenoura, abobrinha e chuchu com caldo de legumes. Bata parcialmente e sirva quente.",
      ingredientes: [
        "Batata",
        "Cenoura",
        "Abobrinha",
        "Chuchu",
        "Caldo de legumes",
      ],
      imagem:
        "https://images.unsplash.com/photo-1643786661490-966f1877effa?auto=format&fit=crop&q=80&w=870",
    },
  ];

  // embaralhar a lista
  useEffect(() => {
    const embaralhadas = [...receitasFixas].sort(() => Math.random() - 0.5);
    setReceitas(embaralhadas);
  }, []);

  const receitasVisiveis = receitas.slice(0, quantidadeExibida);

  const handleMostrarMais = () => {
    if (quantidadeExibida < receitas.length) {
      setQuantidadeExibida((q) => q + 5);
    } else {
      Alert.alert("Fim da lista", "Você já viu todas as receitas!");
    }
  };

  const handleOpenRecipe = (meal: Receita) => {
    setReceitaSelecionada(meal); // abre o modo de preparo
  };

  const handleEmergencyTrigger = (meal: Receita) => {
    Alert.alert("Receita salva", "Receita adicionada aos favoritos!");
  };

  const handleVoltarLista = () => {
    setReceitaSelecionada(null); // volta para lista
  };

  
  if (receitaSelecionada) {
    return (
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.detalheContainer}>
            <Text style={styles.titulo}>{receitaSelecionada.nome}</Text>
            <Image
              source={{ uri: receitaSelecionada.imagem }}
              style={styles.imagemDetalhe}
            />
            <Text style={styles.subtitulo}>Ingredientes:</Text>
            {receitaSelecionada.ingredientes.map((item: string, index: number) => (
              <Text key={index} style={styles.itemIngrediente}>
                • {item}
              </Text>
            ))}

            <Text style={styles.subtitulo}>Modo de Preparo:</Text>
            <Text style={styles.instrucoes}>{receitaSelecionada.instrucoes}</Text>

            <View style={{ marginVertical: 20 }}>
              <Button title="Voltar às receitas" onPress={handleVoltarLista} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>Receitas em Destaque</Text>
            <Text style={styles.headerSubtitle}>Escolhidas especialmente para você</Text>
          </View>

          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png" }}
            style={styles.headerAvatar}
          />
        </View>

        <FlatList
          data={receitasVisiveis}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardReceitas
              meal={item}
              onPress={handleOpenRecipe}
              onEmergencyTrigger={handleEmergencyTrigger}
            />
          )}
          ListFooterComponent={
            <View style={{ marginVertical: 16 }}>
              <Button title="Ver mais receitas" onPress={handleMostrarMais} />
            </View>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      <SimpleBlackBarWithToggle
        initialValue={true}
        onToggleChange={(enabled) => {
          if (!enabled) onVoltar();
        }}
      />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginVertical: 16,
    textAlign: "center",
  },
  detalheContainer: {
    padding: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
  imagemDetalhe: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 6,
    color: "#444",
  },
  itemIngrediente: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  instrucoes: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginTop: 4,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 6,
    backgroundColor: "#d8fdfdff",
    borderRadius: 14,
    marginTop: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },

  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#eee",
  },
});

