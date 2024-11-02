import React, { FC, useState, } from "react"
import { observer } from "mobx-react-lite"
import {
  ImageStyle,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import {
  Screen,
  Card,
  Divider,
  Text,
  AutoImage,
  Button,
  TextField,
  Icon,
} from "app/components"
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import { translate } from "../i18n"
import { colors, spacing, typography } from "../theme"

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={toastStyles.successToast}
      contentContainerStyle={toastStyles.containerSuccessToast}
      text1Style={toastStyles.text1SuccessToast}
      renderLeadingIcon={() => (
        <Icon
          icon="check"
          size={24}
          style={toastStyles.iconSuccessToast}
          color={colors.primary}
        />
      )}
    />
  ),};

const iconImgAnexos = require("../../assets/icons/treinamentos.png")
const tiposDocs = [
  { label: 'Comprovante', value: '1' },
  { label: 'Cerfificado', value: '2' },
  { label: 'Lista de Presença', value: '3' },
];

export const AnexosUploadScreen: FC<DemoTabScreenProps<"AnexosUpload">> = observer(function AnexosUploadScreen(_props) {
  const { navigation } = _props
  const [valueDropdown, setValueDropdown] = useState("");

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Arquivo enviado com sucesso',
      // text2: 'This is some something 👋'
    });
    
    //apagar esse setTimeout
    setTimeout(() => {
      navigation.goBack()
    }, 2000);
     
  }

  return (
    <Screen preset="fixed"
      contentContainerStyle={$screenContentContainer}>
      <View style={$contentContainer}>
        <Card
          style={$selectedDocContainer}
          LeftComponent={
            <AutoImage
              maxWidth={80}
              maxHeight={60}
              style={$iconAnexo}
              source={iconImgAnexos}
            />
          }
          heading="certificado-do-treinamento-multidisciplinar.pdf"
          footer="Arquivo selecionado"
        />
        <TextField
          value="Certificado do Treinamento Multidisciplinar"
          labelTx="anexosUploadScreen.form.inputTituloLabel"
          labelTxOptions={{ prop: "label" }}
          helperTxOptions={{ prop: "helper" }}
          placeholderTx="anexosUploadScreen.form.inputTituloPlaceholder"
          placeholderTxOptions={{ prop: "placeholder" }}
        />

        <Divider size={24} />

        <Text preset="formLabel">{translate("anexosUploadScreen.form.inputTipoLabel")}</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          fontFamily={typography.primary.normal}
          data={tiposDocs}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={translate("anexosUploadScreen.inputDropdownPlaceholder")}
          value={valueDropdown}
          onChange={item => {
            setValueDropdown(item.value);
          }}
        />

        <Divider size={24} />

        <TextField
          labelTx="anexosUploadScreen.form.inputDescLabel"
          labelTxOptions={{ prop: "label" }}
          helperTxOptions={{ prop: "helper" }}
          placeholderTx="anexosUploadScreen.form.inputDescPlaceholder"
          multiline
        />

        <Divider size={5} />

        <View style={$buttonContainer}>
          <Button style={$button} tx="anexosUploadScreen.form.txCancelBtn" onPress={() => navigation.goBack()} />
          <Button style={$button} preset="reversed" tx="anexosUploadScreen.form.txConfirmBtn" onPress={() => showToast()} />
        </View>
      </View>
      
      <Toast config={toastConfig} />
    </Screen>
  )
})

// #region Styles
const toastStyles = StyleSheet.create({
  successToast: {
    borderColor: colors.primary,
    width: "92%",
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.palette.primary100,
    minHeight: 80,
  },
  containerSuccessToast: {
    paddingHorizontal: spacing.sm,
  },
  text1SuccessToast: {
    fontWeight: 500,
    fontSize: 16,
  },
  iconSuccessToast: {
    backgroundColor: colors.palette.primary100,
    marginLeft: spacing.md,
  }
});
const styles = StyleSheet.create({
  dropdown: {
    marginTop: spacing.xxs,
    height: 56,
    borderRadius: 10,
    borderColor: colors.palette.neutral400,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
  },
  icon: {
    marginRight: spacing.xs,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  marginTop: spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $selectedDocContainer: ViewStyle = {
  marginBottom: spacing.lg,
  padding: spacing.sm,
  backgroundColor: colors.palette.secondary100,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: colors.secondary,
}

const $buttonContainer: ViewStyle = {
  marginTop: spacing.lg,
  flexDirection: "row",
  justifyContent: "space-between",
  columnGap: spacing.xs,
}
const $button: ViewStyle = {
  marginBottom: spacing.xs,
  borderRadius: 10,
  flex: 1,
}
const $iconAnexo: ImageStyle = {
  height: 40,
  width: 40,
}
// #endregion