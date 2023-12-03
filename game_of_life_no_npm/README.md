# No NPM WASM
I had difficulties with node backwards compatibility following the [rust WASM game of life tutorial](https://rustwasm.github.io/docs/book/introduction.html) so I tried going without npm/node/webpack.
It wasn't so difficult using [this](https://lionturkey.github.io/posts/rustwasm/rustwasm.html) and [this](https://rustwasm.github.io/docs/wasm-bindgen/examples/without-a-bundler.html)

## Usage
Build using `wasm-pack build --target web`
Host using `python3 -m http.server` or whatever flavour of server you'd like
