# Daily Diet

Aplicativo móvel para registrar e acompanhar refeições diárias, auxiliando no controle de uma dieta.

## Funcionalidades

- **Cadastrar refeições** com nome, descrição, data, horário e indicação se está dentro ou fora da dieta
- **Editar refeições** já cadastradas
- **Excluir refeições** com confirmação antes da remoção
- **Visualizar estatísticas** da dieta: percentual dentro da dieta, melhor sequência e sequência atual
- **Tela de feedback** após o cadastro, informando se a refeição está dentro ou fora da dieta
- **Armazenamento local** com AsyncStorage

## Telas

| Tela | Descrição |
|------|-----------|
| **Home** | Lista de refeições agrupadas por data (SectionList) com percentual de progresso |
| **Nova / Editar Refeição** | Formulário com validação para cadastrar ou editar refeições |
| **Detalhes da Refeição** | Visualização completa com opções de editar e excluir |
| **Estatísticas** | Percentual dentro da dieta, melhor e atual sequência, totais |
| **Feedback** | Tela informativa exibida após o cadastro de uma refeição |

## Tecnologias

- **React Native** com Expo SDK 54
- **TypeScript**
- **React Navigation** (Native Stack) — navegação entre telas
- **styled-components** — estilização com CSS-in-JS
- **AsyncStorage** — persistência local dos dados
- **React Hooks** — gerenciamento de estado

## Como executar

### Pré-requisitos

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`) ou Expo Go no dispositivo
- iOS Simulator / Android Emulator ou dispositivo físico com Expo Go

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd ReactNativeStudy

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### Executar no dispositivo

```bash
# iOS
npm run ios

# Android
npm run android
```

Ou escaneie o QR Code gerado com o aplicativo **Expo Go** no seu dispositivo.

## Estrutura do projeto

```
src/
├── app/
│   ├── Home/              # Tela inicial com lista de refeições
│   ├── NovaRefeicao/      # Tela de cadastro e edição
│   ├── DetalhesRefeicao/  # Tela de detalhes com editar/excluir
│   ├── Estatisticas/      # Tela de estatísticas da dieta
│   └── Feedback/          # Tela de feedback pós cadastro
├── components/
│   ├── Button/            # Botão reutilizável (primário/secundário)
│   ├── Input/             # Campo de entrada com label
│   └── RefeicaoCard/      # Card de refeição na lista
├── routes/
│   └── index.tsx          # Configuração da navegação
├── storage/
│   └── refeicaoStorage.ts # Funções de CRUD com AsyncStorage
├── theme/
│   └── index.ts           # Cores e tamanhos de fonte
└── types/
    └── Refeicao.ts        # Interface da refeição
```
