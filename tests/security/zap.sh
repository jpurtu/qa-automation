#!/bin/bash

TARGET="https://www.saucedemo.com"
REPORT="/home/stark/qa-automation/tests/security/zap-report.html"

echo "Iniciando ZAP security scan en $TARGET..."

/usr/share/zaproxy/zap.sh -cmd \
  -quickurl $TARGET \
  -quickprogress \
  -quickout $REPORT

echo "Reporte generado en $REPORT"
