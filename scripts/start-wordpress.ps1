$ErrorActionPreference = 'Stop'
$repoPath = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoPath
$projectHash = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes($repoPath))).Replace('-', '').Substring(0, 16)
$serverMutex = New-Object System.Threading.Mutex($false, ('Local\NUGEO-' + $projectHash))
$hasMutex = $false
try {
    try { $hasMutex = $serverMutex.WaitOne(0) } catch [System.Threading.AbandonedMutexException] { $hasMutex = $true }
    if (-not $hasMutex) { throw 'Este projeto já tem uma instância local em execução. Acesse http://127.0.0.1:9400/.' }
    $probe = New-Object System.Net.Sockets.TcpClient
    try {
        try { $connection = $probe.ConnectAsync('127.0.0.1', 9400); $null = $connection.Wait(400) } catch { }
        if ($probe.Connected) { throw 'A porta 9400 já está em uso. Não inicie outra instância sobre o mesmo banco.' }
    } finally { $probe.Dispose() }
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
node (Join-Path $PSScriptRoot 'prepare-local-wordpress.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Falha na preparação SQLite. O banco foi preservado.' }
node $cliPath server --wp=7.1.2 --php=8.3 --port=9400 --site-url=http://127.0.0.1:9400 --workers=6 --wordpress-install-mode=$installMode --mount-dir-before-install $sitePath /wordpress --mount-dir (Join-Path $repoPath 'wordpress/nugeo') /wordpress/wp-content/themes/nugeo --mount-dir (Join-Path $repoPath 'wordpress') /nugeo-tools --blueprint=wordpress/blueprint.json
if ($LASTEXITCODE -ne 0) { throw 'O Playground falhou. Consulte a mensagem PHP acima; não remova o banco para reiniciar.' }
} finally {
    if ($hasMutex) { $serverMutex.ReleaseMutex() }
    $serverMutex.Dispose()
}
