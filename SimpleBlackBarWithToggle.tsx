import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onToggleChange: (enabled: boolean) => void; 
  initialValue?: boolean;
};

export default function ModeSelector({ onToggleChange, initialValue = false }: Props) {
  const [isWeather, setIsWeather] = useState(initialValue);

  const toggleMode = () => {
    const newValue = !isWeather;
    setIsWeather(newValue);
    onToggleChange(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>

      
        <TouchableOpacity
          style={[styles.toggle, isWeather && styles.toggleOn]}
          onPress={toggleMode}
        >
          <View style={[styles.knob, isWeather && styles.knobOn]} />
        </TouchableOpacity>
        <MaterialCommunityIcons
          name={isWeather ? "weather-partly-cloudy" : "food"}
          size={40}
          color="#808080ff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  toggle: {
    width: 55,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#ccc",
    padding: 3,
    justifyContent: "center",
  },
  toggleOn: {
    backgroundColor: "#4CAF50",
  },

  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginLeft: 0,
  },
  knobOn: {
    marginLeft: 25,
  },
});
