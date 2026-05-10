# Sistema de Metas Financeiras

Aplicativo mobile para criação e acompanhamento de metas financeiras, com registro de transações de entrada e saída e resumo do saldo por meta.

## Como rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Gerar os arquivos nativos

```bash
npx expo prebuild
```

### 3. Instalar as dependências nativas do banco de dados (SQLite)

**iOS:**
```bash
cd ios && pod install && cd ..
```

**Android:** nenhuma etapa adicional é necessária.

### 4. Rodar o app

**iOS:**
```bash
npx expo run:ios
```

**Android:**
```bash
npx expo run:android
```

> O banco de dados SQLite (`financeiro.db`) é criado e migrado automaticamente na primeira execução do app.
