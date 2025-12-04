import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Navigation Ready!</Text>
      </View>
    </NavigationContainer>
  );
}
