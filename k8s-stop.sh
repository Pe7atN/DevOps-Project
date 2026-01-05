#!/bin/bash
echo "Shutting down Kubernetes"

echo "Deleting Frontend and Backend..."
kubectl delete -f k8s/frontend-deployment.yaml --ignore-not-found
kubectl delete -f k8s/backend-deployment.yaml --ignore-not-found
kubectl delete -f k8s/backend-alias.yaml --ignore-not-found

echo "Deleting Database and Services..."
kubectl delete -f k8s/db-service.yaml --ignore-not-found
kubectl delete -f k8s/db-deployment.yaml --ignore-not-found

echo "Deleting Secrets and Storage..."

kubectl delete -f k8s/db-config.yaml --ignore-not-found
kubectl delete -f k8s/secrets.yaml --ignore-not-found
kubectl delete pvc postgres-pvc --ignore-not-found

echo "All resources removed."