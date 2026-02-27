import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWeather({
        temp: 31,
        condition: "แดดจัด",
        icon: "sunny",
      });
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="#2ecc71" size="small" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.weatherInfo}>
          <Ionicons name={weather.icon as any} size={28} color="#f39c12" />
          <View style={styles.textGroup}>
            <Text style={styles.tempText}>{weather.temp}°C</Text>
            <Text style={styles.cityText}>สงขลา • {weather.condition}</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>เหมาะกับการเที่ยว</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    padding: 20,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderLeftWidth: 6,
    borderLeftColor: "#2ecc71",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  textGroup: {
    marginLeft: 12,
  },
  tempText: {
    fontSize: 22,
    fontFamily: "Kanit_700Bold",
    color: "#333",
    lineHeight: 28,
  },
  cityText: {
    fontSize: 13,
    fontFamily: "Kanit_400Regular",
    color: "#7f8c8d",
  },
  statusBadge: {
    backgroundColor: "#eafaf1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontFamily: "Kanit_700Bold",
    color: "#2ecc71",
  },
});
