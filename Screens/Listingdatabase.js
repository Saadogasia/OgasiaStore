import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../components/Card";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import { db } from "../config/firebase";
import color from "../config/color";

function Listingdatabase({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(documents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "Products", id));
              Alert.alert("Success", "Item deleted successfully!");
              fetchData(); // Refresh data after delete
            } catch (error) {
              console.error("Error deleting item: ", error);
              Alert.alert(
                "Error",
                "Failed to delete item. Please try again later."
              );
            }
          },
        },
      ]
    );
  };

  const handleUpdate = async (id, quantityToAdd) => {
    try {
      const productRef = doc(db, "Products", id);
      const productDoc = await getDoc(productRef);
      const currentQuantity = productDoc.data().quantity;
      const updatedQuantity =
        parseInt(currentQuantity) + parseInt(quantityToAdd);

      await updateDoc(productRef, {
        quantity: updatedQuantity,
      });
      Alert.alert("Success", "Item updated successfully!");
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating item: ", error);
      Alert.alert("Error", "Failed to update item. Please try again later.");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredData([]);
  };

  if (loading) {
    return (
      <Screen style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search "
          value={searchQuery}
          onChangeText={handleSearch}
          blurOnSubmit={false}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <MaterialCommunityIcons name="close" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={filteredData.length > 0 ? filteredData : data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            name={item.name}
            description={item.description}
            images={item.images}
            quantity={item.quantity}
            onPress={() =>
              navigation.navigate(routes.LISTING_DETAILS, {
                ...item,
                purchasedate: item.purchasedate,
                purchaseprice: item.purchaseprice,
                sellprice: item.sellprice,
                quantity: item.quantity,
              })
            }
            onDelete={() => handleDelete(item.id)}
            onUpdate={(quantityToAdd) => handleUpdate(item.id, quantityToAdd)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: color.light,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.light,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft: 10, // Added margin to separate from clear button
  },
  clearButton: {
    padding: 10,
  },
});

export default Listingdatabase;
