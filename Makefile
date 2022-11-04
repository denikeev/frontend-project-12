install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build

start:
	make start-backend & make start-frontend

lint-frontend:
	make -C frontend lint