## iOWN mobile app

#### Install dependencies

```
yarn dc:install
```

## Run

#### Development

Key `-d` will start in hidden mode
```
docker-compose up mobile
```

or using `yarn`

```
yarn start
```

#### Installing npm dependencies

All changes to `node_modules` should happen *inside* the containers. Install any new dependencies by inside the container. You can do this via `docker-compose run` or `yarn dc:install`, but it’s easier to just upadte a running container and avoid having to rebuild everything:

```
docker-compose run mobile yarn add <new_dependency>
```
### Deployment

First of all create `.env` file from `.env.skel`

Then install project dependencies:
```
docker-compose run mobile yarn
```
And then:
```docker-compose up -d mobile```

