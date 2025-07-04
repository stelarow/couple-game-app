# 💕 App do Casal - Couple Game App

Um aplicativo mobile desenvolvido com React Native/Expo para gamificar relacionamentos românticos! 

## 🎯 Funcionalidades Principais

### 🏠 Tela Inicial (Home)
- **Fotos Personalizáveis**: Espaços para adicionar fotos do casal
- **Informações do Relacionamento**: Nomes, tempo juntos e objetivos
- **Interface Animada**: Coração pulsante e animações suaves
- **Tema Romântico**: Design com gradientes e cores aconchegantes

### 🎬 Sorteio de Filmes
- **Sistema de Sorteio**: Algoritmo para escolher filmes aleatoriamente
- **Cadastro de Filmes**: Adicione título, gênero, duração e nota
- **Lista Organizada**: Visualize todos os filmes cadastrados
- **Animações Interativas**: Ícone rotativo durante o sorteio
- **Gerenciamento**: Adicione e remova filmes facilmente

### 🎯 Roleta de Atividades
- **Roleta Animada**: Roleta visual com segmentos coloridos
- **Cadastro de Atividades**: Nome, categoria e nível de dificuldade
- **Sistema de Categorias**: Organize atividades por tipo
- **Níveis de Dificuldade**: Fácil, Médio e Difícil com cores distintas
- **Física Realista**: Animação de rotação com easing natural

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **React Native Reanimated** - Animações avançadas
- **React Native SVG** - Gráficos vetoriais para a roleta
- **AsyncStorage** - Persistência local de dados
- **Expo Linear Gradient** - Gradientes visuais
- **React Native Animatable** - Animações simples
- **Expo Image Picker** - Seleção de fotos
- **Expo Vector Icons** - Ícones do app

## 📱 Estrutura do Projeto

```
CoupleGameApp/
├── src/
│   ├── components/
│   │   └── AnimatedWheel.tsx    # Componente da roleta animada
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Tela inicial com fotos
│   │   ├── MoviePickerScreen.tsx # Tela de sorteio de filmes
│   │   └── ActivityWheelScreen.tsx # Tela da roleta
│   ├── types/
│   │   └── index.ts             # Definições TypeScript
│   ├── utils/
│   │   └── storage.ts           # Funções de armazenamento
│   └── data/
├── App.tsx                      # Configuração principal e navegação
└── package.json                 # Dependências do projeto
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Dispositivo móvel com Expo Go ou emulador

### Passos para execução

1. **Clone o repositório**
   ```bash
   git clone <seu-repositorio>
   cd CoupleGameApp
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm start
   # ou
   expo start
   ```

4. **Abra no dispositivo**
   - Use o Expo Go para escanear o QR code
   - Ou execute em emulador com `npm run android` ou `npm run ios`

## 🎮 Como Usar

### Configuração Inicial
1. **Configure o Casal**: Na tela inicial, toque no ícone de configurações para adicionar nomes
2. **Adicione Fotos**: Toque nos espaços de foto para selecionar imagens da galeria
3. **Dados Salvos**: Todas as informações são salvas automaticamente

### Sorteio de Filmes
1. **Adicione Filmes**: Toque no botão "+" para cadastrar filmes
2. **Sorteie**: Toque em "Sortear Filme" para uma escolha aleatória
3. **Gerencie**: Visualize e remova filmes da lista

### Roleta de Atividades  
1. **Cadastre Atividades**: Use o botão "+" para adicionar novas atividades
2. **Gire a Roleta**: Toque em "Girar Roleta!" para começar a animação
3. **Aguarde o Resultado**: A roleta girará e escolherá uma atividade

## 📦 Dados Padrão

O app vem com dados de exemplo pré-cadastrados:

**Filmes Padrão:**
- A Origem (Ficção Científica)
- La La Land (Romance)
- Parasita (Thriller)
- Your Name (Animação)
- Cidade de Deus (Drama)

**Atividades Padrão:**
- Cozinhar juntos
- Fazer um piquenique
- Massagem relaxante
- Dançar na sala
- Jogar videogame
- Caminhada no parque
- Noite de spa caseiro
- Pintar ou desenhar juntos

## 🎨 Design e UX

- **Gradientes Românticos**: Cores suaves e aconchegantes
- **Animações Fluidas**: Transições suaves entre estados
- **Interface Intuitiva**: Navegação simples e clara
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Acessibilidade**: Ícones claros e texto legível

## 🔧 Personalização

### Modificar Cores
Edite os gradientes nos arquivos de tela:
- Home: `['#667eea', '#764ba2']`
- Filmes: `['#f093fb', '#f5576c']`
- Atividades: `['#4facfe', '#00f2fe']`

### Adicionar Novas Categorias
No arquivo `storage.ts`, modifique as funções de inicialização para incluir seus próprios dados padrão.

## 📱 Funcionalidades Futuras

- [ ] Sincronização em nuvem
- [ ] Estatísticas de uso
- [ ] Temas personalizáveis
- [ ] Sistema de pontuação
- [ ] Lembretes de atividades
- [ ] Histórico de sorteios
- [ ] Compartilhamento social

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões e melhorias são sempre bem-vindas!

## 📄 Licença

Projeto desenvolvido para uso pessoal. Sinta-se livre para usar como base para seus próprios projetos!

---

**Desenvolvido com ❤️ para casais que querem adicionar mais diversão ao relacionamento!**