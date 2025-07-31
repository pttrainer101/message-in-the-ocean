# 🚀 deploy.ps1 - Restart server, commit changes, and push to GitHub

Write-Host "🛑 Stopping any running Node server..."
Stop-Process -Name "node" -ErrorAction SilentlyContinue

Write-Host "▶️ Starting Node server in background..."
Start-Process node server.js

Write-Host "📂 Adding all files to Git..."
git add .

Write-Host "📝 Committing changes..."
git commit -m "🔄 Restart and deploy latest changes"

Write-Host "🌐 Pushing to GitHub..."
git push origin main

Write-Host "✅ Deployment script finished! Your server is live."
