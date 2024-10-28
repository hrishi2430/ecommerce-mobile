import React from 'react';
import isEqual from 'react-fast-compare';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RatingProps {
  rating: {
    rate: number;
    count: number;
  };
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const { rate, count } = rating;

  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 >= 0.5 ? 1 : 0;
  const totalStars = fullStars + halfStar;

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => (
          <Icon
            key={index}
            name={index < totalStars ? (index < fullStars ? 'star' : 'star-half') : 'star-outline'}
            size={16}
            color={index < totalStars ? '#FFD700' : '#ccc'}
          />
        ))}
      </View>
      <Text style={styles.count}>({count} reviews)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 5,
  },
  count: {
    fontSize: 10,
    color: '#666',
  },
});

export default React.memo(Rating, isEqual);
