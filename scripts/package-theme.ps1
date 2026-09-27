$ErrorActionPreference = 'Stop'
$repoPath = Split-Path -Parent $PSScriptRoot
$themePath = Join-Path $repoPath 'wordpress/nugeo'
$outputPath = Join-Path $repoPath 'releases'
if (-not (Test-Path (Join-Path $themePath 'assets/site.css'))) { throw 'Execute npm run build:theme no frontend antes de empacotar.' }
New-Item -ItemType Directory -Force -Path $outputPath | Out-Null
$archivePath = Join-Path $outputPath 'nugeo-uema-0.1.0.zip'
Add-Type -AssemblyName System.IO.Compression
$stream = [System.IO.File]::Open($archivePath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -LiteralPath $themePath -File -Recurse | ForEach-Object {
        $relative = $_.FullName.Substring($themePath.Length).TrimStart('\', '/').Replace('\', '/')
        $entry = $archive.CreateEntry('nugeo/' + $relative, [System.IO.Compression.CompressionLevel]::Optimal)
        $target = $entry.Open()
        $source = [System.IO.File]::OpenRead($_.FullName)
        try { $source.CopyTo($target) } finally { $source.Dispose(); $target.Dispose() }
    }
} finally { $archive.Dispose(); $stream.Dispose() }
Write-Output (Join-Path $outputPath 'nugeo-uema-0.1.0.zip')
