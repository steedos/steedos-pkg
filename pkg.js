require('dotenv-flow').config();
const { execSync } = require('child_process');
const path = require('path');

const VERSION = require('steedos-server/package.json').version;
const ossFold = process.env.STEEDOS_OSS_QUICK_INSTALL_FOLD;
console.log('ossFold: ', ossFold);
// const platforms = ['macos', 'win', 'linux'];
const platforms = ['macos'];

let cwd = process.cwd();
let pkgPath = path.join(cwd, '../../pkg');
console.log('VERSION: ', VERSION);
console.log('cwd: ', cwd);
console.log('pkgPath: ', pkgPath);
for (const os of platforms) {
    let osPath = path.join(pkgPath, os);
    let osDistPath = path.join(osPath, 'steedos-mini');

    console.log(`${os}: osDistPath: `, osDistPath);

    console.log(`${os}: pkg start!`);
    execSync(`pkg ${cwd} --options max_old_space_size=4096 --out-path=${osDistPath} --targets node12-macos-x64`);
    console.log(`${os}: pkg done!`);
    console.log(`${os}: zip start!`);

    execSync(`zip -r ${osPath}/steedos-mini-macos-${VERSION}.zip ${osDistPath}`);
    console.log(`${os}: zip done!`);

    console.log(`${os}: upload to aliyun!`);
    execSync(`/usr/bin/ossutil --force cp ${osPath}/steedos-mini-macos-${VERSION}.zip ${ossFold}`);
    console.log(`${os}: upload ${os} done!`);
}


