import React from "react";
import { View, StyleSheet, Text } from "react-native";

function Card({ purchasedate, purchaseprice, sellprice, quantity }) {
  return (
    <View>
      <View style={styles.deatilcontainer}>
        <Text style={styles.purchasedate}>PurchaseDate : {purchasedate}</Text>
        <Text style={styles.purchaseprice}>
          PurchasePrice : {purchaseprice}
        </Text>
        <Text style={styles.sellprice}>SellPrice : {sellprice}</Text>
        <Text style={styles.quantity}>Quantity : {quantity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deatilcontainer: {
    padding: 20,
  },
  purchasedate: {
    fontSize: 20,
    marginBottom: 5,
  },
  purchaseprice: {
    fontSize: 20,
    marginBottom: 5,
  },
  sellprice: {
    fontSize: 20,
    marginBottom: 5,
  },
  quantity: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default Card;
