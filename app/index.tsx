import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const logo = require("../assets/images/songkhla.jpg");

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/home");
    }, 4000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/*Animated.View */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        {/* container */}
        <View style={styles.imageShadow}>
          <Image source={logo} style={styles.logo} />
        </View>

        <Text style={styles.title}>Songkhla Travel</Text>
        <Text style={styles.caption}>เสน่ห์เมืองเก่า และทะเลสาบสองฝั่ง</Text>
      </Animated.View>

      {/* ไอคอนหมุน */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 80,
  },
  imageShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 12,
    marginBottom: 30,
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0056b3",
  },
  title: {
    fontFamily: "Kanit_700Bold",
    fontSize: 34,
    color: "#003366",
    textAlign: "center",
  },
  caption: {
    fontFamily: "Kanit_400Regular",
    fontSize: 18,
    color: "#555",
    marginTop: 12,
    textAlign: "center",
  },
  loadingContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#0056b3",
    marginTop: 8,
  },
});
