/* import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { CompositeScreenProps } from "@react-navigation/native"
import { OuvidoriaScreen, QuestionarioScreen } from "app/screens/"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { typography } from "../theme"
import { translate } from "../i18n"

export type StackNavigatorParamList = {
  ListaOuvidoria: undefined
  Questionario: undefined
  Anexos: undefined
  AnexosUpload: undefined
}

export type StackScreenProps<T extends keyof StackNavigatorParamList> = CompositeScreenProps<
  NativeStackScreenProps<StackNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Stack = createNativeStackNavigator<StackNavigatorParamList>()
export const OuvidoriaStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ListaOuvidoria" screenOptions={{ headerShown: true, headerTitleStyle: { fontFamily: typography.primary.medium } }}>
      <Stack.Screen name="ListaOuvidoria" component={OuvidoriaScreen} options={{ headerTitle: translate("listaOuvidoriaScreen.screenName") }} />
      <Stack.Screen name="Questionario" component={QuestionarioScreen} options={{ headerTitle: translate("questionarioScreen.screenName")}} />
    </Stack.Navigator>
  )
}
 */