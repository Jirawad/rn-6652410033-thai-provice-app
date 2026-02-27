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
import WeatherWidget from "../components/weatherwidget";
import { supabase } from "../services/supabase";
import { Attraction } from "../type";

export default function AttractionsScreen() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAttractions();
  }, []);

  async function getAttractions() {
    const { data, error } = await supabase.from("attractions").select("*");
    if (data) setAttractions(data);
  }

  const openExternalMap = (lat: number, lng: number, label: string) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${label})`,
    });
    if (url) Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Attraction }) => (
    <View style={styles.card}>
      {/* รูปสถานที่ */}
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>📍 {item.name}</Text>
        <Text style={styles.addressText}>{item.address}</Text>

        <Text style={styles.sectionTitle}>พรีวิวตำแหน่ง</Text>

        {/* แสดงแผนที่จริงใน Card */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
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
              pinColor="#2ecc71"
            />
          </MapView>

          <TouchableOpacity
            style={styles.mapOverlayButton}
            onPress={() =>
              openExternalMap(item.latitude, item.longitude, item.name)
            }
          >
            <Ionicons name="navigate" size={18} color="#FFF" />
            <Text style={styles.mapOverlayText}>เปิดแอปนำทาง</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.fullScreen}>
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={28} color="#FFF" />
      </TouchableOpacity>

      <FlatList
        data={attractions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // WeatherWidget
        ListHeaderComponent={
          <View>
            <Text style={styles.mainTitle}>สถานที่ท่องเที่ยว</Text>
            <WeatherWidget />
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
    backgroundColor: "#F8F9FA",
  },
  floatingBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: "Kanit_700Bold",
    color: "#2ecc71",
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
    padding: 15,
  },
  nameText: {
    fontSize: 22,
    fontFamily: "Kanit_700Bold",
    color: "#333",
  },
  addressText: {
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    color: "#777",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Kanit_700Bold",
    color: "#2ecc71",
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
    backgroundColor: "#2ecc71",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  mapOverlayText: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: "Kanit_700Bold",
    marginLeft: 5,
  },
});
