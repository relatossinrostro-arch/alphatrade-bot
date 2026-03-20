# VPS Git Update Script
# Push local changes to GitHub and pull them on the VPS.
# Run this script in PowerShell.

$VPS_IP = "147.93.181.40"
$VPS_USER = "root"
$REMOTE_DIR = "/root/proyecto/bot"

Write-Host "📤 Pushing local changes to GitHub..." -ForegroundColor Cyan
git add .
git commit -m "Update bot"
git push origin main

Write-Host "🔄 Pulling changes on VPS..." -ForegroundColor Cyan
ssh ${VPS_USER}@${VPS_IP} @"
    cd ${REMOTE_DIR}
    git pull origin main
    npm install
    pm2 restart bot
    echo '✅ Bot updated and restarted on VPS.'
    pm2 status bot
"@

Write-Host "🚀 Update completed successfully." -ForegroundColor Green
