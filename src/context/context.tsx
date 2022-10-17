import { Auth,API,graphqlOperation } from "aws-amplify";
import React,{ createContext, useState,useContext, useEffect } from "react";
import { getStreamToken } from "../graphql/queries";

const AuthContext =createContext({
    userId:null,
    setUserId:(newId: string) => {},
});

const AuthContextComponent =({children,client}) =>{
    const [userId, setUserId] = useState(null)


    const connectStreamChatUser  = async () =>{

        const userData =await Auth.currentAuthenticatedUser()
        const {sub,email}=userData.attributes;

        const  tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
        const token =tokenResponse.data.getStreamToken;
        console.log(token);

        await client.connectUser({
            id:sub,
            name:email,
            image:"https://i.imgur.com/fR9Jz14.png",
          },
          token
          );
          
          const channel =client.channel("livestream","Game",{name:"Game"});
          await channel.watch();
           setUserId(sub)
        }
     
     
       const signUp = () => {
         connectUser();
    };
    useEffect(() =>{
        connectStreamChatUser();
    },[])
    return (
       <AuthContext.Provider value={{userId,setUserId}}>
{children}
       </AuthContext.Provider>
    )
};
export default AuthContextComponent

export const useAuthContext =() => useContext(AuthContext);