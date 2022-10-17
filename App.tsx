import { StatusBar } from "expo-status-bar";
import { useEffect} from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import { StreamChat } from "stream-chat";
import {
  OverlayProvider,
  Chat,
  DeepPartial,
  Theme,
} from "stream-chat-expo";
import { Text } from "react-native";
import AuthContext from "./src/context/context";
import { StreamColors } from "./src/constants/Colors";
const API_KEY = "ptz8rweky3ab";
const client = StreamChat.getInstance(API_KEY);

const theme: DeepPartial<Theme> ={
colors:StreamColors,

}

export default function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    //this is done when the component mounts
    return () => {
      //this is done when the component unmounts
      client.disconnectUser();
    };
  }, []);
  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext>
          <OverlayProvider value={{style:theme}}>
            <Chat client={client}>
              <Navigation colorScheme={"dark"} />
        
            </Chat>
          </OverlayProvider>
        </AuthContext>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
