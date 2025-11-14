import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

type InputFieldProps = TextInputProps & {
  placeholder: string;
};

export default function InputField(props: InputFieldProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
