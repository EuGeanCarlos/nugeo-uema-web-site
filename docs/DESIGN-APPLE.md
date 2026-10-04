# Refinamento visual com apple-design — 04/10/2026

Skill instalada de `emilkowalski/skills`, pasta `skills/apple-design`, usando o instalador oficial de skills. Local: `C:/Users/geanc/.codex/skills/apple-design/SKILL.md`. Estará disponível automaticamente no próximo turno; o conteúdo foi lido e aplicado nesta execução.

## Aplicação no tema WordPress

- Hierarquia tipográfica: títulos com peso/tracking ajustados, corpo mais confortável, tamanhos em rem e linhas equilibradas.
- Superfícies: bordas e cantos consistentes, sombras discretas e retirada do deslocamento de cards ao passar o mouse.
- Resposta imediata: estado pressionado em botões, cor de estado expandido no menu/pesquisa e resposta visual preservada com movimento reduzido.
- Orientação: navegação interna fixa no desktop, destaque da seção em leitura e âncoras compensadas para não esconder títulos sob o cabeçalho. O IntersectionObserver adicional não usa eventos contínuos de scroll nem bloqueia a interação.
- Materiais: transparência leve somente no cabeçalho. Preferências de menos transparência, mais contraste e cores forçadas têm alternativas sólidas/contornos legíveis.
- Movimento: entradas de 320ms sem atrasos em cascata. Conteúdo permanece acessível sem JS e com movimento reduzido.

A identidade NUGEO foi mantida: logos, azul/navy e Geist (já incorporada no tema). A skill é aplicada conforme a função institucional do portal; não há controles por arraste que justifiquem dependências de física/springs. Não foi adicionada biblioteca de interface.

## Arquivos desta etapa

- `wordpress/nugeo/assets/refinements.css`: camada de refinamento, separada dos estilos existentes para facilitar a revisão.
- `frontend/nugeo-web/theme-entry.css`: inclui a nova folha na compilação.
- `wordpress/nugeo/assets/site.css`: CSS compilado para instalação do tema.
- `wordpress/nugeo/assets/theme.js`: indicação da seção atual com links nativos e `aria-current=location`.
- `frontend/nugeo-web/scripts/test-design-refinements.mjs`: navegação/âncoras, preferências visuais, texto ampliado e controles.

As alterações dos laboratórios da etapa anterior permanecem no workspace. Não foram sobrescritos relatórios do usuário nem criado commit.

## Verificação

Com WordPress em execução, em `frontend/nugeo-web`:

```powershell
npm run build:theme
npm run lint
npm run build
node scripts/test-design-refinements.mjs
node scripts/test-laboratories.mjs
npm run test:theme
```

O teste específico cobre seção ativa, títulos desobstruídos, preferências de contraste/transparência separadamente, texto a 200%, movimento reduzido, pesquisa e Escape. Os testes existentes cobrem as três páginas, menus históricos, axe, layouts de 320 a 1920, Home, busca e conteúdo sem JavaScript. Capturas ficam em `releases/audit`.
