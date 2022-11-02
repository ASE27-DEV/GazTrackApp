import { styles} from './TabFourScreen.style';

import EditScreenInfo from '../../components/EditScreenInfoPage/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

export default function TabFourScreen({ navigation }: RootTabScreenProps<'TabFour'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Four</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabFourScreen.tsx" />
    </View>
  );
}
