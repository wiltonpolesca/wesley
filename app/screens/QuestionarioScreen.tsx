import React, { FC, useState, } from "react"
import {
  View,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from "react-native"
import {
  Screen,
  Divider,
  Text,
  Button,
  TextField,
  Icon,
} from "app/components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
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
  ),
};


const tiposDocs = [
  { label: 'Comprovante', value: '1' },
  { label: 'Cerfificado', value: '2' },
  { label: 'Lista de Presença', value: '3' },
];

export const QuestionarioScreen: FC<DemoTabScreenProps<"Questionario">> =
  function QuestionarioScreen(_props) {
    const { navigation } = _props
    const [valueDropdown, setValueDropdown] = useState("");

    const showToast = () => {
      Toast.show({
        type: 'success',
        text1: 'Questionário enviado com sucesso',
        position: 'top',
        // text2: 'This is some something 👋'
      });

      //apagar esse setTimeout
      setTimeout(() => {
        navigation.goBack()
      }, 2000);

    }

    return (
      <Screen preset="scroll"
        contentContainerStyle={$screenContentContainer}>
        <View>
          <View style={$formHeaderContainer}>
            <Text preset="subheading" style={$questionarioName}>
              Formulário de reclamação do cliente
            </Text>
            <Text style={$questionarioDescription}>Documento referente ao registro de reclamação feita pelo cliente. Será encaminhado para o setor de controle de qualidade interno.</Text>
          </View>
          <Divider size={10} />
          <View style={$formContainer}>
            <TextField
              labelTx="questionarioScreen.form.inputTituloLabel"
              labelTxOptions={{ prop: "label" }}
              helperTxOptions={{ prop: "helper" }}
              placeholderTx="questionarioScreen.form.inputTituloPlaceholder"
              placeholderTxOptions={{ prop: "placeholder" }}
            />

            <Divider size={24} />

            <Text preset="formLabel">{translate("questionarioScreen.form.inputTipoLabel")}</Text>
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
              placeholder={translate("questionarioScreen.inputDropdownPlaceholder")}
              value={valueDropdown}
              onChange={item => {
                setValueDropdown(item.value);
              }}
            />

            <Divider size={24} />

            <TextField
              labelTx="questionarioScreen.form.inputDescLabel"
              labelTxOptions={{ prop: "label" }}
              helperTxOptions={{ prop: "helper" }}
              placeholderTx="questionarioScreen.form.inputDescPlaceholder"
              multiline
            />

            <Divider size={5} />
            <View style={$buttonContainer}>
              <Button style={$button} tx="questionarioScreen.form.txCancelBtn" onPress={() => navigation.goBack()} />
              <Button style={$button} preset="reversed" tx="questionarioScreen.form.txConfirmBtn" onPress={() => showToast()} />
            </View>
          </View>
        </View>
        <Toast config={toastConfig} />
      </Screen>
    )
  }

// #region Styles
const toastStyles = StyleSheet.create({
  successToast: {
    borderColor: colors.primary,
    width: "92%",
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.palette.primary100,
    minHeight: 80,
    marginTop: spacing.xxxl,
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
    backgroundColor: colors.background,
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
  marginTop: spacing.xl,
}

const $formContainer: ViewStyle = {
  marginHorizontal: spacing.lg,
  borderRadius: 10,
}

const $formHeaderContainer: ViewStyle = {
  marginHorizontal: spacing.lg,
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
const $questionarioName: TextStyle = {
  fontFamily: typography.primary.bold,
  paddingBottom: spacing.md,
  lineHeight: 26,
}
const $questionarioDescription: TextStyle = {
  paddingBottom: spacing.lg,
}
/* const $visibleDivider: TextStyle = {
  borderTopWidth: 1,
  borderColor: colors.border,
} */
// #endregion