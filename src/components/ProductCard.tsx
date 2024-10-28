import React from 'react';
import isEqual from 'react-fast-compare';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Product } from '../types';
import { purchaseProduct, removeProduct } from '../store/cartSlice';
import Rating from './Rating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handlePurchase = React.useCallback(() => {
    dispatch(purchaseProduct(product));
  }, []);

  const handleRemoveProduct = React.useCallback((productId: number) => {
    dispatch(removeProduct(productId));
  }, []);

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode='contain' />
      <View style={styles.setColumn}>
        <View style={styles.setGap}>
          <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
          <Text numberOfLines={3} style={styles.description}>{product.description}</Text>
        </View>
        <Rating rating={product?.rating} />
        <View style={styles.footer}>
          <Text style={styles.price}>{product.price}</Text>
          {product.quantity ? (
            <>
              <Button title="+" onPress={handlePurchase} />
              <Text style={styles.quantity}>Qty: {product.quantity}</Text>
              <Button title="-" onPress={() => handleRemoveProduct(product.id)} />
            </>
          ) : (
            <Button title="Buy" onPress={handlePurchase} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    gap: 10,
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '40%',
    height: 150,
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  setColumn: { width: '55%', justifyContent: "space-between" },
  setGap: { gap: 5 }
});

export default React.memo(ProductCard, isEqual);

