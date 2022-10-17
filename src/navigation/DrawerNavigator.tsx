import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text,StyleSheet, SafeAreaView } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { useAuthContext } from "../context/context";
import ChannelScreen from "../screens/ChannelScreen";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="ChannelScreen" component={ChannelScreen} options={{title:"Channel"}} />
    </Drawer.Navigator>
  );
};

const  CustomDrawerContent=(props) => {

    const OnChannelSelect = (channel) => {
     props.navigation.navigate("ChannelScreen",{channel})
      };

      const {userId} =useAuthContext();
const filters ={members: {$in:[userId]}}
const PublicFilters ={type: "livestream"}
  return (
    <SafeAreaView style={{flex:1}} {...props}>
    <Text style={styles.title}>Drey Music World</Text>

    <Text style={styles.groupChannel}>Public channels</Text>
    <ChannelList onSelect={OnChannelSelect} filters={PublicFilters}/>

    <Text style={styles.groupChannel}>Your channels</Text>

    <ChannelList onSelect={OnChannelSelect} filters={filters}/>
    </SafeAreaView>
  );
}
const styles =StyleSheet.create({
    title:{
        color:'white',
        fontWeight:'bold',
        alignSelf:'center',
        fontSize:16,
        margin:10, 
    },
    groupChannel:{
        color:'white',
        margin:10,
    }
})
export default DrawerNavigator;
