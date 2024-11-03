import React, { FC, useEffect, useState } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Button, Icon, Divider } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { useStores } from "../models"
import { translate } from "app/i18n"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const  HomeScreen: FC<DemoTabScreenProps<"Home">> =
 function HomeScreen(_props) {
    const {
      authenticationStore: { logout },
    } = useStores()
    const { navigation } = _props

    const [nomeUsuario, setNomeUsuario] = useState<string>("");

    
  useEffect(() => {
    async function fetchNomeUsuario() {
      const nome = await AsyncStorage.getItem("nomUsu");
      setNomeUsuario(nome || "Usuário desconhecido"); // Define um fallback caso o valor seja nulo
    }

    fetchNomeUsuario(); // Chama a função assíncrona
  }, [])

    return (
      <Screen preset="fixed" contentContainerStyle={$container}>
        <Text preset="heading" style={$title}>{translate("homeScreen.saudacao", {nome: nomeUsuario})}</Text>
        <Text tx="homeScreen.tagLine" style={$tagline} />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button
            onPress={() => navigation.navigate("Documentos" as never)}
            style={$customButtonStyleSecondary}
            pressedStyle={$customButtonPressedStyleSecondary}
            preset="filled" textStyle={$customBlockButtonTextStyle}
            TopLeftAccessory={(props) => (
              <Icon containerStyle={props.style} style={$iconStyle} icon="documentos" />
            )}
          >
            {translate("homeButtons.btnDocumentos")}
          </Button>


          <Button
            onPress={() => navigation.navigate("Formularios" as never)}
            style={$customButtonStylePrimary}
            pressedStyle={$customButtonPressedStylePrimary}
            preset="filled" textStyle={$customBlockButtonTextStyle}
            TopLeftAccessory={(props) => (
              <Icon containerStyle={props.style} style={$iconStyle} icon="formularios" />
            )}
          >
            {translate("homeButtons.btnFormularios")}
          </Button>
        </View>
        <Divider />
        

        <View style={{ flexDirection: "row", gap: 10 }}>
        <Button
          onPress={() => navigation.navigate("Ouvidoria" as never)}
          style={$customButtonStylePrimary}
          pressedStyle={$customButtonPressedStylePrimary}
          preset="filled" textStyle={$customBlockButtonTextStyle}
          TopLeftAccessory={(props) => (
            <Icon containerStyle={props.style} style={$iconStyle} icon="ouvidorias" />
          )}
        >
          {translate("homeButtons.btnOuvidoria")}
        </Button>
        

        <Button
          onPress={() => navigation.navigate("Anexos" as never)}
          style={$customButtonStyleSecondary}
          pressedStyle={$customButtonPressedStyleSecondary}
          preset="filled" textStyle={$customBlockButtonTextStyle}
          TopLeftAccessory={(props) => (
            <Icon containerStyle={props.style} style={$iconStyle} icon="treinamentos" />
          )}
        >
          {translate("homeButtons.btnTreinamentos")}
        </Button>
        </View>
        <Divider />
        
        <View style={$buttonContainer}>
          <Button style={$button} tx="common.logOut" onPress={logout} />
        </View>
      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $tagline: TextStyle = {
  marginBottom: spacing.lg,
}

const $button: ViewStyle = {
  marginBottom: spacing.xs,
  borderRadius: 10,
}

const $buttonContainer: ViewStyle = {
  marginTop: spacing.xl,
}

const $iconStyle: ImageStyle = { width: 42, height: 42 }
const $customBlockButtonTextStyle: TextStyle = {
  textAlign: "left",
  width: "100%",
  paddingTop: spacing.xs,
  fontSize: 18,
}
const $customButtonStylePrimary: ViewStyle = { backgroundColor: colors.palette.primary100, flex: 1, paddingBottom: spacing.md, borderRadius: 10 }
const $customButtonStyleSecondary: ViewStyle = { backgroundColor: colors.palette.secondary100, flex: 1, paddingBottom: spacing.md, borderRadius: 10 }
const $customButtonPressedStylePrimary: ViewStyle = { backgroundColor: colors.palette.primary400, flex: 1 }
const $customButtonPressedStyleSecondary: ViewStyle = { backgroundColor: colors.palette.secondary400, flex: 1 }