# GPS_Tracker

## Some tips

Docker image saving to a `tar` archive: 

```bash
docker-compose save gps_frontend -o gps_frontend
```

Loading the image in the other server

```bash
docker-compose load -i gps_frontend
```

Starting the system in background

```bash
docker-compose up -d 
```

## Requirements

For using a container:

- docker
- docker-compose

For standalone development and running:

- npm
- node

## Usage

For the ease of deployment and testing, there is an option to run the code in container.

The `Dockerfile` will build Javascript code and host it by an nginx container. To use the container, simply put:

```bash
docker-compose up
```

The building procedure may take a long time. You way build the docker image on one machine and transfer the image to 
the other by repository or offline image archive.

## NPM Procedures

The following procedures will help you to work directly with JavaScript code.

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
