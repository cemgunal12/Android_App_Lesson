import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen({ route, navigation }) {

  const { place, rating } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to {place}!</Text>
      
      <Text style={{ fontSize: 18, marginVertical: 10 }}>
        Rating: {rating} stars
      </Text>

      <Text style={{ marginBottom: 20, fontStyle: 'italic' }}>
        {rating === 5 ? "This is a top-rated location!" : "A great place to visit."}
      </Text>

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}