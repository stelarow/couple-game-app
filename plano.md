# Plano de Reinicialização do Projeto: Couple Game App 2.0

## 1. Objetivo

Recomeçar o projeto "Couple Game App" do zero, utilizando um template moderno e as melhores práticas de desenvolvimento para garantir estabilidade, escalabilidade e uma ótima experiência para o desenvolvedor.

## 2. Tecnologias Escolhidas

Após pesquisa, a base do nosso projeto será o template **`expo-starter/expo-template`**. Ele foi escolhido por incluir as seguintes tecnologias de ponta:

*   **Runtime e Pacotes:** [Bun](https://bun.sh/) (um toolkit de JavaScript extremamente rápido).
*   **Framework:** [Expo (SDK 51)](https://expo.dev/) para desenvolvimento universal (iOS, Android, Web).
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/).
*   **Navegação:** [Expo Router v3](https://docs.expo.dev/router/introduction/) (roteamento baseado em arquivos).
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/) via [NativeWind v4](https://www.nativewind.dev/) (para estilização rápida e consistente).
*   **Persistência de Dados:** [SQLite](https://www.sqlite.org/index.html) com [DrizzleORM](https://orm.drizzle.team/) (para armazenamento local, se necessário).
*   **CI/CD:** Configuração básica para [EAS (Expo Application Services)](https://expo.dev/eas) e [GitHub Actions](https://github.com/features/actions).

## 3. Plano de Execução

O processo será dividido nas seguintes etapas:

### Fase 1: Preparação do Ambiente (Executado pelo Assistente)

1.  **Limpeza do Diretório (Passo Atual):**
    *   Apagar todos os arquivos e pastas do projeto atual, **exceto este arquivo `plano.md`**, para preparar o terreno para a nova estrutura.

2.  **Inicialização do Novo Projeto:**
    *   Utilizar o comando `bunx create-expo-app` com o template escolhido para criar a nova estrutura de projeto. O nome do projeto será mantido como `couple-game-app`.

### Fase 2: Desenvolvimento da Funcionalidade Core

O objetivo desta fase é recriar as funcionalidades essenciais da aplicação original na nova arquitetura.

1.  **Estrutura de Navegação:**
    *   Configurar o layout de abas (Tab Navigator) usando o Expo Router.
    *   Criar as três telas principais: `(tabs)/home.tsx`, `(tabs)/movie-picker.tsx` e `(tabs)/activity-wheel.tsx`.

2.  **Desenvolvimento da Tela `Home`:**
    *   Recriar a interface da tela inicial.
    *   Implementar a lógica para exibir fotos do casal e informações do relacionamento (estes dados serão mockados inicialmente).

3.  **Desenvolvimento da Tela `Movie Picker` (Sorteio de Filmes):**
    *   Criar a interface para adicionar, listar e remover filmes.
    *   Implementar a lógica de sorteio de um filme aleatório.
    *   Utilizar o SQLite (já incluso no template) para persistir a lista de filmes.

4.  **Desenvolvimento da Tela `Activity Wheel` (Roleta de Atividades):**
    *   Criar a interface da roleta.
    *   Implementar a lógica de cadastro de atividades.
    *   Implementar a animação da roleta para sortear uma atividade.

### Fase 3: Deploy e Validação

1.  **Configuração de Deploy para Web:**
    *   Analisar a configuração de deploy para GitHub Pages fornecida pelo novo template.
    *   Ajustar os scripts em `package.json` se necessário, garantindo que o processo de build e publicação seja robusto.

2.  **Execução do Deploy:**
    *   Realizar o deploy da nova versão da aplicação para o GitHub Pages.

3.  **Validação:**
    *   Verificar se a aplicação está funcionando corretamente no ambiente de produção. 