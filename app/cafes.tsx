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
import { Coffee } from "../type";
// WeatherWidget
import WeatherWidget from "../components/weatherwidget";

export default function CafesScreen() {
  const [cafes, setCafes] = useState<Coffee[]>([]);
  const router = useRouter();

  useEffect(() => {
    getCafes();
  }, []);

  async function getCafes() {
    const { data, error } = await supabase.from("coffee").select("*");
    if (data) {
      setCafes(data);
    } else {
      console.log("Error fetching cafes:", error);
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

  const renderItem = ({ item }: { item: Coffee }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>☕ {item.name}</Text>
        <Text style={styles.addressText}>{item.address}</Text>

        {item.phone && (
          <TouchableOpacity
            style={styles.phoneContainer}
            onPress={() => makeCall(item.phone)}
          >
            <Ionicons name="call" size={16} color="#f39c12" />
            <Text style={styles.phoneText}>{item.phone}</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>พิกัดร้าน</Text>

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
              pinColor="#f39c12"
            />
          </MapView>

          <TouchableOpacity
            style={styles.mapOverlayButton}
            onPress={() =>
              openExternalMap(item.latitude, item.longitude, item.name)
            }
          >
            <Ionicons name="location" size={18} color="#FFF" />
            <Text style={styles.mapOverlayText}>นำทาง</Text>
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
        data={cafes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // WeatherWidget
        ListHeaderComponent={
          <View>
            <Text style={styles.mainTitle}>ร้านกาแฟแนะนำ</Text>
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
    backgroundColor: "#FDF7F0",
  },
  floatingBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f39c12",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 8,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: "Kanit_700Bold",
    color: "#f39c12",
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
    color: "#4a3728",
  },
  addressText: {
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    color: "#8e735b",
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFF8F0",
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  phoneText: {
    fontSize: 15,
    fontFamily: "Kanit_700Bold",
    color: "#f39c12",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Kanit_700Bold",
    color: "#f39c12",
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
    backgroundColor: "#f39c12",
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
