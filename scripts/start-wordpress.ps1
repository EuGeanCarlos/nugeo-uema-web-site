$ErrorActionPreference = 'Stop'
$repoPath = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoPath
$sitePath = Join-Path $repoPath '.local-wordpress'
New-Item -ItemType Directory -Force -Path $sitePath | Out-Null
$accessPath = Join-Path $repoPath 'wordpress/.local-access.json'
if (-not (Test-Path $accessPath)) {
    $access = @{ username = 'admin'; password = [guid]::NewGuid().ToString('N') } | ConvertTo-Json
    [System.IO.File]::WriteAllText($accessPath, $access, (New-Object System.Text.UTF8Encoding $false))
}
$installMode = if (Test-Path (Join-Path $sitePath 'wp-load.php')) { 'do-not-attempt-installing' } else { 'download-and-install' }
$cliPath = Join-Path $repoPath '.playground/node_modules/@wp-playground/cli/wp-playground.js'
if (-not (Test-Path $cliPath)) {
    npm install --prefix .playground --no-audit --no-fund --ignore-scripts --save-exact @wp-playground/cli@3.1.55
    if ($LASTEXITCODE -ne 0) { throw 'Não foi possível instalar o WordPress Playground.' }
}
node $cliPath server --wp=7.1.2 --php=8.3 --port=9400 --site-url=http://127.0.0.1:9400 --workers=6 --wordpress-install-mode=$installMode --mount-dir-before-install $sitePath /wordpress --mount-dir (Join-Path $repoPath 'wordpress/nugeo') /wordpress/wp-content/themes/nugeo --mount-dir (Join-Path $repoPath 'wordpress') /nugeo-tools --blueprint=wordpress/blueprint.json
exit $LASTEXITCODE
