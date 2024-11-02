import React, { FC, useEffect, } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, ActivityIndicator, ImageStyle, TextStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { delay } from "../utils/delay"
import { Text, Icon, IconTypes, EmptyState, Screen } from "app/components"
import { colors, spacing } from 'app/theme'



const notificacoes = [
  {
    id: '1',
    icon: 'faSino', 
    title: 'Nova Mensagem',
    description: 'Você tem uma nova mensagem de suporte.',
    date: '15 setembro',
  },
  {
    id: '2',
    icon: 'faSino', 
    title: 'Atualização Disponível',
    description: 'Uma nova versão do app está disponível para download.',
    date: '15 setembro',
  },
  {
    id: '3',
    icon: 'faSino', 
    title: 'Atualização Disponível',
    description: 'Uma nova versão do app está disponível para download.',
    date: '15 setembro',
  },
  {
    id: '4',
    icon: 'faSino', 
    title: 'Atualização Disponível',
    description: 'Uma nova versão do app está disponível para download.',
    date: '15 setembro',
  },
  {
    id: '5',
    icon: 'faSino', 
    title: 'Atualização Disponível',
    description: 'Uma nova versão do app está disponível para download.',
    date: '15 setembro',
  },
  {
    id: '6',
    icon: 'faSino', 
    title: 'Atualização Disponível',
    description: 'Uma nova versão do app está disponível para download.',
    date: '15 setembro',
  },
  {
    id: '7',
    icon: 'faDocumentos', 
    title: 'Atualização Disponível',
    description: 'Uma nova versão do app está disponível para download.',
    date: '15 setembro',
  },
  // Adicione mais notificações conforme necessário
]

interface NotificacoesScreenProps extends AppStackScreenProps<"Notificacoes"> {}

export const NotificacoesScreen: FC<NotificacoesScreenProps> = observer(function NotificacoesScreen(_props) {
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await delay(750) // Simulate a loading delay
      setIsLoading(false)
    })()
  }, [])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await delay(750) // Simulate a longer refresh delay
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed">
      <FlatList
        data={notificacoes}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        contentContainerStyle={$listContentContainer}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx={"notificacoesScreen.emptyStateTitle"}
              contentTx={"notificacoesScreen.emptyStateText"}
              buttonTx={"notificacoesScreen.emptyStateButtonText"}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        renderItem={({ item }) => (
          <View style={$notificationCardContainer}>
            <Icon icon={item.icon as IconTypes} color={colors.neutralState} containerStyle={$notificationCardIcon} size={24} />
            <View style={$notificationCardtextContainer}>
              <Text style={$notificationCardDate}>{item.date}</Text>
              <Text style={$notificationCardTitle}>{item.title}</Text>
              <Text style={$notificationCardDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </Screen>
  )
})

// #region Styles
const $emptyState: ViewStyle = {
  marginTop: spacing.xxxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}
const $notificationCardContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  backgroundColor: colors.palette.neutral100,
  padding: spacing.md,

  borderColor: colors.border,
  borderBottomWidth: 1,
}

const $notificationCardIcon: ViewStyle = {
  marginRight: spacing.md,
  marginTop: 30,
}

const $notificationCardtextContainer: ViewStyle = {
  flex: 1,
}

const $notificationCardDate: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral500,
  textTransform: "uppercase",
}

const $notificationCardTitle: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  color: colors.text,
}

const $notificationCardDescription: TextStyle = {
  fontSize: 14,
  color: colors.textDim,
}

const $listContentContainer: ViewStyle = {
  paddingHorizontal: spacing.sm,
}
// #endregion