dcup-infra:
	- docker-compose -p autopilot-drone-infra -f infrastructure/database/docker-compose.yaml -f infrastructure/mqtt/docker-compose.yaml up

dcup-dev:
	- docker-compose -f docker-compose.yaml up

dcup-prod:
	- docker-compose -f docker-compose.prod.yaml up

dc-nuclear:
	- docker stop $$(docker ps -a -q)
	- docker kill $$(docker ps -q)
	- docker rm $$(docker ps -a -q)
	- docker rmi $$(docker images -q)
	- docker system prune --all --force --volumes