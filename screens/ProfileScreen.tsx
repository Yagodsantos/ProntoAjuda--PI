// CÓDIGO CORRIGIDO COMPLETO
// -------------------------------------------

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  Switch,
} from "react-native";

import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

type ProfileScreenProps = {
  onBackHome: () => void;
};

export default function ProfileScreen({ onBackHome }: ProfileScreenProps) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  const [notifications, setNotifications] = useState(true);

  // Dados pré-denúncia
  const [formData, setFormData] = useState({
    historicoAgressao: "",
    agressorArmado: "",
    frequenciaAmeacas: "",
    dependentesNoLocal: "",
    medidasProtColocadas: "",
    localPerigoso: "",
  });

  useEffect(() => {
    async function loadData() {
      if (!user?.uid) return;

      const ref = doc(db, "pre_denuncias", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) setFormData(snap.data() as any);
    }

    loadData();
  }, []);

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "pre_denuncias", user!.uid), formData, { merge: true });
      setModalVisible(false);
      Alert.alert("Sucesso", "Informações salvas com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onBackHome();
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>

      {/* CARD DO EMAIL */}
      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email ?? "Usuário sem email"}</Text>
      </View>

      {/* CONFIGURAÇÕES */}
      <TouchableOpacity style={styles.button} onPress={() => setSettingsVisible(true)}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>

      {/* PRÉ-DENÚNCIA */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Informações para Denúncia</Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.buttonDanger} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair da Conta</Text>
      </TouchableOpacity>

      {/* VOLTAR */}
      <TouchableOpacity style={styles.buttonOutline} onPress={onBackHome}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      {/* ------------------------------- */}
      {/* MODAL CONFIGURAÇÕES             */}
      {/* ------------------------------- */}
      <Modal visible={settingsVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurações</Text>

            {/* Notificações */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Notificações</Text>
              <Switch value={notifications} onValueChange={setNotifications} />
            </View>

            {/* Privacidade */}
            <TouchableOpacity
              style={styles.subOption}
              onPress={() => {
                setSettingsVisible(false);
                setTimeout(() => setPrivacyVisible(true), 200);
              }}
            >
              <Text style={styles.subOptionText}>Privacidade</Text>
            </TouchableOpacity>

            {/* Sobre */}
            <TouchableOpacity
              style={styles.subOption}
              onPress={() => {
                setSettingsVisible(false);
                setTimeout(() => setAboutVisible(true), 200);
              }}
            >
              <Text style={styles.subOptionText}>Sobre o Aplicativo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setSettingsVisible(false)}>
              <Text style={styles.cancelText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* SOBRE */}
      <Modal visible={aboutVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sobre</Text>
            <Text style={{ color: "#ccc", marginBottom: 20 }}>
              Versão 1.0.0 {"\n"}
              Aplicativo criado para facilitar denúncias e proteger vítimas.
            </Text>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setAboutVisible(false)}>
              <Text style={styles.cancelText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* PRIVACIDADE */}
      <Modal visible={privacyVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Privacidade</Text>
            <Text style={{ color: "#ccc", marginBottom: 20 }}>
              Suas informações são armazenadas com segurança e usadas apenas quando necessário.
            </Text>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setPrivacyVisible(false)}>
              <Text style={styles.cancelText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* -------------------------------- */}
      {/* MODAL PRÉ-DENÚNCIA (PERGUNTAS)   */}
      {/* -------------------------------- */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Informações Importantes</Text>

              {Object.keys(formData).map((key) => (
                <View key={key} style={styles.questionBlock}>
                  <Text style={styles.question}>{key}</Text>
                  <TextInput
                    placeholder="Digite aqui..."
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={(formData as any)[key]}
                    onChangeText={(t) => updateField(key, t)}
                  />
                </View>
              ))}

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

//
// ESTILOS
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 24,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "bold",
  },

  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 6,
  },

  value: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#4b7bff",
    paddingVertical: 14,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },

  buttonDanger: {
    backgroundColor: "#ff4f4f",
    paddingVertical: 14,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },

  buttonOutline: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 16,
    maxHeight: "90%",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  questionBlock: {
    marginBottom: 18,
  },

  question: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
  },

  saveButton: {
    marginTop: 20,
    backgroundColor: "#4bff7b",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  saveText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },

  cancelButton: {
    marginTop: 12,
    borderColor: "#fff",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  cancelText: {
    color: "#fff",
    fontSize: 18,
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },

  settingLabel: {
    color: "#fff",
    fontSize: 18,
  },

  subOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  subOptionText: {
    color: "#4da6ff",
    fontSize: 18,
  },
});
