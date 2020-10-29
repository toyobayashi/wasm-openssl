#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')
const terser = require('terser')

const cwd = process.cwd()

function spawn (command, args, cwdPath) {
  console.log(`[spawn] ${cwdPath}${process.platform === 'win32' ? '>' : '$'} ${command} ${args.map(a => a.indexOf(' ') !== -1 ? ('"' + a + '"') : a).join(' ')}`)
  return new Promise((resolve, reject) => {
    const cp = childProcess.spawn(command, args, {
      env: process.env,
      cwd: cwdPath || cwd,
      stdio: 'inherit'
    })
    cp.once('exit', (code, reason) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Child process exit: ${code}. Reason: ${reason}\n\n${command} ${args.join(' ')}\n`))
      }
    })
  })
}

async function invokeCMake (buildDir, defines) {
  fs.mkdirSync(buildDir, { recursive: true })
  
  const definesArgs = Object.keys(defines).map(k => `-D${k}=${defines[k]}`)
  await spawn('cmake', [
    ...definesArgs,
    '-G', process.platform === 'win32' ? 'MinGW Makefiles' : 'Unix Makefiles', path.relative(buildDir, cwd)
  ], buildDir)
  await spawn('cmake', ['--build', '.'], buildDir)
}

async function minify () {
  const pre = (await terser.minify(fs.readFileSync(path.join(__dirname, 'scripts', 'pre.js'), 'utf8'), { ecma: 5, compress: false, mangle: true })).code
  const post = (await terser.minify(fs.readFileSync(path.join(__dirname, 'scripts', 'post.js'), 'utf8').replace(/"__export_scripts__";/g, fs.readFileSync(path.join(__dirname, 'scripts/export.js'), 'utf8')), { ecma: 5, compress: false, mangle: true })).code
  const wrapPre = `${pre.substring(0, pre.length - 2)},function(require,process){`
  const wrapPost = `return ${post}});`
  const files = [{
    path: path.join(__dirname, 'post.js'),
    code: wrapPost
   }, {
     path: path.join(__dirname, 'pre.js'),
     code: wrapPre
   }]
  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    fs.writeFileSync(f.path, f.code, 'utf8')
  }
  return files
}

async function main () {
  if (!process.env.EMSDK) {
    throw new Error('Set $EMSDK first')
  }
  const mode = process.argv[2] || 'Release'

  const cmakeoutdir = path.join(__dirname, 'cmake_build')
  const targetName = 'openssl'

  const files = await minify()

  await invokeCMake(cmakeoutdir, {
    CMAKE_TOOLCHAIN_FILE: path.join(process.env.EMSDK, 'upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake'),
    CMAKE_BUILD_TYPE: mode,
    CMAKE_MAKE_PROGRAM: 'make',

    TARGET_NAME: targetName
  })

  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    fs.unlinkSync(f.path)
  }

  const dist = path.join(__dirname, 'dist')
  fs.mkdirSync(dist, { recursive: true })
  fs.copyFileSync(path.join(cmakeoutdir, `${targetName}.js`), path.join(dist, `${targetName}.js`))
  fs.copyFileSync(path.join(cmakeoutdir, `${targetName}.wasm`), path.join(dist, `${targetName}.wasm`))
  const mapPath = path.join(cmakeoutdir, `${targetName}.wasm.map`)
  if (fs.existsSync(mapPath)) {
    fs.copyFileSync(mapPath, path.join(__dirname, `${targetName}.wasm.map`))
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
