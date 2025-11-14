import React, {useState} from "react";
import HomeScreen from "@/components/telaChamada";
import TelaReceita from "@/components/TelaReceita";
import LoginScreen from "@/app/(tabs)/screens/LoginScreen";
import RegisterScreen from "@/app/(tabs)/screens/RegisterScreen";

export default function Index() {
  const [screen, setScreen] = useState("login");

  const goToHome = () => setScreen("home");
  const goToRegister = () => setScreen("register");
  const backToLogin = () => setScreen("login");

  if (screen === "login") {
    return (
      <LoginScreen
        onLoginSuccess={goToHome}
        onNavigateToRegister={goToRegister}
        onSkipLogin={goToHome}      // ➜ ENTRAR SEM LOGIN
      />
    );
  }

  if (screen === "register") {
    return (
      <RegisterScreen
        onRegisterSuccess={goToHome}
        onNavigateBack={backToLogin}
      />
    );
  }

  return <HomeScreen />;
}