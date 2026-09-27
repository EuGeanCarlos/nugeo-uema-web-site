# NUGEO/UEMA

## Objetivo e arquitetura
Entregar um tema WordPress institucional preservando a identidade do frontend existente.
- Repositório efetivo: esta pasta; existe outro repositório Git no diretório pai.
- Base histórica: feature/frontend. Trabalhe em branches por tarefa.
- frontend/nugeo-web: protótipo React 19, TypeScript, Vite e Tailwind 4.
- wordpress/nugeo: tema clássico PHP, compatível com conteúdo do editor de blocos.
- O tema renderiza HTML no servidor; não exige React no navegador.
- Menus, páginas, posts, busca e paginação pertencem ao WordPress.
- Os assets compilados devem acompanhar o ZIP, sem exigir Node no servidor.

## Regras
Preserve logos, paleta e componentes existentes. Não recrie o site nem acrescente dependências sem motivo.
Não invente dados científicos. Conteúdo demonstrativo precisa de identificação visível.
Escape saídas PHP conforme o contexto e sanitize configurações administrativas.
Use URLs do WordPress, não caminhos absolutos presumindo instalação na raiz.
Conteúdo permanece legível sem JavaScript. Respeite prefers-reduced-motion.
Animações de entrada usam IntersectionObserver, opacity e transform, uma vez por elemento.
Não use eventos contínuos de scroll para animar cada card, vídeo de fundo ou parallax pesado.
Teste navegação por teclado, menus, busca e larguras de 320 a 1920 px.
Não versione banco local, credenciais, node_modules ou relatórios preexistentes não versionados.

## Etapas e commits
Explique o escopo antes de editar. Revise o diff, teste e faça um commit ao concluir cada etapa.
O usuário autorizou esses commits. Push, merge e instalação em produção são ações separadas.
Preserve alterações locais alheias à tarefa. Não desative verificações para esconder falhas.

## Validação
Em frontend/nugeo-web: npm run build e npm run lint.
O hook executa ambos a partir da raiz deste repositório.
Documente no README os comandos de build do tema, empacotamento e WordPress local à medida que forem implementados.
Declare claramente o que foi testado e o que depende de homologação.
