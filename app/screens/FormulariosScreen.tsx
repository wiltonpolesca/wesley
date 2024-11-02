import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useState, useMemo } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  StyleSheet,
  TextStyle,
  FlatList,
  View,
  ViewStyle,
} from "react-native"
import { type ContentStyle } from "@shopify/flash-list"
import {
  Button,
  ButtonAccessoryProps,
  Card,
  EmptyState,
  Icon,
  Screen,
  Text,
} from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { Dropdown } from 'react-native-element-dropdown'
import { Tab, TabView } from '@rneui/themed'
import { translate } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { colors, spacing, typography } from "../theme"
import { delay } from "../utils/delay"
import { SearchBar } from "@rneui/themed"

const folderData = [
  { label: 'Todos', value: '1' },
  { label: 'Denúncias', value: '5' },
  { label: 'Governança', value: '4' },
  { label: 'Jurídico', value: '3' },
  { label: 'Manifestações', value: '2' },
  { label: 'Reclamações', value: '6' },
  { label: 'Sugestões/Elogios', value: '6' },
];

const ICON_SIZE = 14

export const FormulariosScreen: FC<DemoTabScreenProps<"Formularios">> =
  observer(function formulariosScreen(_props) {
    const { navigation } = _props
    const { episodeStore } = useStores()
    const [valueDropdown, setValueDropdown] = useState("");
    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState(0);
    const [value, setValue] = useState("");



    // initially, kick off a background refresh without the refreshing UI
    useEffect(() => {
      ; (async function load() {
        setIsLoading(true)
        await episodeStore.fetchEpisodes()
        setIsLoading(false)
      })()
    }, [episodeStore])

    // simulate a longer refresh, if the refresh is too fast for UX
    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([episodeStore.fetchEpisodes(), delay(750)])
      setRefreshing(false)
    }

    return (
      <Screen
        preset="fixed"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top"]}
      >
        <Tab
          value={activeTab}
          onChange={(e) => setActiveTab(e)}
          disableIndicator
          style={$containerTab}
          variant="primary"
        >
          <Tab.Item
            title={translate("formulariosScreen.formsDisponiveis")}
            containerStyle={$containerTabButton}
            buttonStyle={activeTab === 0 ? $tabButtonsButtonActive : $tabButtonsButton}
            titleStyle={activeTab === 0 ? $tabButtonsTextActive : $tabButtonsText}
          />
          <Tab.Item
            title={translate("formulariosScreen.formsRespondidos")}
            containerStyle={$containerTabButton}
            buttonStyle={activeTab === 1 ? $tabButtonsButtonActive : $tabButtonsButton}
            titleStyle={activeTab === 1 ? $tabButtonsTextActive : $tabButtonsText}
          />
        </Tab>

        <SearchBar
          platform="default"
          containerStyle={$searchBarContainer}
          inputContainerStyle={$searchBarInputContainer}
          inputStyle={$searchBarInput}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onChangeText={newVal => setValue(newVal)}
          placeholder={translate("documentosScreen.searchBarPlaceHolder")}
          placeholderTextColor="#888"
          value={value}
        />

        <TabView value={activeTab} onChange={setActiveTab} animationType="spring" containerStyle={$containerConteudoAba} tabItemContainerStyle={$containerConteudoAba}>
          <TabView.Item style={{ width: '100%' }}>
            <View style={{ flex: 1 }}>
              <Text preset="subheading" style={$title}>{translate("formulariosScreen.subTitleAbaNovos")}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                fontFamily={typography.primary.normal}
                data={folderData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={translate("formulariosScreen.inputDropdownPlaceholder")}
                value={valueDropdown}
                onChange={item => {
                  setValueDropdown(item.value);
                }}
                renderLeftIcon={() => (
                  <Icon
                    size={20}
                    icon="faFilter"
                    color={colors.palette.neutral800}
                    style={styles.icon}
                  />
                )}
              />
              <View style={{ flex: 1 }}>
                <FlatList<Episode>
                  contentContainerStyle={$listContentContainer}
                  data={episodeStore.episodesForList.slice()}
                  extraData={episodeStore.offline.length + episodeStore.episodes.length}
                  refreshing={refreshing}
                  onRefresh={manualRefresh}
                  ListEmptyComponent={
                    isLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <EmptyState
                        preset="generic"
                        style={$emptyState}
                        headingTx={"emptyStateComponent.generic.heading"}
                        contentTx={"emptyStateComponent.generic.content"}
                        button={episodeStore.offlineOnly ? "" : undefined}
                        buttonOnPress={manualRefresh}
                        imageStyle={$emptyStateImage}
                        ImageProps={{ resizeMode: "contain" }}
                      />
                    )
                  }
                  renderItem={({ item }) => (
                    <DocCard
                      episode={item}
                      onPressGoForm={() => episodeStore.toggleOffline(item)}
                      navigation={navigation}
                    />
                  )}
                />
              </View>

            </View>
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <View style={{ flex: 1 }}>
              <Text preset="subheading" style={$title}>{translate("formulariosScreen.subTitleAbaEnviados")}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                fontFamily={typography.primary.normal}
                data={folderData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={translate("formulariosScreen.inputDropdownPlaceholder")}
                value={valueDropdown}
                onChange={item => {
                  setValueDropdown(item.value);
                }}
                renderLeftIcon={() => (
                  <Icon
                    size={20}
                    icon="faFilter"
                    color={colors.palette.neutral800}
                    style={styles.icon}
                  />
                )}
              />
              <View style={{ flex: 1 }}>
                <FlatList<Episode>
                  contentContainerStyle={$listContentContainer}
                  data={episodeStore.episodesForList.slice()}
                  extraData={episodeStore.offline.length + episodeStore.episodes.length}
                  refreshing={refreshing}
                  onRefresh={manualRefresh}
                  ListEmptyComponent={
                    isLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <EmptyState
                        preset="generic"
                        style={$emptyState}
                        headingTx={"emptyStateComponent.generic.heading"}
                        contentTx={"emptyStateComponent.generic.content"}
                        button={episodeStore.offlineOnly ? "" : undefined}
                        buttonOnPress={manualRefresh}
                        imageStyle={$emptyStateImage}
                        ImageProps={{ resizeMode: "contain" }}
                      />
                    )
                  }
                  renderItem={({ item }) => (
                    <DocCardEnviados
                      episode={item}
                      onPressGoForm={() => episodeStore.toggleOffline(item)}
                    />
                  )}
                />
              </View>

            </View>
          </TabView.Item>
        </TabView>

      </Screen>
    )
  },)

const DocCard = observer(function DocCard({
  episode,
  onPressGoForm,
  navigation,
}: {
  episode: Episode
  onPressGoForm: () => void
  navigation: any
}) {

  const [isPressed, setIsPressed] = useState(false)

  const $item: ViewStyle = {
    padding: spacing.sm,
    marginTop: spacing.xs,
    minHeight: 80,
    backgroundColor: isPressed ? colors.palette.primary100 : colors.background,
    borderColor: isPressed ? colors.palette.primary400 : colors.palette.neutral300,
  }

  const handlePressOpenForm = () => {
    navigation.navigate("Checklist" as never)
  }

  const handlePressCard = () => {
    navigation.navigate("Checklist" as never)
  }

  const ButtonRightAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonRightAccessory() {
        return (
          <View style={{ marginLeft: spacing.xxs }}>
            <Icon
              icon="forward"
              size={ICON_SIZE}
              color={colors.palette.primary400} // active
            />
          </View>
        )
      },
    [],
  )

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      content={`${episode.parsedTitleAndSubtitle.title} - ${episode.parsedTitleAndSubtitle.subtitle}`}
      LeftComponent={<Icon icon="faForm" color={colors.palette.neutral800} size={20} containerStyle={$itemIconContainer} style={$itemThumbnail} />}
      FooterComponent={
        <View style={$itemFooter}>
          <View style={$metadata}>
            <Text
              style={$metadataText}
              size="xxs"
            >
              Auditoria
            </Text>
          </View>
          <Button
            onPress={handlePressOpenForm}
            onLongPress={handlePressOpenForm}
            style={$btnOpenForm}
            RightAccessory={ButtonRightAccessory}
          >
            <Text
              size="xxs"
              style={$btnTextOpenForm}
              weight="medium"
              text={translate("formulariosScreen.btnGoForm")}
            />
          </Button>
        </View>
      }
    />
  )
})

const DocCardEnviados = observer(function DocCard({
  episode,
  onPressGoForm,
}: {
  episode: Episode
  onPressGoForm: () => void
}) {

  const [isPressed, setIsPressed] = useState(false)

  const $item: ViewStyle = {
    padding: spacing.sm,
    marginTop: spacing.xs,
    minHeight: 80,
    backgroundColor: isPressed ? colors.palette.primary100 : colors.background,
    borderColor: isPressed ? colors.palette.primary400 : colors.palette.neutral300,
  }

  const handlePressOpenForm = () => {
    console.log("botão clicado")
  }

  const handlePressCard = () => {
    console.log("card clicado")
  }

  const ButtonRightAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonRightAccessory() {
        return (
          <View style={{ marginLeft: spacing.xxs }}>
            <Icon
              icon="view"
              size={ICON_SIZE}
              color={colors.palette.primary400} // active
            />
          </View>
        )
      },
    [],
  )

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      content={`${episode.parsedTitleAndSubtitle.title} - ${episode.parsedTitleAndSubtitle.subtitle}`}
      LeftComponent={<Icon icon="filelist" color={colors.palette.neutral800} size={20} containerStyle={$itemIconContainer} style={$itemThumbnail} />}
      HeadingComponent={<View style={$metadata}>
        <Text
          style={$metadataText}
          size="xxs"
        >
          {translate("formulariosScreen.sentDateTitle")}
        </Text>
        <Text
          style={$metadataText}
          size="xxs"
        >
          24/08/2024
        </Text>
      </View>}
      FooterComponent={
        <View style={$itemFooter}>
          <View style={$metadata}>
            <Text
              style={$metadataText}
              size="xxs"
            >
              Auditoria
            </Text>
          </View>
          <Button
            onPress={handlePressOpenForm}
            onLongPress={handlePressOpenForm}
            style={$btnOpenForm}
            RightAccessory={ButtonRightAccessory}
          >
            <Text
              size="xxs"
              style={$btnTextOpenForm}
              weight="medium"
              text={translate("formulariosScreen.btnViewForm")}
            />
          </Button>
        </View>
      }
    />
  )
})



// #region Styles
const styles = StyleSheet.create({
  dropdown: {
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
    marginTop: spacing.xxs,
    marginBottom: spacing.xs,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: spacing.xs,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $containerTab: ViewStyle = {
  borderRadius: 10,
  padding: 3,
  marginHorizontal: spacing.sm,
  marginTop: spacing.xl,
  backgroundColor: colors.palette.neutral300,
}

const $containerTabButton: ViewStyle = {
  borderRadius: 10,
  backgroundColor: colors.palette.neutral300,
}

const $tabButtonsButton: ViewStyle = {
  padding: 0,
  backgroundColor: colors.palette.neutral300,
}

const $tabButtonsButtonActive: ViewStyle = {
  padding: 0,
  backgroundColor: colors.primary,
}

const $tabButtonsText: TextStyle = {
  color: colors.textDim,
  fontSize: 14,
}

const $tabButtonsTextActive: TextStyle = {
  color: colors.palette.neutral100,
  fontSize: 14,
}

const $containerConteudoAba: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxs,
  paddingBottom: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.xxs,
  fontFamily: typography.primary.semiBold,
  paddingHorizontal: spacing.lg,
}

const $itemIconContainer: ViewStyle = {
  padding: spacing.xs,
  backgroundColor: colors.lightBackground,
  borderRadius: 10,
  alignItems: "flex-start",
  justifyContent: "center",
  alignSelf: "flex-start",
}

const $itemThumbnail: ImageStyle = {
  marginTop: 0,
  borderRadius: 0,
  alignSelf: "flex-start",
}

const $itemFooter: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $btnOpenForm: ViewStyle = {
  borderColor: colors.palette.primary100,
  borderWidth: 0,
  paddingVertical: 0,
  minHeight: 20,
}

const $btnTextOpenForm: TextStyle = {
  textAlignVertical: "center",
  lineHeight: 24,
  color: colors.primary,
  textTransform: "uppercase",
  fontFamily: typography.primary.semiBold,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  flexDirection: "row",
  alignItems: "center"
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.xxxs,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}

const $searchBarContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopWidth: 0,
  borderBottomWidth: 0,
  paddingVertical: spacing.lg,
  paddingRight: spacing.lg,
  paddingLeft: spacing.lg,
}

const $searchBarInputContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderColor: colors.border,
  borderWidth: 1,
  borderBottomWidth: 1,
  borderRadius: 12,
}

const $searchBarInput: TextStyle = {
  fontFamily: typography.primary.normal,
}
// #endregion