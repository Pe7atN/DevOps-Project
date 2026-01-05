#!/bin/bash
echo "Starting Kubernetes"

kubectl apply -f k8s/db-config.yaml
kubectl apply -f k8s/secrets.yaml

kubectl create configmap db-init-scripts --from-file=src/db/ --dry-run=client -o yaml | kubectl apply -f -

kubectl apply -f k8s/db-deployment.yaml
echo "Waiting for Postgres to be ready..."
kubectl wait --for=condition=ready pod -l app=postgres --timeout=60s

kubectl apply -f k8s/db-service.yaml

kubectl apply -f k8s/backend-alias.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

echo "Waiting for pods to be ready..."
kubectl wait --for=condition=available --timeout=90s deployment/backend-service

echo "Deployment Complete!"
minikube service frontend-service