$(aws ecr get-login --no-include-email --region eu-central-1)

docker build -t ertad-prod-front -f ./front/Dockerfile ./front
docker build -t ertad-prod-back -f ./back/Dockerfile ./back

docker tag ertad-prod-front:latest 423301381892.dkr.ecr.eu-central-1.amazonaws.com/ertad-prod-front:latest
docker tag ertad-prod-back:latest 423301381892.dkr.ecr.eu-central-1.amazonaws.com/ertad-prod-back:latest

docker push 423301381892.dkr.ecr.eu-central-1.amazonaws.com/ertad-prod-front:latest
docker push 423301381892.dkr.ecr.eu-central-1.amazonaws.com/ertad-prod-back:latest

###############################################################################
# UPDATING PRODUCTION SERVER
###############################################################################
# ssh root@our.vidal.ge "cd ertad && docker-compose pull && docker-compose up -d"
###############################################################################
# UPDATING PRODUCTION SERVER
###############################################################################