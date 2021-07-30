import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function AddPage() {
  return (
    <View style={styles.contianer}>
      <Text>AddPage</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
