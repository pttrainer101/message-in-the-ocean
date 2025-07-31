function Save-UTF8 {
    param (
        [string]$Path,
        [string]$Content
    )
    $Content | Set-Content -Encoding UTF8 $Path
    Write-Host "✅ Saved $Path with UTF-8 encoding."
}
