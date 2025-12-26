import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from '../hooks/useTheme'; // Hook'u import et

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme(); // Hook'u kullan

  // Temaya göre renkleri ayarla
  const backgroundColor = theme === 'light' ? '#ffffff' : '#333333';
  const textColor = theme === 'light' ? '#000000' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        Current Theme: {theme.toUpperCase()}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '50%',
  },
});