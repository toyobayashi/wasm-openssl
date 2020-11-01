const fs = require('fs')

let code = fs.readFileSync(process.argv[2], 'utf8')
code = code.replace(/ if \(typeof document !== 'undefined' && document\.currentScript\)/g, '')
code = code.replace(/document\.currentScript\.src/g, 's')

fs.writeFileSync(process.argv[2], code)
