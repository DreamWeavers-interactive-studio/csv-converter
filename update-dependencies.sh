#!/bin/bash

set -e

# Actualizar Next.js a la última versión
pnpm add next@latest

# Actualizar todas las dependencias a sus últimas versiones
pnpm update

# Actualizar todas las devDependencies a sus últimas versiones
pnpm update --dev

# Mostrar las dependencias actualizadas
echo ""
echo "Dependencias actualizadas:"
pnpm list --depth 0

# Ejecutar pnpm audit para verificar vulnerabilidades
echo ""
echo "Ejecutando pnpm audit..."
set +e
pnpm audit
AUDIT_EXIT=$?
set -e

if [ $AUDIT_EXIT -eq 0 ]; then
    echo "No se encontraron vulnerabilidades de seguridad."
else
    echo ""
    echo "Se encontraron vulnerabilidades en las dependencias."
    read -r -p "¿Desea intentar corregirlas automáticamente con 'pnpm audit fix'? (s/N): " respuesta
    case "$respuesta" in
        [sS] | [sS][iI])
            set +e
            pnpm audit fix
            FIX_EXIT=$?
            set -e
            if [ $FIX_EXIT -ne 0 ]; then
                echo ""
                echo "No se pudo completar el audit fix de forma automática."
                echo "Debe resolver las vulnerabilidades manualmente: ejecute 'pnpm audit' y actualice o elimine las dependencias vulnerables."
                exit 1
            fi
            set +e
            pnpm audit
            VERIFY_EXIT=$?
            set -e
            if [ $VERIFY_EXIT -ne 0 ]; then
                echo ""
                echo "El audit fix se aplicó, pero siguen existiendo vulnerabilidades."
                echo "Debe resolverlas manualmente: ejecute 'pnpm audit' para revisar el detalle."
                exit 1
            fi
            echo ""
            echo "Las vulnerabilidades se corrigieron automáticamente."
            ;;
        *)
            echo "Omitiendo audit fix. Debe revisar manualmente las vulnerabilidades con 'pnpm audit'."
            exit 1
            ;;
    esac
fi

echo ""
echo "Proceso finalizado."