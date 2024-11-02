import React, { FC, useState, } from "react"
import {
  View,
  ViewStyle,
  StyleSheet,
  TextStyle,
  ImageStyle,
} from "react-native"
import {
  Screen,
  Divider,
  Text,
  Button,
  TextField,
  Icon,
  Card,
} from "app/components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import { translate } from "../i18n"
import { colors, spacing, typography } from "../theme"
import { ListItem } from '@rneui/themed';


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


const tiposOptions = [
  { label: 'Conforme', value: '1' },
  { label: 'Não conforme', value: '2' },
  { label: 'Observação', value: '3' },
];

export const ChecklistScreen: FC<DemoTabScreenProps<"Checklist">> =
  function ChecklistScreen(_props) {
    const { navigation } = _props
    const [valueDropdown, setValueDropdown] = useState("");

    return (
      <Screen preset="scroll"
        contentContainerStyle={$screenContentContainer}>
        <View>
          <View style={$formHeaderContainer}>
            <Text preset="subheading" style={$checklistName}>
              Auditoria Interna ISO 9001
            </Text>
            <Text style={$checklistDescription}>Formulário utilizado para auditoria interna da norma ISO 9001:2015</Text>
          </View>
          <View style={$formContainer}>
            {/* <Text preset="bold" style={{marginBottom: spacing.md}}>
              {translate("checklistScreen.form.titlePrequest")}
            </Text> */}
            <TextField
              labelTx="checklistScreen.form.inputTituloLabel"
              labelTxOptions={{ prop: "label" }}
              helperTxOptions={{ prop: "helper" }}
              placeholderTx="checklistScreen.form.inputTituloPlaceholder"
              placeholderTxOptions={{ prop: "placeholder" }}
            />

            <Divider size={24} />

            <Text preset="formLabel">{translate("checklistScreen.form.inputTipoLabel")}</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              fontFamily={typography.primary.normal}
              data={tiposOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={translate("checklistScreen.inputDropdownPlaceholder")}
              value={valueDropdown}
              onChange={item => {
                setValueDropdown(item.value);
              }}
            />

            <Divider size={24} />

            <TextField
              labelTx="checklistScreen.form.inputDescLabel"
              labelTxOptions={{ prop: "label" }}
              helperTxOptions={{ prop: "helper" }}
              placeholderTx="checklistScreen.form.inputDescPlaceholder"
              multiline
            />
          </View> 
          <Divider size={10} />
          <View style={$checklistContainer}>
            <View style={$formHeaderContainer}>
              <Text preset="bold" style={$checklistChapter}>
                8. Operação
              </Text>
              <Text style={$checklistSubchapter}>8.1 Requisitos para produtos e serviços</Text>
              <Card
                style={$checklistCard}
                heading="8.1.1 Determinação de requisitos relativos a produtos e serviços"
                headingStyle={{ fontFamily: typography.primary.semiBold, paddingBottom: spacing.xs }}
                content="Ao determinar os requisitos para os produtos e serviços a serem oferecidos para clientes, a organização deve assegurar que:
a) os requisitos para os produtos e serviços sejam definidos; b) a organização possa atender aos pleitos para os produtos e serviços que ela oferece."
                contentStyle={{paddingBottom: spacing.xs}}
                FooterComponent={<Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  fontFamily={typography.primary.normal}
                  data={tiposOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={translate("checklistScreen.inputDropdownPlaceholder")}
                  value={valueDropdown}
                  onChange={item => {
                    setValueDropdown(item.value);
                  }}
                />}
              />
              <Card
                style={$checklistCard}
                heading="8.1.1 Determinação de requisitos relativos a produtos e serviços"
                headingStyle={{ fontFamily: typography.primary.semiBold, paddingBottom: spacing.xs }}
                content="Ao determinar os requisitos para os produtos e serviços a serem oferecidos para clientes, a organização deve assegurar que:
a) os requisitos para os produtos e serviços sejam definidos; b) a organização possa atender aos pleitos para os produtos e serviços que ela oferece."
                contentStyle={{ paddingBottom: spacing.xs }}
                FooterComponent={<Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  fontFamily={typography.primary.normal}
                  data={tiposOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={translate("checklistScreen.inputDropdownPlaceholder")}
                  value={valueDropdown}
                  onChange={item => {
                    setValueDropdown(item.value);
                  }}
                />}
              />
              <Card
                style={$checklistCard}
                heading="8.1.1 Determinação de requisitos relativos a produtos e serviços"
                headingStyle={{ fontFamily: typography.primary.semiBold, paddingBottom: spacing.xs }}
                content="Ao determinar os requisitos para os produtos e serviços a serem oferecidos para clientes, a organização deve assegurar que:
a) os requisitos para os produtos e serviços sejam definidos; b) a organização possa atender aos pleitos para os produtos e serviços que ela oferece."
                contentStyle={{ paddingBottom: spacing.xs }}
                FooterComponent={<Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  fontFamily={typography.primary.normal}
                  data={tiposOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={translate("checklistScreen.inputDropdownPlaceholder")}
                  value={valueDropdown}
                  onChange={item => {
                    setValueDropdown(item.value);
                  }}
                />}
              />
            </View>
          </View>
          <View style={$footerForm}>
            <View style={$buttonContainer}>
              <Button style={$buttonOnlyIcon} LeftAccessory={(props) => (
                <Icon containerStyle={props.style} style={$iconStyle} icon="caretLeft" />
              )} onPress={() => navigation.goBack()} />
              <Button style={$button} preset="reversed" text="Próximo" RightAccessory={(props) => (
                <Icon containerStyle={props.style} color={colors.palette.neutral100} style={$iconStyle} icon="caretRight" />
              )} />
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
  marginBottom: spacing.md,
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
const $buttonOnlyIcon: ViewStyle = {
  marginBottom: spacing.xs,
  borderRadius: 10,
}
const $checklistName: TextStyle = {
  fontFamily: typography.primary.bold,
  paddingBottom: spacing.md,
  lineHeight: 26,
}
const $checklistChapter: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 18,
  paddingBottom: spacing.xs,
}
const $checklistSubchapter: TextStyle = {
  fontFamily: typography.primary.semiBold,
  paddingBottom: spacing.sm,
}
const $checklistDescription: TextStyle = {
  paddingBottom: spacing.lg,
}
const $checklistContainer: ViewStyle = {
  backgroundColor: colors.lightBackground,
  paddingVertical: spacing.lg,
}
const $footerForm: ViewStyle = {
  marginHorizontal: spacing.lg,
  marginBottom: spacing.xxl,
}
const $checklistCard: ViewStyle = {
  padding: spacing.sm,
  marginBottom: spacing.sm,
}
const $iconStyle: ImageStyle = { width: 20, height: 20 }
/* const $visibleDivider: TextStyle = {
  borderTopWidth: 1,
  borderColor: colors.border,
} */
// #endregion