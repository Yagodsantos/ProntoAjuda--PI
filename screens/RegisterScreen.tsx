import InputField from "@/components/InputField";
import PrimaryButton from "@/components/PrimaryButton";
import { auth } from "@/services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onRegisterSuccess: () => void;
  onNavigateBack: () => void;
};


export default function RegisterScreen({ onRegisterSuccess, onNavigateBack }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      onRegisterSuccess();
    } catch (err: any) {
      Alert.alert("Erro ao registrar", err?.message ?? "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <InputField placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
      <InputField placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />

      <PrimaryButton title={loading ? "Criando..." : "Registrar"} onPress={handleRegister} />

      <TouchableOpacity onPress={onNavigateBack}>
        <Text style={styles.link}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  link: { textAlign: "center", marginTop: 18, color: "#007AFF" },
});