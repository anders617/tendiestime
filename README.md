# Michigan Tendies

A website to help michigan students find where their favorite food is being served currently live @ [tendiesti.me](https://tendiesti.me).

Makes use of the [michigan-dining-api](https://github.com/anders617/michigan-dining-api) hosted on [heroku](https://michigan-dining-api.tendiesti.me) and the corresponding [mdining-proto](https://github.com/anders617/mdining-proto) library.

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

## Contributing

Feel free to make feature requests in issues, this app is a constant work in progress. PRs are welcome!
