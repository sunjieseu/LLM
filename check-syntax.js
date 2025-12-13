const { execSync } = require('child_process');

try {
  console.log('检查 TypeScript 语法...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript 语法检查通过');
} catch (error) {
  console.log('❌ TypeScript 语法检查失败');
  process.exit(1);
}