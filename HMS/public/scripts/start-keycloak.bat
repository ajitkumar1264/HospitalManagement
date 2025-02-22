@echo off
echo Checking if Keycloak is running...
docker ps | findstr keycloak-container >nul
if %ERRORLEVEL%==0 (
    echo Keycloak is already running.
) else (
    echo Starting Keycloak...
    docker run -d --name keycloak-container -p 4000:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.1.2 start-dev
)
