import { View, Text, StyleSheet } from "react-native";
import SimpleBlackBarWithToggle from "@/components/SimpleBlackBarWithToggle";

type Props = {
  onVoltar: () => void;
};

export default function TelaReceita({ onVoltar }: Props) {
  const handleToggleChange = (enabled: boolean) => {
    if (!enabled) {
      onVoltar(); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽 MASSA COM RASPA DE PÉ</Text>
      <Text style={styles.text}>
        Preparada com pé maturado na botina por 7 dias 🤤
      </Text>

      <SimpleBlackBarWithToggle
        initialValue={true}
        onToggleChange={handleToggleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b2e5a",
    padding: 24,
    justifyContent: "center",
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: "white",
    marginBottom: 24,
  },
});
