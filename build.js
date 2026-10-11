const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';
const isLinux = process.platform === 'linux';

console.log('🎮 暗影地牢 - 游戏打包工具');
console.log('========================\n');

function run(command) {
    console.log(`执行: ${command}`);
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`命令执行失败: ${command}`);
        return false;
    }
}

function checkPrerequisites() {
    console.log('🔍 检查环境...');

    try {
        execSync('node --version', { stdio: 'pipe' });
        console.log('✅ Node.js 已安装');
    } catch {
        console.error('❌ 未找到 Node.js，请先安装 Node.js');
        process.exit(1);
    }

    try {
        execSync('npm --version', { stdio: 'pipe' });
        console.log('✅ npm 已安装');
    } catch {
        console.error('❌ 未找到 npm');
        process.exit(1);
    }

    try {
        execSync('python --version', { stdio: 'pipe' });
        console.log('✅ Python 已安装');
    } catch {
        try {
            execSync('python3 --version', { stdio: 'pipe' });
            console.log('✅ Python3 已安装');
        } catch {
            console.error('❌ 未找到 Python，请先安装 Python');
            process.exit(1);
        }
    }

    console.log('');
}

function installDependencies() {
    console.log('📦 安装依赖...');

    if (!fs.existsSync('node_modules')) {
        if (!run('npm install')) {
            process.exit(1);
        }
    } else {
        console.log('✅ node_modules 已存在，跳过安装');
    }

    const requirementsPath = path.join('backend', 'requirements.txt');
    if (fs.existsSync(requirementsPath)) {
        console.log('📦 安装 Python 依赖...');
        const pythonCmd = isWindows ? 'python' : 'python3';
        run(`${pythonCmd} -m pip install -r ${requirementsPath}`);
    }

    console.log('');
}

function build() {
    console.log('🔨 开始打包...\n');

    const platform = isWindows ? 'win' : isMac ? 'mac' : 'linux';
    const command = `npm run build:${platform}`;

    if (!run(command)) {
        console.error('打包失败');
        process.exit(1);
    }

    console.log('\n✅ 打包完成！');
    console.log('📁 输出目录: dist/');
}

function main() {
    checkPrerequisites();
    installDependencies();
    build();
}

main();
