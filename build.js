#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const terser = require('terser')
const { main: embuildMain } = require('@tybys/embuild')

const cwd = process.cwd()

async function generate (targetName) {
  const pre = fs.readFileSync(path.join(__dirname, 'scripts', 'pre.js'), 'utf8').replace(/__target_name__/g, targetName)
  const post = fs.readFileSync(path.join(__dirname, 'scripts', 'post.js'), 'utf8').replace(/"__export_scripts__";/g, fs.readFileSync(path.join(__dirname, 'scripts/export.js'), 'utf8'))
  const files = [{
    path: path.join(__dirname, 'temp/post.js'),
    code: post
   }, {
     path: path.join(__dirname, 'temp/pre.js'),
     code: pre
   }]
  fs.mkdirSync(path.join(__dirname, 'temp'), { recursive: true })
  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    fs.writeFileSync(f.path, f.code, 'utf8')
  }
  return files
}

async function main () {
  const mode = process.argv[2] || 'Release'

  const cmakeoutdir = path.join(cwd, 'cmake_build')
  const targetName = 'openssl'

  await generate(targetName)

  try {
    await embuildMain({
      mode,
      outDir: cmakeoutdir,
      defines: {
        TARGET_NAME: targetName
      }
    })
  } catch (err) {
    fs.rmdirSync(path.join(__dirname, 'temp'), { recursive: true })
    throw err
  }
  fs.rmdirSync(path.join(__dirname, 'temp'), { recursive: true })

  const js = path.join(cmakeoutdir, `${targetName}.js`)
  if (mode === 'Release') {
    fs.writeFileSync(js, (await terser.minify(fs.readFileSync(js, 'utf8'), { compress: true, mangle: true })).code, 'utf8')
  }

  const dist = path.join(__dirname, 'dist')
  fs.mkdirSync(dist, { recursive: true })
  fs.copyFileSync(js, path.join(dist, `${targetName}.js`))
  fs.copyFileSync(path.join(cmakeoutdir, `${targetName}.wasm`), path.join(dist, `${targetName}.wasm`))
  if (mode === 'Debug') {
    const mapPath = path.join(cmakeoutdir, `${targetName}.wasm.map`)
    if (fs.existsSync(mapPath)) {
      fs.copyFileSync(mapPath, path.join(dist, `${targetName}.wasm.map`))
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
