import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🍽 MASSA COM RASPA DE PÉ</Text>
        <Text style={styles.text}>
          Preparada com pé maturado na botina por 7 dias 🤤
        </Text>

        
      </View>

      <SimpleBlackBarWithToggle
        initialValue={true}
        onToggleChange={handleToggleChange}
      />
      
    </SafeAreaView>

    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#3b2e5a",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#3b2e5a",
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
