import React from "react";
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryScreen } from "./options/catergory.screen";
import { OptionsScreen } from "./options/options.screen";
import { UploadScreen } from "./options/upload.screen";
import { CaptionScreen } from "./options/caption.screen";
import { CompleteScreen } from "./options/complete.screen";
import SubmitScreen from "./options/submit.screen";


const Stack = createNativeStackNavigator();

export function RequestScreen() {
    return (
        <Stack.Navigator
            initialRouteName="options"
        >
            <Stack.Screen name="options" component={OptionsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="category" component={CategoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="upload" component={UploadScreen} options={{ headerShown: false }} />
            <Stack.Screen name="caption" component={CaptionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="submit" component={SubmitScreen} options={{ headerShown: false }} />
            <Stack.Screen name="complete" component={CompleteScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}