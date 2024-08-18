# project
$env:PROJECT_PATH = $PSScriptRoot + "\.."

# build scripts
$env:BUILD_SCRIPTS_PATH = $env:PROJECT_PATH + "\build-scripts"

# node
$env:NODE_INSTALL_FILE = $env:BUILD_SCRIPTS_PATH + "\3_node-v20.16.0-win-x64.zip"
$env:NODE_INSTALL_PATH = $env:PROJECT_PATH + "\node_install"
$env:NODE_MODULES_PATH = $env:NODE_INSTALL_PATH + "\node_modules"
$env:Path += ";" + $env:NODE_INSTALL_PATH + "\"

# app
$env:APP_NAME = "app-ggb"
$env:APP_PATH = $env:PROJECT_PATH + "\" + $env:APP_NAME
$env:APP_NODE_MODULES_PATH = $env:APP_PATH + "\node_modules"

# install npm
if (-Not (Test-Path -Path $env:NODE_INSTALL_PATH)) {
    Expand-Archive "$env:NODE_INSTALL_FILE" -DestinationPath "$env:NODE_INSTALL_PATH"
}