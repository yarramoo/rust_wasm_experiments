# Game of Life in pure TS
To run use `http-server`

I'm just figuring out how to run these things. Using this method you have to clear browser cache every reload which is super annoying. There's gotta be a better way of hosting...

# Comparing with initial GoL in Rust+WASM
Interestingly this version is faster. I think there is some really inefficient copying going on in the current WASM GoL implementation. The slowdown could also just be the foreign function calls? 

