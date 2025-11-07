import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from './components/ProfileCard';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <ProfileCard
          name="Ada Lovelace"
          role="Mathematician"
          imageSource={require('./assets/ada.png')}
        />
        <ProfileCard
          name="Grace Hopper"
          role="Computer Scientist"
          imageSource={require('./assets/grace.png')}
        />
        <ProfileCard
          name="Hedy Lamarr"
          role="Inventor"
          imageSource={require('./assets/hedy.png')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  content: {
    paddingHorizontal: 20,
  },
});