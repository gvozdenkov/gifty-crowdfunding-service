composeDev = compose.dev.yaml

run-dev:
	docker compose -f $(composeDev) up --build

stop-dev:
	docker compose -f $(composeDev) down

restart-dev: stop-dev run-dev

composeProd = compose.prod.yaml

run-prod:
	docker compose -f $(composeProd) up --build

stop-prod:
	docker compose -f $(composeProd) down

restart-prod: stop-prod run-prod