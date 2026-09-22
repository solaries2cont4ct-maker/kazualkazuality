# Site de artista — versão 2

Visual: branco, minimalista, Times New Roman, bastante espaço vazio e composição assimétrica.

## Obras
Coloque suas imagens em `imagens/`.
A posição de cada obra é controlada pelas classes no `index.html`:
- work-large
- work-small
- work-wide
- work-medium
- work-offset
- work-large-right

Você pode trocar as classes, repetir blocos ou criar novas classes no CSS.

## Livros
Cada livro é independente dentro de `livros/`.
Para A Vigília:
`livros/a-vigilia/paginas/pagina-01.jpg` etc.

No `book.js`, altere:
`const NUM_PAGES=17;`

Para adicionar outro livro, copie a pasta `a-vigilia`, renomeie e altere título, capa, número de páginas e imagens.

## GitHub Pages
Settings > Pages > Deploy from a branch > main > / (root).
