& ".\2_config_env.ps1"
Push-Location "$env:APP_PATH"
npm run build
Pop-Location