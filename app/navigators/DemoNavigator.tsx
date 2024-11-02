import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React, {  useEffect, useState } from "react"
import { View, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { Badge } from "@rneui/themed"
import { translate } from "../i18n"
import { HomeScreen, DocumentosScreen, FormulariosScreen, AnexosScreen, OuvidoriaScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
 

export type DemoTabParamList = {
  Home: { queryIndex?: string; itemIndex?: string }
  Documentos: undefined
  ListaOuvidoria: undefined
  Questionario: undefined
  Formularios: undefined
  Checklist: undefined
  Anexos: undefined
  AnexosUpload: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export   function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation()
  const {
    authenticationStore: { logout },
  } = useStores()
  const unreadNotifications = 5; // Número de notificações


  const [nomeEmpresa, setNomeUsuario] = useState<string>("");

    
  useEffect(() => {
    async function fetchNomeUsuario() {
      const nome = await AsyncStorage.getItem("nomEmp");
      setNomeUsuario(nome || "Usuário desconhecido"); // Define um fallback caso o valor seja nulo
    }

    fetchNomeUsuario(); // Chama a função assíncrona
  }, [])


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: { fontFamily: typography.primary.medium},
        headerStyle: {
          borderBottomWidth: 1,
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: nomeEmpresa,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Notificacoes" as never)}>
                <View style={{ position: 'relative' }}>
                  <Icon
                    size={24}
                    icon="faSino"
                    containerStyle={$demoIconContainer}
                  />
                  {unreadNotifications > 0 && (
                    <Badge
                      value={unreadNotifications}
                      status="error"
                      containerStyle={{ position: 'absolute', top: -4, right: 6, borderWidth:0 }}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {/* Adicione outros botões se necessário */}
            </View>
          ),
          tabBarLabel: translate("demoNavigator.homeTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="faHome" color={focused ? colors.tint : colors.neutralState} size={24} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Documentos"
        component={DocumentosScreen}
        options={{
          headerShown: false,
          // headerStyle: {borderBottomColor:colors.borderLight},
          tabBarLabel: translate("demoNavigator.documentosTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="faDocumentos" color={focused ? colors.tint : colors.neutralState} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Formularios"
        component={FormulariosScreen}
        options={{
          tabBarLabel: translate("demoNavigator.formulariosTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="faFormulario" color={focused ? colors.tint : colors.neutralState} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="ListaOuvidoria"
        component={OuvidoriaScreen}
        options={{
          headerShown: false,
          title: translate("listaOuvidoriaScreen.screenName"),
          headerTitleStyle: {fontFamily: typography.primary.medium },
          tabBarAccessibilityLabel: translate("demoNavigator.ouvidoriasTab"),
          tabBarLabel: translate("demoNavigator.ouvidoriasTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="faOuvidoria" color={focused ? colors.tint : colors.neutralState} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Anexos"
        component={AnexosScreen}
        options={{
          headerShown: true,
          headerTitle: translate("anexosScreen.screenName"),
          tabBarLabel: translate("demoNavigator.anexosTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="faAnexo" color={focused ? colors.tint : colors.neutralState} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.lightBackground,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.sm,
  paddingBottom: spacing.sm,
}

const $tabBarLabel: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}

const $demoIconContainer: ViewStyle = {
  marginRight: spacing.md,
}