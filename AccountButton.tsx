import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";

type AccountButtonProps = {
  onPressLogin: () => void;
  onPressAccount: () => void;
};

export default function AccountButton({
  onPressLogin,
  onPressAccount,
}: AccountButtonProps) {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={user ? onPressAccount : onPressLogin}
    >
      <Text style={styles.text}>
        {user ? `Conta (${user.email})` : "Entrar"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 12,
    marginRight: 16,
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
