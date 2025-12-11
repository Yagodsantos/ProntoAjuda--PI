import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Receita } from "@/utils/types";

type Props = {
  meal: Receita;
  onPress?: (meal: Receita) => void;
  onEmergencyTrigger?: (meal: Receita) => void;
};

export default function CardReceitas({
  meal,
  onPress,
  onEmergencyTrigger,
}: Props) {
  const handleLongPress = () => {
    onEmergencyTrigger?.(meal);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: randomPastelColor(meal.id) }
      ]}
      onPress={() => onPress?.(meal)}
    >
      <TouchableWithoutFeedback onLongPress={handleLongPress}>
        <View>
          <Image source={{ uri: meal.imagem }} style={styles.thumb} />
          <View style={styles.overlay} />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.info}>
        <Text style={styles.title}>{meal.nome}</Text>
        <Text style={styles.category}>
          {meal.categoria} • {meal.area}
        </Text>
      </View>
    </TouchableOpacity>
  );
}


function randomPastelColor(seed: string) {
  const num = seed.charCodeAt(0) * 13;
  const colors = [
    "#FFE5EC",
    "#E8F3FF",
    "#FDF2CE",
    "#E9FFE7",
    "#F2E9FF",
    "#FFEFE2",
  ];
  return colors[num % colors.length];
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    elevation: 3,
  },
  thumb: {
    width: "100%",
    height: 150,
    backgroundColor: "#ddd",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.20)",
  },
  info: {
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },
  category: {
    color: "#444",
    marginTop: 4,
    fontSize: 13,
  },
});
