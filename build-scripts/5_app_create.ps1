& ".\2_config_env.ps1"
Push-Location "$env:PROJECT_PATH"
npx create-next-app@14.2.5
Pop-Location