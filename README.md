## Dockerized starter template for Laravel + NEXT.JS project.

## Overview

Look at one of the following topics to learn more about the project

- [Stack](#stack-includes)
- [Structure](#about-the-structure)
- [Installation](#installation)
- [Basic usage](#basic-usage)
  - [Manual installation](#manual-installation)
- [Environment](#environment)
- [NEXT](#next)
- [Laravel](#laravel)
  - [Artisan](#artisan)
  - [File storage](#file-storage)
- [Makefile](#makefile)
- [Database](#database)
- [Logs](#logs)
- [Running commands](#running-commands-from-containers)
- [Reinstallation](#reinstallation-frameworks)

## Stack includes

- Laravel (clean 11.0 version)
- NEXT.JS (clean 13.4.19 version)
- PostgreSQL Letest
- Nginx

#### Also

- Bash aliases for simple cli using
- A lot of useful **make** commands

## Prerequisites

Well tested on Ubuntu 19.10

## About the structure

Laravel API and Next are totally separate from each other and there are some reasons why I don't mix them up.

- First, throwing two frameworks together is a guaranteed mess in the future.
- API should be the only one layer of coupling.
- You can host them on the different servers.
- You can even split them into separate repositories if (when) the project will grow.
- You can even add a third project, for example, a mobile APP, which will use the same API also.

## Installation

**1. Clone or download the repository and enter its folder**

```
git clone https://github.com/dspias/bookstore.git your-app-folder
cd your-app-folder
```

**2. Run the installation script (it may take up to 10 minutes)**

```
make install
```

**3. That's it.**

Open [http://localhost:3000](http://localhost:3000) url in your browser.

Documentation at the [http://localhost:8080/api/documentation](http://localhost:8080/api/documentation) url.

_If you see the 502 error page, just wait a bit when `npm install && npm run dev` process will be finished (Check the status with the command `docker-compose logs client`)_

#### Manual installation

If you do not have available the make utility or you just want to install the project manually, you can go through the installation process running the following commands:

**Build and up docker containers (It may take up to 10 minutes)**

```
docker-compose up -d --build
```

**Install composer dependencies:**

```
docker-compose exec php composer install
```

**Copy environment files**

```
cp .env.api api/.env
cp .env.client client/.env
```

**Set up laravel permissions**

```
sudo chmod -R 777 api/bootstrap/cache
sudo chmod -R 777 api/storage
```

**Restart the client container**

```
docker-compose restart client
```

## Basic usage

Your api base url is `http://localhost:8080`. All requests to Laravel API must be sent using to the url starting with `/api` prefix. Nginx server will pass all requests with `/api` prefix to the node static server which serves the Next.

You **don't** need to configure the api to allow cross origin requests because all requests are proxied through the Nginx.

The following image demonstrates a request path going through the environment.
![Schema](.docker/schema.png)

## Environment

To up all containers, run the command:

```
# Make command
make up

# Full command
docker-compose up -d
```

To shut down all containers, run the command:

```
# Make command
make down

# Full command
docker-compose down
```

## Next

Your application is available at the [http://localhost:3000](http://localhost:3000) url.

Take a look at `client/.env` file. There are two variables:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

`API_URL_BROWSER` is the base application url for browsers.

Example of API request:

```
axios.post('/api/register', {
    email: this.email,
    password: this.password
});
```

#### Dependencies

If you update or install node dependencies, you should restart the Next process, which is executed automatically by the client container:

```
# Make command
make rc

# Full command
docker-compose restart client
```

## Laravel

Laravel API is available at the [http://localhost:8080/api](http://localhost:8080/api) url.

#### Artisan

Artisan commands can be used like this:

```
docker-compose exec php php artisan migrate
```

But if you want to generate a new controller or any laravel class, all commands should be executed from the current user like this, which grants all needed file permissions

```
docker-compose exec --user "$(id -u):$(id -g)" php php artisan make:controller HomeController
```

However, to make the workflow a bit simpler, there is the _aliases.sh_ file, which allows to do the same work like this:

```
artisan make:controller HomeController
```

[More about aliases.sh](#Aliases)

#### File storage

Nginx will proxy all requests with the `/storage` path prefix to the Laravel storage, so you can easily access it.
Just make sure you run the `artisan storage:link` command (Runs automatically during the `make install` process).

## Makefile

There are a lot of useful make commands you can use.
All of them you should run from the project directory where `Makefile` is located.

Examples:

```
# Up docker containers
make up

# Apply the migrations
make db-migrate

# Run tests
make test

# Down docker containers
make down
```

Feel free to explore it and add your commands if you need them.

## Aliases

Also, there is the _aliases.sh_ file which you can apply with command:

```
source aliases.sh
```

_Note that you should always run this command when you open the new terminal instance._

It helps to execute commands from different containers a bit simpler:

For example, instead of

```
docker-compose exec postgres pg_dump
```

You can use the alias `from`:

```
from postgres pg_dump
```

But the big power is `artisan` alias

If you want to generate a new controller or any Laravel class, all commands should be executed from the current user, which grants all needed file permissions

```
docker-compose exec --user "$(id -u):$(id -g)" php php artisan make:model Post
```

The `artisan` alias allows to do the same like this:

```
artisan make:model Post
```

## Database

If you want to connect to PostgreSQL database from external tool, for example _Sequel Pro_ or _Navicat_, use the following parameters

The following image demonstrates Database Schema.
![Schema](db_schema.png)

```
HOST: localhost
PORT: 54321
DB: app
USER: app
PASSWORD: app
```

Also you can connect to DB with CLI using docker container:

```
// Connect to container bash cli
docker-compose exec postgres bash
    // Then connect to DB cli
    psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}
```

For example, if you want to export dump file, use the command

```
docker-compose exec postgres pg_dump ${POSTGRES_USER} -d ${POSTGRES_DB} > docker/postgres/dumps/dump.sql
```

To import file into database, put your file to docker/postgres/dumps folder, it mounts into /tmp folder inside container

```
// Connect to container bash cli
docker-compose exec postgres bash
    // Then connect to DB cli
    psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} < /tmp/dump.sql
```

## Logs

All **_nginx_** logs are available inside the _docker/nginx/logs_ directory.

To view docker containers logs, use the command:

```
# All containers
docker-compose logs

# Concrete container
docker-compose logs <container>
```

## Running commands from containers

You can run commands from inside containers cli. To enter into the container run the following command:

```
# PHP
docker-compose exec php bash

# NODE
docker-compose exec client /bin/sh
```

## Reinstallation frameworks

If you want to reinstall Laravel OR Next from scratch with a fresh version, use the following command

##### Laravel

```
make reinstall-laravel
```

##### Next

```
make reinstall-next
```
