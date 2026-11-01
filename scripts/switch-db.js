const fs = require('fs');
const path = require('path');

const target = (process.argv[2] || '').toLowerCase();
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
let content = fs.readFileSync(schemaPath, 'utf8');

if (target === 'postgres' || target === 'postgresql') {
  content = content.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
  fs.writeFileSync(schemaPath, content);
  console.log('\x1b[32m✓ Switched Prisma schema to PostgreSQL (Serverless Ready for Vercel/Neon)\x1b[0m');
} else if (target === 'sqlite') {
  content = content.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
  fs.writeFileSync(schemaPath, content);
  console.log('\x1b[32m✓ Switched Prisma schema to SQLite (Local Dev Ready)\x1b[0m');
} else {
  console.log('Usage: node scripts/switch-db.js [postgres|sqlite]');
}

