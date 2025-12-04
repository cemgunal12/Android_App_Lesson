import React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>App Version 1.0</Text>
      <Text>Settings Screen</Text>
    </View>
  );
}