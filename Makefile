install:
	npm ci

build:
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

lint-frontend:
	make -C frontend lint

