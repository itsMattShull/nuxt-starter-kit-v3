# starter-kit

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

## Basic Server Setup on DigitalOcean
- Setup nameservers in the domain to point to DigitalOcean name servers
- Add domain to DigitalOcean under Networking
- Create A Records for `@` and `www` in DigitalOcean to point to the DigitalOcean server.
- SSH into the DigitalOcean server.
- Run `sudo ufw allow “OpenSSH”`
- Run `sudo ufw allow 3306`
- [Install Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
- [Install NodeJS and PM2](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04)
- Install git `sudo apt install -y git`
- Run `cd /var/www`
- Run `git clone {GITHUB_REPO_URL}`
- Run `cd {NAME_OF_APP}`
- Run `npm install`
- Run `npm run build`
- Run `pm2 start npm --name "{NAME_OF_APP}" -- start`
- Add public IP to hosts by adding `{PUBLIC_IP_OF_DO_SERVER} {LIVE_URL} www.{LIVE_URL}` to `/etc/hosts`
- [Create new Nginx configuration for localhost:3000](https://www.cloudbooklet.com/install-node-js-and-npm-with-nginx-on-ubuntu-20-04-google-cloud/)
- Run `sudo ln -s /etc/nginx/sites-available/{LIVE_URL} /etc/nginx/sites-enabled/`
- Run `sudo nano /etc/nginx/nginx.conf` and uncomment `server_names_hash_bucket_size 64;`
- [Create SSL certificate and enable HTTP/2](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)
- Create .env file on server and on local machine with the following
```
DATABASE_HOST=EXTERNAL_IP_ADDRESS
DATABASE_USERNAME=root
DATABASE_PASSWORD=SOME_PASSWORD
DATABASE_NAME=NAME_OF_MYSQL_DATABASE
LIVE_URL={ex: something.com}
```
- Run `sudo apt install mysql` and create a mysql database with the following table:
```
CREATE DATABASE database_name;

CREATE TABLE users (
     ID INT NOT NULL AUTO_INCREMENT,
     email CHAR(255) NOT NULL,
     password CHAR(255) NOT NULL,
     FirstName CHAR(255) NOT NULL,
     LastName CHAR(255) NOT NULL,
     IsAdmin boolean not null default 0
     PRIMARY KEY (ID)
);
```

When a change is made and you want to publish the changes to the server, use terminal to ssh into the digitalocean server and using the following command `cd /var/www/{NAME_OF_APP} && git pull origin main && npm install && npm run --silent build && pm2 restart 0`

