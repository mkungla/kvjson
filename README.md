# kvjson 
![npm](https://img.shields.io/npm/dt/kvjson?style=plastic)
[![master](https://github.com/mkungla/kvjson/actions/workflows/master.yml/badge.svg)](https://github.com/mkungla/kvjson/actions/workflows/master.yml)

**Set or update key value in .json files**

```
./node_modules/.bin/kvjson <file> <key> <value>
```

**file** - path to json file

**key** - json key can be nested path key.lv1.lv2 etc.

**value** - value to be set


**e.g. update version in package.json**

`./node_modules/.bin/kvjson package.json version 1.0.0`

**e.g. update dependency version in package.json**

`./node_modules/.bin/kvjson package.json dependencies.kvjson 1.0.0`
