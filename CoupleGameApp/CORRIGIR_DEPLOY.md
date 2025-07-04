# 🔧 Corrigindo Deploy - App do Casal

## 🚨 **Problema Identificado:**
- ❌ Link `https://stelarow.github.io/HABIL/` redireciona para projeto "Habilidade"
- ❌ App do Casal não está sendo servido corretamente
- ❌ Conflito entre dois projetos no mesmo repositório

## ✅ **Solução: Criar Repositório Separado**

### **Passo 1: Criar Novo Repositório no GitHub**

1. **Acesse** [github.com](https://github.com) 
2. **Clique** em "New repository" (botão verde)
3. **Configure:**
   - Repository name: `couple-game-app`
   - Description: `App para gamificar relacionamentos`
   - Public ✅
   - Initialize with README ❌
4. **Clique** "Create repository"

### **Passo 2: Configurar Novo Deploy**

```bash
# 1. Navegar para a pasta do app
cd CoupleGameApp

# 2. Remover conexão anterior (se existir)
git remote remove origin

# 3. Conectar ao novo repositório
git remote add origin https://github.com/stelarow/couple-game-app.git

# 4. Atualizar homepage no package.json
```

**Edite `package.json` e mude:**
```json
"homepage": "https://stelarow.github.io/couple-game-app"
```

```bash
# 5. Fazer primeiro push
git add .
git commit -m "🎉 App do Casal - Deploy inicial"
git branch -M main
git push -u origin main

# 6. Deploy para web
npm run deploy
```

### **Passo 3: Resultado**

🎉 **Novo link do app:**
```
https://stelarow.github.io/couple-game-app
```

---

## 🔄 **Método 2: Subdiretório (Alternativo)**

Se quiser manter no mesmo repositório `HABIL`:

### **Opção A: App como subpasta**

```bash
# 1. Configurar para subdiretório
# Editar package.json:
"homepage": "https://stelarow.github.io/HABIL/couple-app"

# 2. Deploy
npm run deploy
```

**Link seria:** `https://stelarow.github.io/HABIL/couple-app`

### **Opção B: Trocar projeto principal**

Se quiser que o **App do Casal seja o principal**:

```bash
# 1. Configurar como raiz
# Editar package.json:
"homepage": "https://stelarow.github.io/HABIL"

# 2. Deploy (substituirá a página habilidade)
npm run deploy
```

**Link seria:** `https://stelarow.github.io/HABIL` (app do casal)

---

## 🎯 **Recomendação: Método 1 (Repositório Separado)**

### **Vantagens:**
- ✅ **Links únicos** para cada projeto
- ✅ **Projetos independentes** (não interferem)
- ✅ **Organização melhor** 
- ✅ **Fácil manutenção**

### **Resultado Final:**
- 📊 **Projeto Habilidade:** `https://stelarow.github.io/HABIL/`
- 💕 **App do Casal:** `https://stelarow.github.io/couple-game-app/`

---

## 🚀 **Comandos Completos - Método Recomendado**

```bash
# 1. Entrar na pasta do app
cd CoupleGameApp

# 2. Configurar novo repositório
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/stelarow/couple-game-app.git

# 3. Atualizar package.json (homepage)
# Manual: editar "homepage": "https://stelarow.github.io/couple-game-app"

# 4. Deploy completo
git add .
git commit -m "🎉 App do Casal - Repositório próprio"
git push -u origin main
npm run deploy

# 5. Acessar em:
# https://stelarow.github.io/couple-game-app
```

---

## ⚙️ **Script Automático**

**Crie um arquivo `deploy-fix.sh`:**

```bash
#!/bin/bash
echo "🔧 Corrigindo deploy do App do Casal..."

# Atualizar package.json
sed -i 's|"homepage": ".*"|"homepage": "https://stelarow.github.io/couple-game-app"|' package.json

# Configurar Git
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/stelarow/couple-game-app.git

# Deploy
git add .
git commit -m "🎉 App do Casal - Deploy corrigido"
git push -u origin main
npm run deploy

echo "✅ Deploy concluído!"
echo "🌐 Acesse: https://stelarow.github.io/couple-game-app"
```

**Execute:**
```bash
chmod +x deploy-fix.sh
./deploy-fix.sh
```

---

## 📋 **Checklist Final**

- [ ] Criar repositório `couple-game-app` no GitHub
- [ ] Atualizar `homepage` no package.json
- [ ] Conectar ao novo repositório
- [ ] Fazer push do código
- [ ] Executar `npm run deploy`
- [ ] Aguardar 5 minutos
- [ ] Acessar `https://stelarow.github.io/couple-game-app`

---

## 🎉 **Resultado Esperado**

**Após executar os passos:**

1. ✅ **Projeto Habilidade** continua em `stelarow.github.io/HABIL/`
2. ✅ **App do Casal** funcionando em `stelarow.github.io/couple-game-app/`
3. ✅ **Projetos independentes** - não interferem
4. ✅ **Links únicos** para compartilhar

**💕 Agora vocês terão o link exclusivo do app do casal para usar e compartilhar!**