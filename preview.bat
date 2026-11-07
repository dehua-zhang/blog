@echo off
chcp 65001 >nul
title ZDH.blog 本地预览
cd /d "%~dp0"

rem 预览端口，如被占用可改成其他端口（如 8888）
set PORT=8080

echo ========================================
echo   ZDH.blog 本地预览
echo.
echo   电脑访问：http://localhost:%PORT%
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4"') do (
  for /f "tokens=* delims= " %%j in ("%%i") do echo   手机访问：http://%%j:%PORT%  （需与电脑连同一网络）
)
echo.
echo   关闭本窗口即可停止服务
echo ========================================
echo.
echo [提示] 首次运行如弹出 Windows 防火墙提示，请勾选"专用网络"并点击"允许访问"，
echo        否则手机无法连接。
echo.

rem 1 秒后用默认浏览器自动打开预览页
start "" /min cmd /c "timeout /t 1 >nul & start http://localhost:%PORT%"

rem 启动静态服务器（前台运行，关闭窗口即停止）
python -m http.server %PORT%
if errorlevel 1 (
  echo.
  echo [错误] 服务启动失败，可能是 %PORT% 端口已被占用。
  echo 请关闭占用该端口的程序，或将本脚本中的 set PORT=8080 改为其他端口。
  pause
)
