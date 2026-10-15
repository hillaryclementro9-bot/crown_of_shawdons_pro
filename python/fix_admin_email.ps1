$f = 'c:\Users\jaglucle\Downloads\Crown_of_Shadows-main (2)\Crown_of_Shadows-main\crown_of_shawdons-main\js\main.js'
$c = Get-Content $f -Raw
$c = $c.Replace("'hillaryrodrigues@admin.cos'", "'hillaryclementro@admin.cos'")
Set-Content $f $c -NoNewline
Write-Host "OK"
