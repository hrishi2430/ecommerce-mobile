import { View, Button, StyleSheet } from 'react-native'
import React from 'react'
import isEqual from 'react-fast-compare';

interface CheckoutButtonProps {
    onCheckOut: () => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onCheckOut }) => {
    return (
        <View style={styles.buttonStyle}>
            <Button title="Checkout" onPress={onCheckOut} />
        </View>
    )
}

const styles = StyleSheet.create({ buttonStyle: { borderColor: '#1082FE', borderWidth: 1, marginVertical: 10, borderRadius: 8 } })

export default React.memo(CheckoutButton, isEqual);
