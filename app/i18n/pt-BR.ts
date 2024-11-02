import demoPtBR from "./demo-pt-BR"

const ptBR = {
  common: {
    ok: "OK!",
    cancel: "Cancelar",
    back: "Voltar",
    logOut: "Sair da minha conta",
  },
  welcomeScreen: {
    postscript:
      "psst — Isso provavelmente não é como o seu aplicativo se parece. (A menos que seu designer tenha lhe entregue essas telas, e nesse caso, publique isso!)",
    readyForLaunch: "Seu aplicativo, quase pronto para lançamento!",
    exciting: "(ohh, isso é empolgante!)",
    letsGo: "Vamos lá!",
  },
  errorScreen: {
    title: "Algo deu errado!",
    friendlySubtitle:
      "Copie o código do erro e repasse para nosso suporte.",
    reset: "REINICIAR APP",
    traceTitle: "Erro da pilha %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "Nenhum registro encontrado",
      content: "Tente clicar no botão para atualizar ou recarregar o aplicativo.",
      button: "Atualizar e tentar novamente",
    },
  },

  errors: {
    invalidEmail: "Endereço de e-mail inválido.",
  },
  loginScreen: {
    logIn: "Login QualiSys",
    enterDetails:
      "Digite seu usuário e senha para acessar o sistema",
    emailFieldLabel: "Usuário",
    passwordFieldLabel: "Senha",
    emailFieldPlaceholder: "Informe seu usuário",
    passwordFieldPlaceholder: "Informe sua senha",
    tapToLogIn: "Entrar",
    hint: "Dica: digite o mesmo usuário e senha que usa para acessar o sistema no computador.",
  },
  notificacoesScreen: {
    screenName: "Notificações",
    emptyStateTitle: "Você ainda não tem notificações",
    emptyStateText: "Consulte aqui as notificações recebidas no app",
    emptyStateButtonText: "Atualizar",
  },
  demoNavigator: {
    homeTab: "Início",
    documentosTab: "Documentos",
    formulariosTab: "Checklists",
    ouvidoriasTab: "Ouvidoria",
    anexosTab: "Anexos",
  },
  homeScreen: {
    title: "Home",
    saudacao: "Olá, {{nome}}",
    tagLine:
      "Você está conectado ao Sistema QualiSys da sua empresa. Selecione uma opção abaixo para começar:",
  },
  documentosScreen: {
    title: "Procedimentos e Documentos",
    subTitle: "Seus documentos",
    searchBarPlaceHolder: "Pesquisar...",
    inputDropdownPlaceholder: "Selecione uma pasta",
    inputDropdownSearch: "Pesquisar Pasta...",
    availableOffline: "Disponível offline",
    unavailableOffline: "Manter offline",
    onlyOffline: "Mostrar disponíveis offline",
    offlineButton: "Manter offline",
    unofflineButton: "Remover offline",
    noOfflineEmptyState: {
      heading: "Nenhum documento econtrado",
      content:
        "Quando conectado à internet, clique no botão 'Manter offline' para copiar o documento para o seu dispositivo.",
    },
    OnlineEmptyState: {
      heading: "Nenhum documento econtrado",
      content:
        "Tente clicar no botão para atualizar ou recarregar o aplicativo.",
    },
  },
  listaOuvidoriaScreen: {
    screenName: "Ouvidoria",
    subTitleAbaNovos: "Manifestações ouvidoria",
    subTitleAbaEnviados: "Manifestações enviadas",
    searchBarPlaceHolder: "Pesquisar...",
    actionBtnName: "Registrar",
    btnGoForm: "Responder",
    btnViewForm: "Visualizar",
    sentDateTitle: "ENVIADO",
    formsDisponiveis: "Disponíveis",
    formsRespondidos: "Enviadas",
    filter: {
      novas: "Novas",
      enviadas: "Enviadas",
    },
    inputDropdownPlaceholder: "Filtrar por categoria",
    availableOffline: "Disponível offline",
    unavailableOffline: "Manter offline",
    onlyOffline: "Mostrar disponíveis offline",
    offlineButton: "Manter offline",
    unofflineButton: "Remover offline",
    noOfflineEmptyState: {
      heading: "Nenhum formulário disponível offline.",
      content:
        "Quando estiver conectado à internet, clique no botão 'Manter offline' para copiar o documento para o seu dispositivo.",
    },
  },
  questionarioScreen: {
    screenName: "Manifestação Ouvidoria",
    title: "Conecte-se com a comunidade",
    inputDropdownPlaceholder: "Selecione o tipo",
    form: {
      nameLabel: "label",
      namePlaceholder: "placeholder",
      nameHelper: "helper",
      txConfirmBtn: "Enviar",
      txCancelBtn: "Cancelar",
      inputTituloLabel: "Título",
      inputTituloPlaceholder: "Escreva um título",
      inputTipoLabel: "Tipo",
      inputTipoPlaceholder: "",
      inputDescLabel: "Descrição (opcional)",
      inputDescPlaceholder: "Adicione uma descrição",
    },
  },
  formulariosScreen: {
    screenName: "Formulários e Checklist",
    subTitleAbaNovos: "Checklists disponíveis",
    subTitleAbaEnviados: "Checklists respondidos",
    searchBarPlaceHolder: "Pesquisar...",
    actionBtnName: "Registrar",
    btnGoForm: "Iniciar",
    btnViewForm: "Visualizar",
    sentDateTitle: "RESPONDIDO",
    formsDisponiveis: "Disponíveis",
    formsRespondidos: "Respondidos",
    filter: {
      novas: "Novas",
      enviadas: "Enviadas",
    },
    inputDropdownPlaceholder: "Filtrar por categoria",
    availableOffline: "Disponível offline",
    unavailableOffline: "Manter offline",
    onlyOffline: "Mostrar disponíveis offline",
    offlineButton: "Manter offline",
    unofflineButton: "Remover offline",
    noOfflineEmptyState: {
      heading: "Nenhum formulário disponível offline.",
      content:
        "Quando estiver conectado à internet, clique no botão 'Manter offline' para copiar o documento para o seu dispositivo.",
    },
  },
  checklistScreen: {
    screenName: "Checklist",
    title: "Conecte-se com a comunidade",
    inputDropdownPlaceholder: "Selecione uma opção",
    form: {
      nameLabel: "label",
      namePlaceholder: "placeholder",
      nameHelper: "helper",
      txConfirmBtn: "Enviar",
      txCancelBtn: "Cancelar",
      inputTituloLabel: "Título",
      inputTituloPlaceholder: "Escreva um título",
      inputTipoLabel: "Tipo",
      inputTipoPlaceholder: "",
      inputDescLabel: "Descrição (opcional)",
      inputDescPlaceholder: "Adicione uma descrição",
      titlePrequest: "Identificação",
    },
  },
  anexosScreen: {
    screenName: "Anexos / Comprovantes",
    subTitle: "Enviar novo arquivo",
    descText: "Selecione um arquivo do seu dispositivo",
    filesListTitle: "Arquivos enviados",
    uploadBtnTitle: "Selecionar arquivo",
    uploadDescription: "Arquivos permitidos: PDF, JPG, PNG"
  },
  anexosUploadScreen: {
    screenName: "Enviar novo arquivo",
    inputDropdownPlaceholder: "Selecione o tipo",
    form: {
      nameLabel: "label",
      namePlaceholder: "placeholder",
      nameHelper: "helper",
      txConfirmBtn: "Enviar",
      txCancelBtn: "Cancelar",
      inputTituloLabel: "Título",
      inputTituloPlaceholder: "Escreva um título",
      inputTipoLabel: "Tipo",
      inputTipoPlaceholder: "",
      inputDescLabel: "Descrição (opcional)",
      inputDescPlaceholder: "Adicione uma descrição para o arquivo",
    },
  },
  demoShowroomScreen: {
    jumpStart: "Componentes para iniciar seu projeto!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Eba",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },

  ...demoPtBR,
}

export default ptBR
export type Translations = typeof ptBR
