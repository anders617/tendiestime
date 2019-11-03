# Michigan Tendies

A website to help michigan students find where their favorite food is being served currently live @ [tendiesti.me](https://tendiesti.me).

## Development

Clone the repo (note the `--recursive` flag to also clone submodules):
```shell
git clone https://github.com/anders617/tendiestime.git --recursive
```

This project is written with pure HTML/CSS/JS using the AngularJS framework. To run the server locally just use:
```
python3 -m http.server
```

In order to work with the /stats page you will need to install the following:
* The [Bazel](https://docs.bazel.build/versions/master/install.html) build system
* The [protoc](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation) protobuf compiler (`brew install protoc` on MacOS)
* The [protoc-gen-grpc-web](https://github.com/grpc/grpc-web#code-generator-plugin) plugin for protoc

Makes use of the proxied michigan dining API here: [michigantendies.herokuapp.com](https://michigantendies.herokuapp.com)

## Contributing

Feel free to make feature requests in issues, this app is a constant work in progress. PRs are welcome!
