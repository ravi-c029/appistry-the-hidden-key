#!/usr/bin/env node

/**
 * APPISTRY — THE HIDDEN KEY
 * Official Unlock Terminal Utility
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const readline = require('readline')

// Search for artifact.enc.json across probable paths
const possiblePaths = [
  path.join(__dirname, '..', 'public', 'challenge', 'artifact.enc.json'),
  path.join(__dirname, '..', 'artifact.enc.json'),
  path.join(__dirname, 'artifact.enc.json'),
  path.join(process.cwd(), 'public', 'challenge', 'artifact.enc.json'),
  path.join(process.cwd(), 'artifact.enc.json'),
]

let artifactPath = null
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    artifactPath = p
    break
  }
}

if (!artifactPath) {
  console.error('\x1b[31m[ERROR] artifact.enc.json not found!\x1b[0m')
  process.exit(1)
}

const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'))

console.log('\x1b[36m' + '='.repeat(60))
console.log('   ✦ APPISTRY — THE HIDDEN KEY : SECURITY TERMINAL ✦')
console.log('   An Official Event by APPISTRY × STC IIT Patna Hybrid')
console.log('='.repeat(60) + '\x1b[0m\n')

console.log('\x1b[33m[!] A PROTECTED SECRET ARTIFACT HAS BEEN DETECTED.\x1b[0m')
console.log('Algorithm: ' + artifact.algorithm)
console.log('Key Derivation: ' + artifact.kdf)
console.log('Clue: ' + (artifact.hint || 'No hint provided.'))
console.log('')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('\x1b[1m\x1b[35mEnter the secret passphrase:\x1b[0m > ', (answer) => {
  rl.close()
  const candidate = (answer || '').trim()

  try {
    const salt = Buffer.from(artifact.salt, 'hex')
    const iv = Buffer.from(artifact.iv, 'hex')
    const tag = Buffer.from(artifact.tag, 'hex')
    const ciphertext = Buffer.from(artifact.ciphertext, 'hex')

    // Derive key using candidate password
    const key = crypto.scryptSync(candidate, salt, 32)
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(tag)

    let decrypted = decipher.update(ciphertext, undefined, 'utf8')
    decrypted += decipher.final('utf8')

    console.log('\n\x1b[32m' + '✓'.repeat(60))
    console.log(' ACCESS GRANTED: THE HIDDEN KEY HAS BEEN UNLOCKED!')
    console.log('✓'.repeat(60) + '\x1b[0m\n')

    console.log('  \x1b[1m\x1b[42m\x1b[30m  REVEALED KEYWORD  \x1b[0m')
    console.log('\x1b[36m\x1b[1m  >>>  ' + decrypted + '  <<<\x1b[0m\n')

    console.log('\x1b[33m[NEXT STEP]\x1b[0m Copy this keyword and submit it immediately at:')
    console.log('\x1b[4mhttp://localhost:3000/submit\x1b[0m\n')
    console.log('The First Blood bounty is awarded to the first server-verified submission!')
  } catch {
    console.log('\n\x1b[31m[ACCESS DENIED]\x1b[0m Incorrect passphrase.')
    console.log('Authentication failed. Cryptographic integrity check did not match.')
    console.log('HINT: Check the repository clues, club attribution, and STC IIT Patna Hybrid connections.\n')
    process.exit(1)
  }
})

