# toplapjp.github.io

development repository for : [http://toplap.jp/](http://toplap.jp/)


## boot server

```make server```

then view browser at port 8080.

## build

```make build```

## make new post

```make post```

And edit ```src/posts/<yaer-month-date>.md```. This markdown file convert to html when page rendering.

then build as production:

```yarn run production```

then: commit new app.js / .md and doc/ directory.

```git add -A```

```git commit -m "added new post"```

then push to ```main``` branch

```doc/``` directory will open at github pages.
