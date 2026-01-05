#!/bin/bash
echo "Starting Kubernetes"

kubectl apply -f k8s/db-config.yaml
kubectl apply -f k8s/secrets.yaml

kubectl apply -f k8s/db-deployment.yaml
kubectl apply -f k8s/db-service.yaml

kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

echo "Waiting for pods to be ready..."
kubectl wait --for=condition=available --timeout=60s deployment/backend-deployment

echo "Deployment Complete!"
minikube service frontend-service