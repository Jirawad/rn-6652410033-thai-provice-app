import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Linking,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { supabase } from "../services/supabase";
import { Restaurant } from "../type"; //

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const router = useRouter();

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    // ดึงข้อมูลจากตาราง restaurants
    const { data, error } = await supabase.from("restaurants").select("*");
    if (data) {
      setRestaurants(data);
    } else {
      console.log("Error fetching restaurants:", error);
    }
  }

  const makeCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const openExternalMap = (lat: number, lng: number, label: string) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${label})`,
    });
    if (url) Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Restaurant }) => (
    <View style={styles.card}>
      {/* รูปภาพร้านอาหาร */}
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>🍴 {item.name}</Text>
        <Text style={styles.addressText}>{item.address}</Text>

        {/* ส่วนแสดงเบอร์โทรศัพท์ */}
        {item.phone && (
          <TouchableOpacity
            style={styles.phoneContainer}
            onPress={() => makeCall(item.phone)}
          >
            <Ionicons name="call" size={16} color="#e74c3c" />
            <Text style={styles.phoneText}>{item.phone}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>พิกัดร้านอาหาร</Text>

        {/* แผนที่พรีวิวภายใน Card */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            onPress={() =>
              openExternalMap(item.latitude, item.longitude, item.name)
            }
          >
            <Marker
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              pinColor="#e74c3c"
            />
          </MapView>

          <TouchableOpacity
            style={styles.mapOverlayButton}
            onPress={() =>
              openExternalMap(item.latitude, item.longitude, item.name)
            }
          >
            <Ionicons name="restaurant" size={18} color="#FFF" />
            <Text style={styles.mapOverlayText}>นำทางไปร้าน</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.fullScreen}>
      {/* ปิด Header */}
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* ปุ่มย้อนกลับขนาดเล็ก */}
      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={28} color="#FFF" />
      </TouchableOpacity>

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text style={styles.mainTitle}>ร้านอาหารยอดนิยม</Text>
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
    backgroundColor: "#FFF5F5",
  },
  floatingBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 8,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: "Kanit_700Bold",
    color: "#e74c3c",
    marginTop: 110,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    marginBottom: 25,
    overflow: "hidden",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 18,
  },
  nameText: {
    fontSize: 22,
    fontFamily: "Kanit_700Bold",
    color: "#333",
  },
  addressText: {
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    color: "#666",
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF0F0",
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  phoneText: {
    fontSize: 15,
    fontFamily: "Kanit_700Bold",
    color: "#e74c3c",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Kanit_700Bold",
    color: "#e74c3c",
    marginBottom: 8,
  },
  mapContainer: {
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlayButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#e74c3c",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  mapOverlayText: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Kanit_700Bold",
    marginLeft: 6,
  },
});
