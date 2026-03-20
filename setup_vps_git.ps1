# VPS Git Initialization Script
# This script sets up the bot on the VPS using the new GitHub repository.
# Run this script in PowerShell.

$VPS_IP = "147.93.181.40"
$VPS_USER = "root"
$REPO_URL = "https://github.com/george-arch/alphatrade-bot.git"
$REMOTE_PARENT = "/root/proyecto"
$REMOTE_DIR = "/root/proyecto/bot"

Write-Host "🚀 Preparing VPS for Git integration..." -ForegroundColor Cyan

# 1. SSH to VPS and setup repo
# Note: This will remove the old non-git directory and clone the new one.
ssh ${VPS_USER}@${VPS_IP} @"
    cd ${REMOTE_PARENT}
    rm -rf bot
    git clone ${REPO_URL} bot
"@

# 2. Upload .env file (as it is not in Git)
Write-Host "📤 Uploading .env to VPS..." -ForegroundColor Cyan
scp .env ${VPS_USER}@${VPS_IP}:${REMOTE_DIR}/.env

# 3. Finalize setup and run with PM2
Write-Host "⚙️ Finalizing setup on VPS..." -ForegroundColor Cyan
ssh ${VPS_USER}@${VPS_IP} @"
    cd ${REMOTE_DIR}
    npm install
    pm2 delete bot || true
    pm2 start bot.js --name \"bot\"
    pm2 save
    echo '✅ Bot is LIVE and connected to GitHub.'
    pm2 status bot
"@

Write-Host "🚀 VPS is now synchronized with GitHub." -ForegroundColor Green
Write-Host "Use update_vps_git.ps1 to push future updates." -ForegroundColor Yellow
