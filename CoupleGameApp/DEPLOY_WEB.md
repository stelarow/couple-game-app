# 🌐 Deploy Web - App do Casal

## 🚀 Como Publicar o App na Web

### 📋 Opções de Hospedagem
- ✅ **GitHub Pages** (gratuito)
- ✅ **Netlify** (gratuito)
- ✅ **Vercel** (gratuito)
- ✅ **Expo Web Hosting** (gratuito)

---

## 🔥 **Método 1: GitHub Pages (Recomendado)**

### 1. **Prepare o projeto para web:**
```bash
cd CoupleGameApp

# Instalar dependências web (se não fez ainda)
npx expo install react-dom react-native-web @expo/metro-runtime

# Testar localmente
npm run web
```

### 2. **Fazer build para produção:**
```bash
# Build para web
npx expo export --platform web

# Isso cria a pasta dist/ com os arquivos estáticos
```

### 3. **Configurar GitHub Pages:**

#### **Opção A: Usando gh-pages (Automático)**
```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar scripts ao package.json
```

**Adicione ao `package.json`:**
```json
{
  "scripts": {
    "predeploy": "npx expo export --platform web",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://SEU-USUARIO.github.io/SEU-REPOSITORIO"
}
```

```bash
# Fazer deploy
npm run deploy
```

#### **Opção B: Manual**
1. **Faça o build:** `npx expo export --platform web`
2. **Crie um repositório** no GitHub
3. **Suba os arquivos** da pasta `dist/` para o branch `gh-pages`
4. **Ative GitHub Pages** nas configurações do repositório

### 4. **Acessar o app:**
- URL: `https://SEU-USUARIO.github.io/SEU-REPOSITORIO`

---

## ⚡ **Método 2: Netlify (Mais Fácil)**

### 1. **Build do projeto:**
```bash
npx expo export --platform web
```

### 2. **Deploy no Netlify:**
- Acesse [netlify.com](https://netlify.com)
- Arraste a pasta `dist/` para o Netlify
- URL automática gerada!

### 3. **Deploy contínuo (opcional):**
- Conecte seu repositório GitHub
- Netlify fará build automático a cada commit

**Configurações de build no Netlify:**
- **Build command:** `npx expo export --platform web`
- **Publish directory:** `dist`

---

## 🔧 **Método 3: Vercel**

### 1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

### 2. **Deploy:**
```bash
# Build
npx expo export --platform web

# Deploy
vercel --prod
```

### 3. **Configurar vercel.json:**
```json
{
  "buildCommand": "npx expo export --platform web",
  "outputDirectory": "dist",
  "framework": "react"
}
```

---

## 🌟 **Método 4: Expo Web Hosting**

### 1. **Login no Expo:**
```bash
npx expo login
```

### 2. **Publish:**
```bash
npx expo publish --platform web
```

### 3. **Acessar:**
- URL: `https://expo.dev/@SEU-USUARIO/SEU-APP`

---

## ⚙️ **Configurações Específicas para Web**

### 1. **Atualizar app.json:**
```json
{
  "expo": {
    "name": "App do Casal",
    "slug": "couple-game-app",
    "platforms": ["ios", "android", "web"],
    "web": {
      "favicon": "./assets/favicon.ico",
      "name": "App do Casal",
      "shortName": "CoupleApp",
      "lang": "pt-BR",
      "backgroundColor": "#667eea",
      "themeColor": "#667eea",
      "description": "App para gamificar relacionamentos"
    }
  }
}
```

### 2. **Criar favicon (opcional):**
- Adicione `favicon.ico` na pasta `assets/`
- Tamanho: 32x32 ou 64x64 pixels

### 3. **PWA (App Web Progressivo):**
```json
{
  "expo": {
    "web": {
      "manifest": {
        "name": "App do Casal",
        "short_name": "CoupleApp",
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#667eea",
        "background_color": "#667eea"
      }
    }
  }
}
```

---

## 📱 **Limitações na Web vs Mobile**

### ✅ **Funciona na Web:**
- ✅ Navegação entre telas
- ✅ Sorteio de filmes
- ✅ Roleta de atividades (animações)
- ✅ Cadastro de dados
- ✅ Armazenamento local (localStorage)
- ✅ Design responsivo

### ⚠️ **Limitações na Web:**
- ❌ **Seleção de fotos** (ImagePicker funciona diferente)
- ❌ **Haptic feedback** (vibração)
- ❌ **Permissões nativas**
- ⚠️ **Performance** (animações mais lentas que mobile)

### 🔧 **Soluções para Web:**

#### **Upload de Fotos na Web:**
```tsx
// Substitua ImagePicker por input file na web
import { Platform } from 'react-native';

const pickImage = async () => {
  if (Platform.OS === 'web') {
    // Usar input file HTML
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUri = event.target.result;
        // Salvar image URI
      };
      reader.readAsDataURL(file);
    };
    input.click();
  } else {
    // Usar ImagePicker normal no mobile
  }
};
```

---

## 🎯 **Exemplo Prático - Deploy Completo**

### 1. **Preparar repositório:**
```bash
cd CoupleGameApp
git init
git add .
git commit -m "App do Casal - Primeira versão"
git remote add origin https://github.com/SEU-USUARIO/couple-game-app.git
git push -u origin main
```

### 2. **Build e deploy:**
```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json
echo '{
  "homepage": "https://SEU-USUARIO.github.io/couple-game-app",
  "scripts": {
    "predeploy": "npx expo export --platform web",
    "deploy": "gh-pages -d dist"
  }
}' >> package.json

# Deploy
npm run deploy
```

### 3. **Configurar GitHub Pages:**
- Ir para **Settings** > **Pages**
- Source: **Deploy from a branch**
- Branch: **gh-pages**
- Folder: **/ (root)**

### 4. **Acessar:**
- URL: `https://SEU-USUARIO.github.io/couple-game-app`

---

## 🌟 **Dicas de Otimização Web**

### Performance:
```bash
# Build otimizado
npx expo export --platform web --dev false --minify true
```

### SEO:
```json
{
  "expo": {
    "web": {
      "meta": {
        "title": "App do Casal - Gamifique seu relacionamento",
        "description": "Sorteie filmes e atividades para casais",
        "keywords": "casal, relacionamento, jogos, filmes, atividades"
      }
    }
  }
}
```

### Analytics (opcional):
```json
{
  "expo": {
    "web": {
      "analytics": {
        "gtag": "GA-XXXXXXXXX"
      }
    }
  }
}
```

---

## 🚀 **Comandos Resumidos**

```bash
# Deploy GitHub Pages
npm install --save-dev gh-pages
npx expo export --platform web
npm run deploy

# Deploy Netlify
npx expo export --platform web
# Arrastar pasta dist/ para netlify.com

# Deploy Vercel
npx expo export --platform web
vercel --prod

# Testar local
npm run web
```

---

**🎉 Pronto! Seu app estará disponível na web para o mundo todo acessar!**

**💡 Dica:** Use GitHub Pages para hospedar gratuitamente e compartilhar com amigos!