#!/usr/bin/env node
const program = require('commander')
const updateNotifier = require('update-notifier')
const fs = require('fs')
const pkg = require('../package.json')

// check if a new version of kvjson is available and print an update notification
const notifier = updateNotifier({ pkg })
if (notifier.update && notifier.update.latest !== pkg.version) {
  notifier.notify({ defer: false, isGlobal: true })
}

const opts = [
  {
    name: '--cwd <path>',
    description: 'Working directory in which npm will be executed.'
  },
]

// start commander program
program
  .description('set key=value pair in .json file')
  .usage('[file] [key] [value]')

// add cli options
opts.forEach(({ name, description, default: defaultValue, parse }) =>
  // handle 3rd/4th argument polymorphism
  program.option(name, description, parse || defaultValue, parse ? defaultValue : undefined))

// set version option at the end
program.version(pkg.version)

program.parse(process.argv)

program.cli = true

run(program)

/** main entry point */
async function run(program = {}) {

  // if not executed on the command-line (i.e. executed as a node module), set some defaults
  if (!program.cli) {}

  const filename = program.args[0]
  const key = program.args[1]
  const value = program.args[2]

  if (filename.split('.').pop() !== 'json') {
    console.error('first arg must be path to .json file')
    process.exit(1)
  }
  if (!key) {
    console.error('second arg must be a key')
    process.exit(1)
  }
  if (!value) {
    console.error('third arg must be a value')
    process.exit(1)
  }
  fs.access(filename, fs.F_OK, (err) => {
    if (err) {
      console.error(err)
      return
    }

    //file exists
    let content = readFileSync(filename)
    // Modify
    if (content) {
      content[key] = value
      const parts = key.split('.')
      if (parts.length > 1) {
        content = deepen(content)
      }
    }
    content = JSON.stringify(content, null, 2)
    fs.writeFileSync(filename, content, 'utf8')
  })
}

function deepen(obj) {
  const result = {}
  // For each object path (property key) in the object
  for (const objectPath in obj) {
    // Split path into component parts
    const parts = objectPath.split('.')
    // Create sub-objects along path as needed
    let target = result;
    while (parts.length > 1) {
      const part = parts.shift();
      target = target[part] = target[part] || {}
    }
    // Set value at end of path
    target[parts[0]] = obj[objectPath]
  }
  return result
}

function readFileSync (file) {
  try {
    let data = fs.readFileSync(file)
    if (Buffer.isBuffer(data)) {
      data = data.toString('utf8')
      data = data.replace(/^\uFEFF/, '')
    }
    return JSON.parse(data)
  } catch (err) {
    throw err
  }
}
