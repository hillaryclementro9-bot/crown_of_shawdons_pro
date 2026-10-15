$f = 'c:\Users\jaglucle\Downloads\Crown_of_Shadows-main (2)\Crown_of_Shadows-main\crown_of_shawdons-main\index.html'
$c = Get-Content $f -Raw
$c = $c.Replace('<div class="cad-divider-or"><span></span><span class="cad-or-text">ADMIN</span><span></span></div><button class="cad-btn-admin" onclick="LoginAdmin.open()">&#128081; Acesso Administrador</button><p class="cad-login-link">', '<p class="cad-login-link">')
Set-Content $f $c -NoNewline
Write-Host "OK"
