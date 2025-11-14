import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { auth } from "@/services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onSkipLogin: () => void;
};



export default function LoginScreen({
  onLoginSuccess,
  onNavigateToRegister,
  onSkipLogin,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onLoginSuccess();
    } catch (err: any) {
      Alert.alert("Erro ao entrar", err?.message ?? "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>

      <InputField
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <PrimaryButton title={loading ? "Entrando..." : "Entrar"} onPress={handleLogin} />

      <TouchableOpacity onPress={onNavigateToRegister}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSkipLogin}>
        <Text style={styles.skip}>Entrar sem login →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  link: { textAlign: "center", marginTop: 18, color: "#007AFF" },
  skip: { textAlign: "center", marginTop: 28, color: "#555" },
});