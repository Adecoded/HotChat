import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo';
const ChannelScreen = () => {
  const route =useRoute();
  const channel=route.params?.channel;
  const navigation = useNavigation();

  navigation.setOptions({ title: channel?.data?.name || "Channel" });
  if(!channel) {
    return(
    <View style={styles.errorContainer}>
      <Text style={styles.error}>Select a channel from the list </Text>
    </View>
    )
  }
  return (
    <Channel channel={channel} key={channel.data.name}>
    <MessageList/>
    <MessageInput/>
    </Channel>
  )
}

const styles=StyleSheet.create({
  error:{
color:'white',
fontSize:16,
padding:10,
  },
  errorContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
})
export default ChannelScreen