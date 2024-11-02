import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    authPassword: "",
    authMensagem: "",
  })
  .views((store) => ({
    get isAuthenticated() {
      
      
  
      return !!store.authToken
    },
    get validationError() {
 
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
       
 
      if (store.authMensagem.length > 0 && store.authPassword.length > 0) return "Usuario ou senha invalidos! "


      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = undefined

      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, "")
    },
    setAuthMensagem(value: string) {
      store.authMensagem = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
      store.authPassword = ""
      store.authMensagem = ""
    },
  }))


  

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
