const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try { fn(); passed++; } catch (e) { console.error(`FAIL: ${name} - ${e.message}`); failed++; }
}
function assert(condition, msg) { if (!condition) throw new Error(msg || 'Assertion failed'); }

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const nextConfig = require(path.join(__dirname, '..', 'next.config.js'));

test('next is installed as 14.x', () => {
  assert(pkg.dependencies.next.startsWith('14'), `Expected 14.x, got ${pkg.dependencies.next}`);
});

test('react is 18.x', () => {
  assert(pkg.dependencies.react.startsWith('18'), 'react should be 18.x');
});

test('reactStrictMode enabled', () => {
  assert(nextConfig.reactStrictMode === true);
});

test('images uses remotePatterns (v14 style)', () => {
  assert(Array.isArray(nextConfig.images.remotePatterns), 'should have remotePatterns');
  assert(nextConfig.images.remotePatterns.length >= 2, 'should have at least 2 patterns');
});

test('homepage uses sync cookies()', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'page.js'), 'utf8');
  assert(content.includes("from 'next/headers'"), 'should import from next/headers');
  assert(content.includes('cookies()'), 'should call cookies() synchronously');
  assert(content.includes('headers()'), 'should call headers() synchronously');
});

test('profile uses sync cookies()', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'profile', 'page.js'), 'utf8');
  assert(content.includes('cookies()'), 'should use sync cookies()');
});

test('user page uses sync params', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'users', '[id]', 'page.js'), 'utf8');
  assert(content.includes('{ params }'), 'should destructure params synchronously');
  assert(content.includes('params.id') || content.includes('const { id } = params'), 'should access params.id');
});

test('search page uses sync searchParams', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'search', 'page.js'), 'utf8');
  assert(content.includes('{ searchParams }'), 'should destructure searchParams');
  assert(content.includes('searchParams.q'), 'should access searchParams.q');
});

test('app layout exists', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'app', 'layout.js')));
});

test('all page files exist', () => {
  const pages = ['src/app/page.js', 'src/app/profile/page.js', 'src/app/users/[id]/page.js', 'src/app/search/page.js'];
  for (const p of pages) {
    assert(fs.existsSync(path.join(__dirname, '..', p)), `${p} should exist`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
