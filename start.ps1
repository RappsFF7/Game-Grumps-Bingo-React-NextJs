if ($null -eq $env:PROJECT_PATH) { Push-Location "build-scripts" }
else { Push-Location "$env:BUILD_SCRIPTS_PATH"}

& ".\2_config_env.ps1"
if (-Not (Test-Path -Path $env:APP_NODE_MODULES_PATH)) {
    & ".\4_app_dependencies.ps1"
}
& ".\6_app-start.ps1"
Pop-Location