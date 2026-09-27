# NUGEO / UEMA

Tema WordPress de avaliação, preservando a identidade do frontend original.

## Estrutura
- `frontend/nugeo-web`: protótipo React e ferramentas de build/teste.
- `wordpress/nugeo`: tema PHP instalável, sem React no navegador.
- `wordpress/seed-local.php`: conteúdo demonstrativo da instalação local (não vai no ZIP).
- `.local-wordpress`: WordPress e banco SQLite locais, ignorados pelo Git.
- `releases`: ZIP e resultados da auditoria, ignorados pelo Git.

## Compilar
Dentro de `frontend/nugeo-web`, com as dependências npm instaladas:

```powershell
npm run lint
npm run build
npm run build:theme
```

O último comando compila Tailwind/CSS e copia a identidade visual para `wordpress/nugeo/assets`.
Não execute Node nem instale dependências no servidor WordPress; o ZIP contém os assets prontos.

## WordPress local
Na raiz deste repositório, execute:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-wordpress.ps1
```

O primeiro uso baixa o WordPress Playground. Requer internet e Node compatível com o CLI.
O script fixa Playground 3.1.55, WordPress 7.1.2, PHP 8.3 e a porta 9400.
Site: http://127.0.0.1:9400/ — painel: http://127.0.0.1:9400/wp-admin/.
O usuário e a senha local são gerados em `wordpress/.local-access.json`, ignorado pelo Git e excluído do ZIP.
Os dados permanecem em `.local-wordpress`; não apague essa pasta para reiniciar o servidor.
O tema é montado diretamente do código fonte. Depois de editar CSS, rode `npm run build:theme`.
O conteúdo de demonstração é criado uma única vez e é explicitamente identificado.
Esse ambiente é para avaliação local, não para produção. A compatibilidade em MySQL/hospedagem ainda requer homologação.

## Testar e empacotar
Com o WordPress local em execução, dentro de `frontend/nugeo-web`:

```powershell
npm run test:theme
```

O teste usa o Edge instalado e Playwright. Verifica a instância demonstrativa, layouts, axe, navegação, busca, 404 e animações.
Para empacotar, na raiz:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/package-theme.ps1
```

Envie `releases/nugeo-uema-0.1.0.zip` em Aparência → Temas → Adicionar tema → Enviar tema.
O ZIP não cria páginas, notícias ou dados: a ativação preserva o conteúdo existente.

## Editar o conteúdo
- Aparência → Personalizar → NUGEO — Página inicial: título, destaque, descrição, imagem e contato.
- Aparência → Menus: posições Navegação principal e Links do rodapé.
- Páginas: conteúdo institucional; a home aceita blocos entre produtos e notícias.
- Posts: notícias reais, categorias e imagens destacadas.
- Configurações → Leitura: escolha a página inicial e a página de notícias.
- Páginas de laboratórios e produtos são vinculadas quando publicadas com os caminhos definidos em `inc/content.php`.
- Use páginas filhas de `laboratorios` e `dados`; não coloque barras no slug de uma página isolada.
- Imagem destacada da página do laboratório substitui a ilustração abstrata do respectivo card.
- Sem uma página publicada, o card informa que o conteúdo está em preparação e não cria links quebrados.

## Limites desta versão
Não há integração de medições, previsões, gráficos ou APIs científicas. Os produtos demonstram a navegação e a edição.
Não há números institucionais fictícios. Revise nomes, contatos, licenças dos assets e conteúdo antes de publicar.
O editor administra conteúdo e menus; o layout principal é controlado pelos templates PHP.
Animações usam um IntersectionObserver, executam uma vez e respeitam movimento reduzido.

## Git
Base histórica: `feature/frontend`. Desenvolvimento da avaliação: `codex/wordpress-theme-preview`.
Cada etapa validada recebe um commit. Push e merge são separados.
O hook Husky executa lint e build. `npm run prepare` configura o hook a partir da raiz correta.
