import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle, } from "react-native"
import { type ContentStyle, FlashList } from "@shopify/flash-list"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import {
  Screen,
  Text,
  Icon,
  Button, 
  Card,
  EmptyState, } from "app/components"
import { translate } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { colors, spacing, typography } from "../theme"
import { delay } from "../utils/delay"

export const AnexosScreen: FC<DemoTabScreenProps<"Anexos">> = observer(function AnexosScreen(_props) {
  const { navigation } = _props
  const { episodeStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

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
    <Screen preset="fixed"
      contentContainerStyle={$screenContentContainer}>
        <FlashList<Episode>
          contentContainerStyle={$listContentContainer}
          data={episodeStore.episodesForList.slice()}
          extraData={episodeStore.offline.length + episodeStore.episodes.length}
          refreshing={refreshing}
          estimatedItemSize={100}
          onRefresh={manualRefresh}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="subheading" style={$title}>{translate("anexosScreen.subTitle")}</Text>
              <Text preset="default" style={$descText}>{translate("anexosScreen.descText")}</Text>
              <Card
                verticalAlignment="center"
                preset="default"
                contentTx="anexosScreen.uploadDescription"
                contentStyle={$textUploadCard}
                style={$uploadCard}
                HeadingComponent={<Icon icon="faCloudUp" color={colors.palette.neutral800} size={48} containerStyle={$iconUploadCard} />}
                FooterComponent={<Button
                  onPress={() => navigation.navigate("AnexosUpload" as never)}
                  tx="anexosScreen.uploadBtnTitle"
                  preset="filled"
                  textStyle={{ color: colors.palette.neutral900 }}
                  style={$button}
                />}
              />
              
              
              <Text preset="subheading" style={$title2}>{translate("anexosScreen.filesListTitle")}</Text>
            </View>
          }
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
            />
          )}
        />
    </Screen>
  )
})

const DocCard = observer(function DocCard({
  episode,
}: {
  episode: Episode
}) {
  const [isPressed, setIsPressed] = useState(false)

  const $item: ViewStyle = {
    padding: spacing.sm,
    marginTop: spacing.xs,
    minHeight: 80,
    backgroundColor: isPressed ? colors.palette.primary100 : colors.background,
    borderColor: isPressed ? colors.palette.primary400 : colors.palette.neutral300,
  }

  const handlePressCard = () => {
    // ação do botão
  }


  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
          >
            COMPROVANTE
          </Text>
          <Text
            style={$metadataText}
            size="xxs"
          >
            {episode.datePublished.textLabel}
          </Text>
        </View>
      }
      content={`${episode.parsedTitleAndSubtitle.title} - ${episode.parsedTitleAndSubtitle.subtitle}`}
      RightComponent={<Icon icon="faFile" color={colors.palette.neutral800} size={18} containerStyle={$itemIconContainer} style={$itemThumbnail} />}
    />
  )
})

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}
const $title: TextStyle = {
  marginBottom: spacing.xxs,
  fontFamily: typography.primary.semiBold,
}
const $title2: TextStyle = {
  marginTop: spacing.xl,
  fontFamily: typography.primary.semiBold,
}

const $descText: TextStyle = {
  marginBottom: spacing.xl,
}

const $uploadCard: ViewStyle = {
  backgroundColor: "#f9f9f9",
  borderStyle: "dashed",
  borderColor: colors.border,
  alignItems: "center",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
}

const $iconUploadCard: ViewStyle = {
  alignItems: "center",
  marginBottom: spacing.xxs,
}

const $textUploadCard: TextStyle = {
  textAlign: "center",
  marginBottom: spacing.xs,
}

const $button: ViewStyle = {
  marginBottom: spacing.xs,
  borderRadius: 10,
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingTop: spacing.lg,
  paddingBottom: spacing.lg,
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

const $heading: ViewStyle = {
  marginBottom: spacing.xxs,
  marginTop: spacing.xxs,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}
// #endregion