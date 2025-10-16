import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Alert } from "react-native";
import { useState } from "react";

import SimpleBlackBarWithToggle from "@/components/SimpleBlackBarWithToggle";
import HelpButton from "@/components/HelpButton";
import TelaReceita from "./TelaReceita";

export default function HomeScreen() {
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);

  const handleToggleChange = (enabled: boolean): void => {
    if (enabled) {
      setIsToggleEnabled(true); // Ativou → muda para TelaReceita
    }
  };

  const handleHelpPress = (): void => {
    Alert.alert("Ajuda", "Sua solicitação de ajuda foi enviada!");
  };

  // Se toggle estiver ativado, renderiza a tela de receita
  if (isToggleEnabled) {
    return (
      <TelaReceita onVoltar={() => setIsToggleEnabled(false)} />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* cinteudo principal */}
      </View>

      <View style={styles.buttonContainer}>
        <HelpButton onPress={handleHelpPress} />
      </View>

      <SimpleBlackBarWithToggle onToggleChange={handleToggleChange} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00674F",
    padding: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#00674F",
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
