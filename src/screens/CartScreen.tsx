import React, { useCallback } from 'react';
import { FlatList, View, StyleSheet, Alert, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProductCard from '../components/ProductCard';
import CheckoutButton from '../components/CheckoutButton';
import EmptyCart from '../components/EmptyCart';

const CartScreen: React.FC = () => {
  const purchasedProducts = useSelector((state: RootState) => state.cart.purchasedProducts);
  const cartCount = React.useMemo(() => purchasedProducts.reduce((total, product) => total + product.quantity, 0), [purchasedProducts]);
  const cartValue = React.useMemo(() => purchasedProducts.reduce((total, product) => total + (product.quantity * product.price), 0).toFixed(2), [purchasedProducts]);

  const handleCheckout = useCallback(() => {
    Alert.alert("Checkout", `Thank you for shopping with us!!! For your ${cartCount} items, cart value is ${cartValue}`)
  }, [cartCount, cartValue])

  return (
    <View style={styles.container}>
      <FlatList
        data={purchasedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={<EmptyCart />}
        contentContainerStyle={styles.listContent}
      />

      {purchasedProducts.length ?
        <View style={styles.footer}>
          <Text style={styles.fontStyle1}>Total Cart Value <Text style={styles.fontStyle2}>{cartValue}</Text></Text>
          <CheckoutButton onCheckOut={handleCheckout} />
        </View>
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  listContent: {
    paddingBottom: 110
  },
  fontStyle1: { fontSize: 16, textAlign: 'right' },
  fontStyle2: { fontSize: 18, fontWeight: 'bold' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
  }
});

export default CartScreen;
