import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "../styles";

export default function ScreenLayout({ loading, children }) {
  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator color="black" /> : children}
    </View>
  );
}