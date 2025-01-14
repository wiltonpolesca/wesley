import { observer } from "mobx-react-lite"
import React, {  FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native"
import { type ContentStyle, FlashList } from "@shopify/flash-list"
import {
  Button,
  Card,
  EmptyState,
  Icon,
  Screen,

} from "../components"
 
import { Dropdown } from 'react-native-element-dropdown';
import { translate } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing, typography } from "../theme"
import { delay } from "../utils/delay"
import Config from "../config"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

 
type Estrutura = { label: string; value: string };

const ICON_SIZE = 14
const FAVORITOS =  '6';

export const DocumentosScreen: FC<DemoTabScreenProps<"Documentos">> = observer(function DocumentosScreen(_props) 
{
  const { episodeStore } = useStores()
 
  const [valueDropdown, setValueDropdown] = useState("");
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
 

  const [folderData, setFoderData] = useState<Estrutura[]>([]);

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {

    const getData = async () => {

   
      await setIsLoading(true)
      const pasta = await getEstrutura() 
     
      await setFoderData(pasta)
      await episodeStore.fetchEpisodes(FAVORITOS)
      await setIsLoading(false)
    }
 
     getData().catch(console.error);
   
  }, [])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([episodeStore.fetchEpisodes(FAVORITOS), delay(750)])
    setRefreshing(false)
  }
  async function manualRefreshpasta(numPasta:string) {
    setRefreshing(true)
    await Promise.all([episodeStore.fetchEpisodes(numPasta), delay(750)])
    setRefreshing(false)
  }

  return (
    
    <Screen
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top"]}
     >
       
   
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        fontFamily={typography.primary.normal}
        data={folderData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={translate("documentosScreen.inputDropdownPlaceholder")}
        searchPlaceholder={translate("documentosScreen.inputDropdownSearch")}
        value={valueDropdown}
        onChange={item => {
          setValueDropdown(item.value);
         
          manualRefreshpasta(item.value);
        }}
        renderLeftIcon={() => (
          <Icon
            size={24}
            icon="faFolderOpen"
            color={colors.palette.neutral800}
            style={styles.icon}
          />
        )}
      />
      <FlashList<Episode>
        contentContainerStyle={$listContentContainer}
        data={episodeStore.episodesForList.slice()}
        extraData={episodeStore.offline.length + episodeStore.episodes.length}
        refreshing={refreshing}
        estimatedItemSize={100}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx={
                   "documentosScreen.OnlineEmptyState.heading"
              }
              contentTx={
                
                   "documentosScreen.OnlineEmptyState.content"
              }
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

   

  const handlePressOffline = (numDod:string, nomArquivo:string) => {
    
     
  
    downloadArquivo(numDod,nomArquivo);

  }

  const handlePressCard = (numDod:string, nomArquivo:string ) => {
 
    downloadArquivo(numDod,nomArquivo);
  }

   
  return (
      <Card
        style={$item}
        verticalAlignment="force-footer-bottom"
        onPress={() => handlePressCard(episode.guid.toString(),episode.title)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        
        content={`${episode.parsedTitleAndSubtitle.title} - ${episode.description}`}
        
        
      />
  )
})

 

const styles = StyleSheet.create({
  dropdown: {
    marginLeft: spacing.lg,
    marginRight: spacing.lg,
    marginTop: spacing.xxs,
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

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxs,
  paddingBottom: spacing.lg,
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
  marginTop: spacing.xs,
}

const $toggle: ViewStyle = {
  marginTop: spacing.md,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $offlineButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.xs,
  justifyContent: "center",
  // backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral200,
  borderWidth: 0,
  paddingHorizontal: spacing.xs,
  paddingVertical: 0,
  minHeight: 18,
  alignSelf: "flex-start",
}

const $unOfflineButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  // backgroundColor: colors.palette.primary100,
}

const $offlineTextStyle: TextStyle = {
  textAlignVertical: "center",
  lineHeight: 24,
}

const $unOfflineTextStyle: TextStyle = {
  color: colors.primary,
}

const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginEnd: spacing.xs,
  alignItems: "center",
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

const $searchBarContainer: ViewStyle = {
  backgroundColor: colors.lightBackground,
  borderTopWidth: 0,
  borderBottomWidth: 0,
  paddingTop: spacing.md,
  paddingRight: spacing.lg,
  paddingBottom: spacing.md,
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

async function downloadArquivo(codigo: string, nomDoc: string) {
   

  const urlChamadaAPI = `${Config.API_URL}DocumentoPastas/baixararquivo/id/${codigo}/autor/${await AsyncStorage.getItem('codUsu')}/origem/documentos-ged.aspx/${await AsyncStorage.getItem('codSeqEmp') }/${await AsyncStorage.getItem('codGuid')}`;

 
    const response = await fetch(urlChamadaAPI, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar o arquivo para visualização: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = nomDoc;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
     
}


async function getEstrutura() {
  try {
    const enderecoAPI = `${await AsyncStorage.getItem('enderecoAPI')}EstruturaPastas/app/${await AsyncStorage.getItem('codSeqEmp')}/${await AsyncStorage.getItem('codGuid')}`;
    const token = await AsyncStorage.getItem('token');
    
    const response = await axios.get(enderecoAPI, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Adicionando o token Bearer no cabeçalho
      },
    });
    
    const estrutura:Estrutura[] = await response.data.map((item: any) => ({
      label: item.nome || item.label || 'Sem nome',  // Ajuste conforme a estrutura da resposta da API
      value: item.id || item.value || 'Sem valor',  // Ajuste conforme a estrutura da resposta da API
    }));
    
    return estrutura;

  } catch (error) {
    console.error('Erro:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}


// #endregion

