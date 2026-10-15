$f = 'c:\Users\jaglucle\Downloads\Crown_of_Shadows-main (2)\Crown_of_Shadows-main\crown_of_shawdons-main\index.html'
$c = Get-Content $f -Raw
$c = $c.Replace('<script src="js/opening.js"></script>', '<script src="js/opening.js"></script>' + "`n  " + '<script src="js/login.js"></script>')
Set-Content $f $c -NoNewline
Write-Host "OK"
