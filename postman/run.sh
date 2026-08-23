#!/bin/bash
npx newman run postman/postman_collection.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export postman/report.html
