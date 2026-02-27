import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { JSX } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WeatherWidget from "../components/weatherwidget";

const { width } = Dimensions.get("window");

export default function HomeScreen(): JSX.Element {
  const navigateTo = (path: any) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* พื้นหลัง */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>ยินดีต้อนรับสู่</Text>
            <Text style={styles.provinceText}>จังหวัดสงขลา</Text>
          </View>
          {/* ไอคอน */}
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={40}
            color="#2ecc71"
          />
        </View>

        {/* Weather Widget */}
        <WeatherWidget />

        <View style={styles.menuGrid}>
          <MenuCard
            title="สถานที่ท่องเที่ยว"
            icon="map-marked-alt"
            color="#2ecc71"
            onPress={() => navigateTo("/attractions")}
          />

          <MenuCard
            title="ร้านอาหาร"
            icon="utensils"
            color="#e74c3c"
            onPress={() => navigateTo("/restaurants")}
          />

          <MenuCard
            title="ร้านกาแฟ"
            icon="coffee"
            color="#f39c12"
            onPress={() => navigateTo("/cafes")}
          />

          <MenuCard
            title="วัด / ศาสนสถาน"
            icon="place-of-worship"
            color="#9b59b6"
            onPress={() => navigateTo("/temples")}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.fullWidthCard, { backgroundColor: "#e91e63" }]}
            onPress={() => navigateTo("/festivals")}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="calendar-star"
                size={28}
                color="#e91e63"
              />
            </View>
            <Text style={styles.fullWidthCardText}>งานประเพณีประจำปี</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

type MenuCardProps = {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
};

const MenuCard = ({
  title,
  icon,
  color,
  onPress,
}: MenuCardProps): JSX.Element => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={[styles.card, { backgroundColor: color }]}
    onPress={onPress}
  >
    <View style={styles.cardInnerDecoration} />
    <FontAwesome5 name={icon} size={32} color="#ffffff" />
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  circleTopRight: {
    position: "absolute",
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width,
    backgroundColor: "#2ecc71",
    opacity: 0.03,
    top: -80,
    right: -80,
  },
  circleBottomLeft: {
    position: "absolute",
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width,
    backgroundColor: "#f1c40f",
    opacity: 0.03,
    bottom: -50,
    left: -50,
  },
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    color: "#7f8c8d",
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
  },
  provinceText: {
    color: "#2ecc71",
    fontSize: 32,
    fontFamily: "Kanit_700Bold",
    marginTop: -5,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  card: {
    width: "47%",
    height: 140,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  cardInnerDecoration: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    top: -15,
    right: -15,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Kanit_700Bold",
    marginTop: 12,
    textAlign: "center",
  },
  fullWidthCard: {
    width: "100%",
    height: 85,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 5,
    elevation: 4,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthCardText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Kanit_700Bold",
    marginLeft: 15,
  },
});
