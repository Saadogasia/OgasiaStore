import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../components/Screen";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

function ListingdetailsScreen({ route }) {
  const [product, setProduct] = useState(null);

  // Function to fetch product data
  const fetchProduct = async (productId) => {
    try {
      const docRef = doc(db, "Products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Fetch product data when the screen gains focus
  useFocusEffect(() => {
    fetchProduct(route.params.id); // Assuming route.params has the product id
  });

  if (!product) {
    return (
      <Screen style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </Screen>
    );
  }

  const {
    name,
    description,
    images,
    purchasedate,
    purchaseprice,
    sellprice,
    quantity,
  } = product;

  return (
    <Screen style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: images[0] }} style={styles.image} />
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>Descreption: {description}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Purchase Price:</Text>
              <Text style={styles.info}>₹{purchaseprice}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Sell Price:</Text>
              <Text style={styles.info}>₹{sellprice}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Quantity:</Text>
              <Text style={styles.info}>{quantity}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    color: "gray",
  },
  infoContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  info: {
    fontSize: 16,
    color: "black",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListingdetailsScreen;
