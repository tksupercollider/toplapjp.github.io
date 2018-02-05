# tksupercollider.github.io

development repository for : [https://tksupercollider.github.io/](https://tksupercollider.github.io/)

## build

```make build```

## make new post

```make post```

And edit ```src/posts/<yaer-month-date>.md```. This markdown file convert to html when page rendering.

then build as production:

```yarn run production```

then: commit new app.js / .md etc.

```git add -A```

```git commit -m "added new post"```

then push to ```main``` branch

```yarn run deploy```

