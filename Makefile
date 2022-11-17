.PHONY: up

up:
	docker compose up -d

.PHONY: down

down:
	docker-compose down


.PHONY: restart
restart:
		docker-compose down
		docker compose up -d
