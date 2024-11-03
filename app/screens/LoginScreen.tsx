import AsyncStorage from '@react-native-async-storage/async-storage'
import { storageKeys } from "app/shared/constants"
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import Config from "../config"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { getHeaders } from 'app/shared/ApiHelper'

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, authPassword, setAuthPassword, setAuthMensagem, setAuthToken, validationError },
  } = useStores();

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    AsyncStorage.setItem(storageKeys.API_ADDRESS, Config.API_URL.toString());

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
      setAuthMensagem("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")
    setAuthMensagem("");
  }

  async function loginUsuario() {

    await getToken(authEmail, CriptografaDescriptografa(authPassword, true))
      .then((result) => {

        if (result) {
          AsyncStorage.setItem(storageKeys.TOKEN, result);
          AsyncStorage.setItem(storageKeys.AUTH_EMAIL, authEmail);
          AsyncStorage.setItem(storageKeys.AUTH_PASSWORD, CriptografaDescriptografa(authPassword, true));


          getUserData(authEmail, result)
            .then((data) => {
              if (data) {
                setAuthMensagem("")
                AsyncStorage.setItem(storageKeys.COD_USU, data.codUsu);
                AsyncStorage.setItem(storageKeys.NOM_USU, data.nomUsu);
                AsyncStorage.setItem(storageKeys.COD_SEQ_EMP, String(data.codSeqEmp));
                AsyncStorage.setItem(storageKeys.NOM_EMP, data.nomEmp);
                AsyncStorage.setItem(storageKeys.COD_GUID, data.codGuid);
                AsyncStorage.setItem(storageKeys.COD_COLAB, String(data.codColab));
                AsyncStorage.setItem(storageKeys.COD_LOT, String(data.codLot));

                login()

                // We'll mock this with a fake token.
                setAuthToken(String(Date.now()))
              }
            })
            .catch((error) => {
              setAuthMensagem('ERROR 1');
              setAuthMensagem(error);
              login()

            });


        } else {
          setAuthMensagem('ERROR 1');
          login()


        }
      })
      .catch((err) => {
        setAuthMensagem(err);
        setAuthMensagem('ERROR 1');
        login()
      });


  }

  function CriptografaDescriptografa(data: string, encrypt: boolean): string {
    const encryptedString = "½¾¿ÀÁÂÃÄÅÆÇ‚ƒ„…†‡ˆ‰Š‹ª«¬­®¯°±²³´µ¶·¸¹ ABCDEFGHIJKLMNOPQRSTUVXYWZ0123456789_Ø%@!#&$¨*()^{}[]`.?";
    const normalString = " ABCDEFGHIJKLMNOPQRSTUVXYWZ0123456789½¾¿ÀÁÂÃÄÅÆÇ‚ƒ„…†‡ˆ‰Š‹ª«¬­®¯°±²³´µ¶·¸¹_.%@!#&$¨*(){}[]`=Ø?";

    let returnString: string;
    returnString = "";
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      if (encrypt) {
        const index = normalString.indexOf(char);
        if (index !== -1) {
          returnString += encryptedString[index];
        }
      } else {
        const index = encryptedString.indexOf(char);
        if (index !== -1) {
          returnString += normalString[index];
        }
      }
    }

    return returnString;
  }
  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.logIn" preset="heading" style={$logIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToLogIn"
        style={$tapButton}
        preset="reversed"
        onPress={loginUsuario}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $logIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  backgroundColor: colors.primary, flex: 1, paddingBottom: spacing.sm, borderRadius: 10
}


export const getToken = async (userID: string, accessKey: string): Promise<string | null> => {

  const baseUrl = await AsyncStorage.getItem(storageKeys.API_ADDRESS);
  const enderecoAPI = `${baseUrl}Acesso/security`;

  return fetch(enderecoAPI, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      UserID: userID,
      AccessKey: accessKey,
      GrantType: 'password',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao obter token');
      }
      return response.json();
    })
    .then((data) => {
      if (data.accessToken === false) {
        console.error(1);
        return null
      }

      return data.accessToken; // Supondo que o token está no campo 'token'
    })
    .catch((error) => {
      console.error('Erro:', error);
      return null;
    });
};

export const getUserData = async (userID: string, token: string): Promise<any | null> => {
  const enderecoAPI: string = await AsyncStorage.getItem('enderecoAPI') + "Usuarios/usuario/empresa/" + userID;

  return fetch(enderecoAPI, {
    method: 'GET',
    headers: getHeaders(token),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }
      return response.json();
    })
    .then((data) => {
      return data; // Retornar os dados da API
    })
    .catch((error) => {
      console.error('Erro:', error);
      return null;
    });
};


