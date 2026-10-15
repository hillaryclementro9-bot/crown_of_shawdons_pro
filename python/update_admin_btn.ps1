$f = 'c:\Users\jaglucle\Downloads\Crown_of_Shadows-main (2)\Crown_of_Shadows-main\crown_of_shawdons-main\index.html'
$c = Get-Content $f -Raw

$old = '<button id="btn-admin-login" onclick="LoginAdmin.open()" style="position:fixed;bottom:1.5rem;right:1.5rem;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#3a0000,#1a0000);border:1px solid #8b6914;color:#c9a84c;font-size:1.3rem;cursor:pointer;z-index:1000;display:none;align-items:center;justify-content:center">&#128081;</button>'

$new = '<button id="btn-admin-login" onclick="LoginAdmin.open()" title="" style="position:fixed;top:50%;left:0;transform:translateY(-50%);width:6px;height:60px;background:rgba(201,168,76,0.18);border:none;border-radius:0 4px 4px 0;cursor:pointer;z-index:1000;display:none;transition:all 0.3s ease;padding:0" onmouseenter="this.style.width=''18px'';this.style.background=''rgba(201,168,76,0.45)''" onmouseleave="this.style.width=''6px'';this.style.background=''rgba(201,168,76,0.18)''"></button>'

$c = $c.Replace($old, $new)
Set-Content $f $c -NoNewline
Write-Host "OK"
