import React, { useState } from "react";
import HomeScreen from "@/components/telaChamada";
import LoginScreen from "@/app/(tabs)/screens/LoginScreen";
import RegisterScreen from "@/app/(tabs)/screens/RegisterScreen";
import ProfileScreen from "@/app/(tabs)/screens/ProfileScreen";

export default function Index() {
  const [screen, setScreen] = useState<"login" | "home" | "register" | "account">("login");

  const goToLogin = () => setScreen("login");
  const goToHome = () => setScreen("home");
  const goToRegister = () => setScreen("register");
  const goToAccount = () => setScreen("account");

  // tela de login
  if (screen === "login") {
    return (
      <LoginScreen
        onLoginSuccess={goToHome}
        onNavigateToRegister={goToRegister}
        onSkipLogin={goToHome}
      />
    );
  
}

  // Tela de cadastro
  if (screen === "register") {
    return (
      <RegisterScreen
        onRegisterSuccess={goToHome}
        onNavigateBack={goToLogin}
      />
    );
  }

  // Tela de perfil
  if (screen === "account") {
    return <ProfileScreen onBackHome={goToHome} />;
  }


  return (
    <HomeScreen
      onOpenLogin={() => setScreen("login")}
      onOpenAccount={goToAccount}
    />
  );
} 
  
