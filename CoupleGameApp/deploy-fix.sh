#!/bin/bash

echo "🔧 Corrigindo deploy do App do Casal..."
echo "👤 Usuário: stelarow"
echo "📁 Repositório: couple-game-app"
echo ""

# Verificar se está na pasta correta
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script dentro da pasta CoupleGameApp"
    exit 1
fi

# Configurar Git (remover conexão anterior se existir)
echo "🔗 Configurando repositório..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/stelarow/couple-game-app.git

# Verificar se Git está configurado
if ! git config user.name > /dev/null; then
    echo "⚙️ Configurando Git..."
    read -p "Digite seu nome para o Git: " git_name
    read -p "Digite seu email para o Git: " git_email
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
fi

# Inicializar Git se necessário
if [ ! -d ".git" ]; then
    echo "📁 Inicializando Git..."
    git init
fi

# Verificar se há mudanças para commitar
echo "📦 Preparando arquivos..."
git add .

# Fazer commit
echo "💾 Fazendo commit..."
git commit -m "🎉 App do Casal - Deploy corrigido para repositório próprio" || {
    echo "ℹ️ Nenhuma mudança para commitar"
}

# Fazer push
echo "🚀 Enviando para GitHub..."
git branch -M main
git push -u origin main

# Fazer deploy para web
echo "🌐 Fazendo deploy para web..."
npm run deploy

echo ""
echo "✅ Deploy concluído com sucesso!"
echo ""
echo "🎉 Seu app está disponível em:"
echo "🔗 https://stelarow.github.io/couple-game-app"
echo ""
echo "⏰ Aguarde 2-5 minutos para o GitHub processar o deploy."
echo "💕 Depois disso, vocês podem acessar o app e se divertir!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Aguardar alguns minutos"
echo "   2. Acessar o link acima"
echo "   3. Configurar nomes e fotos do casal"
echo "   4. Começar a usar o app!"