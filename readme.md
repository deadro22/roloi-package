# Roloi

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

A simple npm package used to watch and auto reload files during development.

# Main feature

- you can call roloi and then file name and roloi will start your app and watch for any changes

```
$ roloi server.js
```

# You can also:

- call roloi without specifying any file and roloi will automatically look into your package.json file, find the main entry and start it

```
$ roloi
```

### Installation

The installation is fairly simple all you need to do is run

```
$ npm i -g roloi
```

and that is it.
