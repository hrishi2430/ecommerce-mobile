import React from 'react'
import isEqual from 'react-fast-compare'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const EmptyCart: React.FC = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.fontStyle}>No recent purchases</Text>
            <Button title="Continue Shopping" onPress={navigation.goBack} />
        </View>
    )
};

const styles = StyleSheet.create({ container: { flex: 1, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }, fontStyle: { fontSize: 16 } });

export default React.memo(EmptyCart, isEqual);
