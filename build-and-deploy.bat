@echo off
REM Build frontend and copy to backend static folder

echo Building React frontend...
cd /d "c:\Users\abc\Desktop\sanjay-verma-portfolio\frontend"
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Copying build files to backend static folder...
set BACKEND_STATIC="c:\Users\abc\Desktop\sanjay-verma-portfolio\backend\src\main\resources\static"

REM Delete old static folder
if exist %BACKEND_STATIC% (
    rmdir /s /q %BACKEND_STATIC%
)

REM Create new static folder
mkdir %BACKEND_STATIC%

REM Copy build files
xcopy "c:\Users\abc\Desktop\sanjay-verma-portfolio\frontend\build\*" %BACKEND_STATIC% /E /I /Y

echo.
echo Build and deployment complete!
echo.
echo Next steps:
echo 1. Open another terminal
echo 2. Run: cd c:\Users\abc\Desktop\sanjay-verma-portfolio\backend
echo 3. Run: mvn clean package -DskipTests
echo 4. Run: mvn spring-boot:run
echo.
pause
