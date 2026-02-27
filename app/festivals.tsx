import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../services/supabase";
import { Festival } from "../type"; //

export default function FestivalsScreen() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const router = useRouter();

  useEffect(() => {
    getFestivals();
  }, []);

  async function getFestivals() {
    // ดึงข้อมูลจากตาราง festivals ใน Supabase
    const { data, error } = await supabase.from("festivals").select("*");
    if (data) {
      setFestivals(data);
    } else {
      console.log("Error fetching festivals:", error);
    }
  }

  const renderItem = ({ item }: { item: Festival }) => (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 25 }}
      >
        {/* Overlay สีเข้มเพื่อให้ข้อความอ่านง่าย */}
        <View style={styles.overlay}>
          <View style={styles.monthTag}>
            <Text style={styles.monthText}>{item.month}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="calendar-outline" size={16} color="#FFF" />
              <Text style={styles.subText}>ประเพณีประจำปีจังหวัดสงขลา</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.fullScreen}>
      {/* ปิด Header ของระบบ */}
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* ปุ่มย้อน */}
      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={28} color="#FFF" />
      </TouchableOpacity>

      <FlatList
        data={festivals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerPadding}>
            <Text style={styles.mainTitle}>งานประเพณี</Text>
            <Text style={styles.subTitle}>เทศกาลและกิจกรรมสำคัญในสงขลา</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  floatingBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headerPadding: {
    marginTop: 110,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  mainTitle: {
    fontSize: 34,
    fontFamily: "Kanit_700Bold",
    color: "#e91e63",
  },
  subTitle: {
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    color: "#888",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    height: 250,
    marginBottom: 25,
    borderRadius: 25,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: "#000",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    height: "100%",
    width: "100%",
    borderRadius: 25,
    padding: 20,
    justifyContent: "space-between",
  },
  monthTag: {
    backgroundColor: "#e91e63",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 12,
  },
  monthText: {
    color: "#FFF",
    fontFamily: "Kanit_700Bold",
    fontSize: 14,
  },
  textContainer: {
    marginBottom: 5,
  },
  nameText: {
    fontSize: 24,
    fontFamily: "Kanit_700Bold",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  subText: {
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    color: "#EEE",
    marginLeft: 8,
  },
});
