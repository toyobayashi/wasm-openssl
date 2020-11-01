#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')
const terser = require('terser')

const cwd = process.cwd()

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

function findMakeOnWindows () {
  const check = [
    'C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\VC\\Auxiliary\\Build',
    'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\VC\\Auxiliary\\Build'
  ]
  const vcvars = process.arch === 'x64' ? 'vcvars64.bat' : 'vcvars32.bat'
  for (let i = 0; i < check.length; i++) {
    const p = check[i]
    if (fs.existsSync(p)) {
      return {
        vcvars: path.join(p, vcvars),
        makeProgram: 'nmake',
        generator: 'NMake Makefiles'
      }
    }
  }
  return {
    vcvars: '',
    makeProgram: 'make',
    generator: 'MinGW Makefiles'
  }
}

async function invokeCMake (buildDir, defines) {
  fs.mkdirSync(buildDir, { recursive: true })

  if (process.platform === 'win32') {
    const info = findMakeOnWindows()
    defines.CMAKE_MAKE_PROGRAM = info.makeProgram
    defines.CMAKE_VERBOSE_MAKEFILE = 'ON'
    const definesArgs = Object.keys(defines).map(k => `-D${k}=${defines[k]}`)
    const cmakeArgs = ['cmake', 
      ...definesArgs,
      '-G', info.generator, path.relative(buildDir, cwd)
    ]
    await spawn('emcmake.bat', cmakeArgs, buildDir)
    if (info.vcvars) {
      const p = spawn('cmd', ['/k', `@echo off`], buildDir, 'pipe')
      p.cp.stdin.write(`call "${info.vcvars}"\r\n`)
      p.cp.stdin.write(`cmake --build .\r\n`)
      p.cp.stdin.write('exit %ERRORLEVEL%\r\n')
      await p
    } else {
      await spawn('cmake', ['--build', '.'], buildDir)
    }
  } else {
    const cmakeArgs = ['cmake', 
      ...definesArgs,
      '-G', 'Unix Makefiles', path.relative(buildDir, cwd)
    ]
    await spawn('emcmake', cmakeArgs, buildDir)
    await spawn('cmake', ['--build', '.'], buildDir)
  }
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

  try {
    await invokeCMake(cmakeoutdir, {
      CMAKE_BUILD_TYPE: mode,

      TARGET_NAME: targetName
    })
  } finally {
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      fs.unlinkSync(f.path)
    }
  }

  const dist = path.join(__dirname, 'dist')
  fs.mkdirSync(dist, { recursive: true })
  fs.copyFileSync(path.join(cmakeoutdir, `${targetName}.js`), path.join(dist, `${targetName}.js`))
  fs.copyFileSync(path.join(cmakeoutdir, `${targetName}.wasm`), path.join(dist, `${targetName}.wasm`))
  const mapPath = path.join(cmakeoutdir, `${targetName}.wasm.map`)
  if (fs.existsSync(mapPath)) {
    fs.copyFileSync(mapPath, path.join(dist, `${targetName}.wasm.map`))
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
