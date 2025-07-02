#!/bin/bash

# Usage: ./generate-feature.sh <feature_name>

# Nombre del feature
FEATURE_NAME=$1

# Verificación
if [ -z "$FEATURE_NAME" ]; then
    echo "Debes proporcionar el nombre del feature."
    exit 1
fi

# ruta base
BASE_DIR="./src/$FEATURE_NAME"

# creación de la estructura de carpetas
mkdir -p $BASE_DIR

touch "$BASE_DIR/$FEATURE_NAME.controller.ts"
touch "$BASE_DIR/$FEATURE_NAME.dto.ts"
touch "$BASE_DIR/$FEATURE_NAME.routes.ts"
touch "$BASE_DIR/$FEATURE_NAME.service.ts"

echo  "Módulo backend '$FEATURE_NAME' generado en $BASE_DIR"