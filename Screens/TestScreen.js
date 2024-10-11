import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const TestScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const items = querySnapshot.docs.map((doc) => doc.data());
      setProducts(items);
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      {products.map((product, index) => (
        <Text key={index} style={styles.productText}>
          {product.name}
          {product.descreption}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  productText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default TestScreen;
