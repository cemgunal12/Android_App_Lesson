import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Home Screen</Text>
      
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Go to Paris"
          onPress={() => navigation.navigate('Details', { 
            place: 'Paris', 
            rating: 5 
          })}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button
          title="Go to London"
          onPress={() => navigation.navigate('Details', { 
            place: 'London', 
            rating: 4 
          })}
        />
      </View>
    </View>
  );
}