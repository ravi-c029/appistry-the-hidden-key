const fs = require('fs');
const path = require('path');

let target = (process.argv[2] || '').toLowerCase();
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!fs.existsSync(schemaPath)) {
  console.error('[ERROR] prisma/schema.prisma not found!');
  process.exit(1);
}

let content = fs.readFileSync(schemaPath, 'utf8');

if (!target || target === 'auto') {
  const dbUrl = (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_PRISMA_URL ||
    ''
  ).trim();

  if (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://')) {
    target = 'postgres';
  } else {
    target = 'sqlite';
  }
}

if (target === 'postgres' || target === 'postgresql') {
  if (content.includes('provider = "sqlite"')) {
    content = content.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
    fs.writeFileSync(schemaPath, content);
    console.log('\x1b[32m✓ Switched Prisma schema to PostgreSQL (Serverless Ready for Vercel/Neon/Supabase)\x1b[0m');
  } else {
    console.log('\x1b[36mℹ Prisma schema is already set to PostgreSQL.\x1b[0m');
  }
} else if (target === 'sqlite') {
  if (content.includes('provider = "postgresql"')) {
    content = content.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
    fs.writeFileSync(schemaPath, content);
    console.log('\x1b[32m✓ Switched Prisma schema to SQLite (Local Dev Ready)\x1b[0m');
  } else {
    console.log('\x1b[36mℹ Prisma schema is already set to SQLite.\x1b[0m');
  }
} else {
  console.log('Usage: node scripts/switch-db.js [postgres|sqlite|auto]');
}
