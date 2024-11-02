import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import Config from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

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
    
    AsyncStorage.setItem('enderecoAPI', Config.API_URL.toString());

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

    await getToken(authEmail, CriptografaDescriptografa(authPassword,true))
      .then((result) => {
    
        if (result) {
          
           AsyncStorage.setItem('token', "token");
           AsyncStorage.setItem('authEmail', "token");
           AsyncStorage.setItem('authPassword', "token");


           AsyncStorage.setItem('token', result);
           AsyncStorage.setItem('authEmail', authEmail);
           AsyncStorage.setItem('authPassword', CriptografaDescriptografa(authPassword,true));
         

           getUserData(authEmail, result)
          .then((data) => {
            if (data) {
              
              setAuthMensagem("")

              AsyncStorage.setItem('codUsu', data.codUsu);
              AsyncStorage.setItem('nomUsu', data.nomUsu);
              AsyncStorage.setItem('codSeqEmp', data.codSeqEmp);
              AsyncStorage.setItem('nomEmp', data.nomEmp);
              AsyncStorage.setItem('codGuid', data.codGuid);
              AsyncStorage.setItem('codColab', data.codColab);
              AsyncStorage.setItem('codLot', data.codLot);

              login()

                // We'll mock this with a fake token.
                setAuthToken(String(Date.now()))

              return '';
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
  returnString= "";
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
        textStyle={{lineHeight:24}}
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
  const enderecoAPI: string = await  AsyncStorage.getItem('enderecoAPI') + "Acesso/security";
  console.error(enderecoAPI);
  return fetch(enderecoAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
      console.error(data);
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
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Adicionando o token Bearer no cabeçalho
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do usuário');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Processar os dados recebidos
      return data; // Retornar os dados da API
    })
    .catch((error) => {
      console.error('Erro:', error);
      return null;
    });
};


