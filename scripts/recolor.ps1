$ErrorActionPreference = "Stop"

$root = Join-Path $PSScriptRoot ".." | Resolve-Path
$src  = Join-Path $root "src"

$map = [ordered]@{
  'orange-300'            = 'sky-300'
  'orange-400'            = 'sky-400'
  'orange-500'            = 'blue-500'
  'orange-600'            = 'blue-600'
  'orange-700'            = 'blue-700'
  '#F97316'               = '#3B82F6'
  '#FB923C'               = '#60A5FA'
  '#FCD34D'               = '#93C5FD'
  'rgba(249,115,22'       = 'rgba(59,130,246'
  'rgba(249, 115, 22'     = 'rgba(59, 130, 246'
  'rgba(249,115,22,0.0)'  = 'rgba(59,130,246,0.0)'
}

Get-ChildItem -Path $src -Recurse -Include *.js,*.jsx,*.css | ForEach-Object {
  $path = $_.FullName
  $text = Get-Content -Raw -LiteralPath $path
  $orig = $text
  foreach ($k in $map.Keys) {
    $text = $text.Replace($k, $map[$k])
  }
  if ($text -ne $orig) {
    Set-Content -LiteralPath $path -Value $text -NoNewline
    Write-Host "updated $path"
  }
}

Write-Host "done"
