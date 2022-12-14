import { styles } from './TabThreeScreen.style';

import EditScreenInfo from '../../components/EditScreenInfoPage/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

export default function TabThreeScreen({ navigation }: RootTabScreenProps<'TabThree'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Three</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabThreeScreen.tsx" />
    </View>
  );
}

