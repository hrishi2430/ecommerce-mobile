import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import useFetchProducts from '../hooks/useFetchProducts';
import { RootState } from '../store/store';

const ProductListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { products, loading, error } = useFetchProducts();

  const cartProducts = useSelector((state: RootState) => state.cart.purchasedProducts);
  const cartCount = React.useMemo(() => cartProducts.reduce((total, product) => total + product.quantity, 0), [cartProducts]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{}}>
          <Icon
            name="cart"
            size={24}
            color="#000"
            style={styles.iconStyle}
            onPress={() => navigation.navigate('Cart')}
          />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
      ),
    });
  }, [navigation, cartCount]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    padding: 8,
  },
  badge: {
    position: 'absolute',
    right: 10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  iconStyle: { marginRight: 15 },
});

export default ProductListScreen;
