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

### Stats
The stats page is located [here](https://tendiesti.me/stats)
#### Development
The stats page is built using ReactJS and is located in the /stats-dev directory

Install the [yarn](https://yarnpkg.com/en/docs/install#mac-stable) dependency management tool

Run the following to install dependencies
```shell
yarn
```
Run the following to start the dev server
```shell
yarn start
```

#### Production Build
```shell
yarn build
```
This will create a production build of the code in stats-dev and will place it in the top level stats directory which can be pushed to github to be served by Github Pages.

#### Updating the generated proto files
(You shouldn't need to unless [mdining-proto](https://github.com/anders617/mdining-proto) changes)

You will need the following dependencies:
* The [Bazel](https://docs.bazel.build/versions/master/install.html) build system
* The [protoc](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation) protobuf compiler (`brew install protoc` on MacOS)
* The [protoc-gen-grpc-web](https://github.com/grpc/grpc-web#code-generator-plugin) plugin for protoc

Then run the following to generate the protobuf js files:
```shell
# From the stats-dev directory
yarn proto
```

Makes use of the [michigan-dining-api](https://michigan-dining-api.herokuapp.com)

## Contributing

Feel free to make feature requests in issues, this app is a constant work in progress. PRs are welcome!
