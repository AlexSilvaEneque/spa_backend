#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RESET='\033[0m'

# Usage: ./generate-feature.sh <feature_name>

# Nombre del feature
FEATURE_NAME=$1
echo -e "${CYAN}Ingresa el nombre del feature:${RESET}"
read FEATURE_NAME

# Verificación
if [ -z "$FEATURE_NAME" ]; then
    echo -e "${RED}Debes proporcionar el nombre del feature."
    exit 1
fi

# ruta base
BASE_DIR="./src/$FEATURE_NAME"

# creación de la estructura de carpetas
mkdir -p $BASE_DIR

# Preguntar al usuario si desea crear un archivo de configuración
read -p "¿Deseas crear un archivo controller para '$FEATURE_NAME'? (s/n): " create_controller
read -p "¿Deseas crear un archivo service para '$FEATURE_NAME'? (s/n): " create_service
read -p "¿Deseas crear un archivo routes para '$FEATURE_NAME'? (s/n): " create_routes
read -p "¿Deseas crear un archivo dto para '$FEATURE_NAME'? (s/n): " create_dto

if [[ $create_controller == "s" || $create_controller == "S" ]]; then
    touch "$BASE_DIR/$FEATURE_NAME.controller.ts"
    echo "Archivo generado en $BASE_DIR/$FEATURE_NAME.controller.ts"
fi


if [[ $create_service == "s" || $create_service == "S" ]]; then
    touch "$BASE_DIR/$FEATURE_NAME.service.ts"
    echo "Archivo generado en $BASE_DIR/$FEATURE_NAME.service.ts"
fi


if [[ $create_routes == "s" || $create_routes == "S" ]]; then
    touch "$BASE_DIR/$FEATURE_NAME.routes.ts"
    echo "Archivo generado en $BASE_DIR/$FEATURE_NAME.routes.ts"
fi

if [[ $create_dto == "s" || $create_dto == "S" ]]; then
    touch "$BASE_DIR/$FEATURE_NAME.dto.ts"
    echo "Archivo generado en $BASE_DIR/$FEATURE_NAME.dto.ts"
fi


echo -e "${GREEN}Módulo backend '$FEATURE_NAME' generado en $BASE_DIR${RESET}"