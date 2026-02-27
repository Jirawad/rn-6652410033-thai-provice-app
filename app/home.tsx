import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { JSX } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen(): JSX.Element {
  const navigateTo = (path: any) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      {/* พื้นหลังลูกเล่น */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>ยินดีต้อนรับสู่</Text>
          <Text style={styles.provinceText}>จังหวัดสงขลา</Text>
        </View>

        <View style={styles.menuGrid}>
          {/* 1. สถานที่ท่องเที่ยว */}
          <MenuCard
            title="สถานที่ท่องเที่ยว"
            icon="map-marked-alt"
            color="#2ecc71"
            onPress={() => navigateTo("/attractions")}
          />

          {/* 2. ร้านอาหาร */}
          <MenuCard
            title="ร้านอาหาร"
            icon="utensils"
            color="#e74c3c"
            onPress={() => navigateTo("/restaurants")}
          />

          {/* 3. ร้านกาแฟ/ของหวาน */}
          <MenuCard
            title="ร้านกาแฟ"
            icon="coffee"
            color="#f39c12"
            onPress={() => navigateTo("/cafes")}
          />

          {/* 4. วัด/ศาสนสถาน */}
          <MenuCard
            title="วัด / ศาสนสถาน"
            icon="place-of-worship"
            color="#9b59b6"
            onPress={() => navigateTo("/temples")}
          />

          {/* 5. งานประเพณี */}
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
    <FontAwesome5 name={icon} size={35} color="#ffffff" />
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  circleTopRight: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: "#0099ff",
    opacity: 0.08,
    top: -50,
    right: -100,
  },
  circleBottomLeft: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: "#f1c40f",
    opacity: 0.06,
    bottom: 0,
    left: -50,
  },
  header: {
    backgroundColor: "#1abc9c",
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 20,
    elevation: 20,
    shadowColor: "#1abc9c",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
    opacity: 0.9,
  },
  provinceText: {
    color: "#fff",
    fontSize: 34,
    fontFamily: "Kanit_700Bold",
    marginTop: 5,
    letterSpacing: 0.5,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    width: "47%",
    height: 150,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    overflow: "hidden",
  },
  cardInnerDecoration: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    top: -20,
    right: -20,
  },
  cardText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Kanit_700Bold",
    marginTop: 15,
    textAlign: "center",
  },
  fullWidthCard: {
    width: "100%",
    height: 90,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 5,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthCardText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Kanit_700Bold",
    marginLeft: 20,
  },
});
