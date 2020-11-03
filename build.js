#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')
const terser = require('terser')

const cwd = process.cwd()

const { which } = require('./scripts/which.js')

function spawn (command, args, cwdPath, stdin) {
  const argsString = args.map(a => a.indexOf(' ') !== -1 ? ('"' + a + '"') : a).join(' ')
  console.log(`[spawn] ${cwdPath}${process.platform === 'win32' ? '>' : '$'} ${command} ${argsString}`)
  const cp = childProcess.spawn(command, args, {
    env: process.env,
    cwd: cwdPath || cwd,
    stdio: stdin ? [stdin, 'inherit', 'inherit'] : 'inherit'
  })
  const p = new Promise((resolve, reject) => {
    cp.once('exit', (code, reason) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Child process exit: ${code}. Reason: ${reason}\n\n${command} ${argsString}\n`))
      }
    })
  })
  p.cp = cp
  return p
}



async function invokeCMake (buildDir, defines) {
  fs.mkdirSync(buildDir, { recursive: true })

  if (process.platform === 'win32') {
    const nmakePath = which('nmake')
    defines.CMAKE_MAKE_PROGRAM = nmakePath ? 'nmake' : 'make'
    const definesArgs = Object.keys(defines).map(k => `-D${k}=${defines[k]}`)
    const cmakeArgs = ['cmake', 
      ...definesArgs,
      '-G', nmakePath ? 'NMake Makefiles' : 'MinGW Makefiles', path.relative(buildDir, cwd)
    ]
    await spawn('emcmake.bat', cmakeArgs, buildDir)
    await spawn('cmake', ['--build', '.'], buildDir)
  } else {
    const cmakeArgs = ['cmake', 
      ...definesArgs,
      '-G', 'Unix Makefiles', path.relative(buildDir, cwd)
    ]
    await spawn('emcmake', cmakeArgs, buildDir)
    await spawn('cmake', ['--build', '.'], buildDir)
  }
}

async function minify (targetName) {
  const pre = fs.readFileSync(path.join(__dirname, 'scripts', 'pre.js'), 'utf8').replace(/__target_name__/g, targetName)
  const post = fs.readFileSync(path.join(__dirname, 'scripts', 'post.js'), 'utf8').replace(/"__export_scripts__";/g, fs.readFileSync(path.join(__dirname, 'scripts/export.js'), 'utf8'))
  const files = [{
    path: path.join(__dirname, 'post.js'),
    code: post
   }, {
     path: path.join(__dirname, 'pre.js'),
     code: pre
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

  const files = await minify(targetName)

  try {
    await invokeCMake(cmakeoutdir, {
      CMAKE_BUILD_TYPE: mode,
      CMAKE_VERBOSE_MAKEFILE: mode === 'Release' ? 'OFF' : 'ON',

      TARGET_NAME: targetName
    })
  } finally {
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      fs.unlinkSync(f.path)
    }
  }

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
