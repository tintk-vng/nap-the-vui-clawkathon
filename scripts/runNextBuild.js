const { execFileSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const root = path.resolve(__dirname, '..')
const nextBin = require.resolve('next/dist/bin/next')
const tsconfigPath = path.join(root, 'tsconfig.json')
const tempBuildLinkName = 'next-build-temp'

function ensureTempBuildJunction() {
  const target = path.join(os.tmpdir(), 'napthevui-next-build-temp')
  const linkPath = path.join(root, tempBuildLinkName)

  fs.rmSync(target, { recursive: true, force: true })
  fs.mkdirSync(target, { recursive: true })

  if (!fs.existsSync(linkPath)) {
    fs.symlinkSync(target, linkPath, 'junction')
  }

  return tempBuildLinkName
}

function buildDistName() {
  if (process.env.NEXT_DIST_DIR) {
    return process.env.NEXT_DIST_DIR
  }

  return ensureTempBuildJunction()
}

function runNextBuild() {
  const originalTsconfig = fs.existsSync(tsconfigPath) ? fs.readFileSync(tsconfigPath, 'utf8') : undefined

  try {
    execFileSync(process.execPath, [nextBin, 'build'], {
      cwd: root,
    env: {
      ...process.env,
      NEXT_DIST_DIR: buildDistName(),
      NODE_PATH: [path.join(root, 'node_modules'), process.env.NODE_PATH].filter(Boolean).join(path.delimiter)
    },
      stdio: 'inherit'
    })
  } finally {
    if (originalTsconfig !== undefined) {
      fs.writeFileSync(tsconfigPath, originalTsconfig, 'utf8')
    }
  }
}

if (require.main === module) {
  runNextBuild()
}

module.exports = {
  runNextBuild
}
