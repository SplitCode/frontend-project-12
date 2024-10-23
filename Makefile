install:
	npm ci && make -C frontend install

build:
	npm run build

start:
	npx start-server -s ./frontend/build

start-backend:
	npx start-server

start-frontend:
	cd frontend && npm start

develop:
	make start-backend & make start-frontend

lint:
	make -C frontend lint

fix:
	make -C frontend fix