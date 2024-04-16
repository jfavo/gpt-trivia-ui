import { GluestackUIProvider, View } from "@gluestack-ui/themed"
import { Provider } from 'react-redux'
import { config } from "@gluestack-ui/config"
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LandingPage } from "./src/pages/landing/landing-page";
import { HomePage } from "./src/pages/home/home-page";
import { HEADER_OPTIONS } from "./src/components/header";
import { GuestSigninPage } from "./src/pages/users/guest-signin";
import { Screens } from "./src/models/screens";
import { store } from "./src/state/app.store";
import { UserProfilePage } from "./src/pages/users/user-profile";
import { SignupPage } from "./src/pages/users/signup-page";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={HEADER_OPTIONS}
            >
              <Stack.Screen 
                name={Screens.Landing.toString()}
                component={LandingPage}
              />
              <Stack.Screen
                name={Screens.GuestSignin.toString()}
                component={GuestSigninPage}
              />
              <Stack.Screen 
                name={Screens.Home.toString()}
                component={HomePage}
              />
              <Stack.Screen 
                name={Screens.Signup.toString()}
                component={SignupPage}
              />
              <Stack.Screen 
                name={Screens.UserProfile.toString()}
                component={UserProfilePage}
              />
            </Stack.Navigator>
          </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}
