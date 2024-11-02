import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { Episode, EpisodeModel } from "./Episode"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const EpisodeStoreModel = types
  .model("EpisodeStore")
  .props({
    episodes: types.array(EpisodeModel),
    offline: types.array(EpisodeModel),
    offlineOnly: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchEpisodes(numPasta: string) {
      const response = await api.getEpisodes(numPasta)
       
      
      if (response.kind === "ok") {
        
        store.setProp("episodes", response.episodes)
      } else {
        console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      }
    },
    addOffline(episode: Episode) {
      
      store.offline.push(episode)
    },
    removeOffline(episode: Episode) {
      store.offline.remove(episode)
    },
  }))
  .views((store) => ({
    get episodesForList() {
      return store.offlineOnly ? store.offline : store.episodes
    },

    hasOffline(episode: Episode) {
      return store.offline.includes(episode)
    },
  }))
  .actions((store) => ({
    toggleOffline(episode: Episode) {
      if (store.hasOffline(episode)) {
        store.removeOffline(episode)
      } else {
        store.addOffline(episode)
      }
    },
  }))

export interface EpisodeStore extends Instance<typeof EpisodeStoreModel> {}
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof EpisodeStoreModel> {}
