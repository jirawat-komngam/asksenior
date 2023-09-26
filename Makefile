compose-dev:
	docker compose -f docker-compose-dev.yml up --detach
compose-prod:
	docker compose -f docker-compose-prod.yml up --detach