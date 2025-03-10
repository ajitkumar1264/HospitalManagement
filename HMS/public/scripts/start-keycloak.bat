@echo off
set CONTAINER_NAME=keycloakquarkus
set KEYCLOAK_PORT=4000
set REALM_CONFIG=keyclock/keyclock-realm.json

echo Checking if Keycloak is running...
docker ps | findstr %CONTAINER_NAME% >nul
if %ERRORLEVEL%==0 (
    echo Keycloak is already running.
) else (
    echo Starting Keycloak...
    docker run -d -p %KEYCLOAK_PORT%:8080 ^
        -e KC_BOOTSTRAP_ADMIN_USERNAME=admin ^
        -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin ^
        -v %~dp0%REALM_CONFIG%:/opt/keycloak/data/import/realm.json ^
        quay.io/keycloak/keycloak:26.1.2 start-dev --import-realm
)

echo Keycloak setup complete.
