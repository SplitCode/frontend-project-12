install:
	npm ci && make -C frontend install

start-frontend:
	cd frontend && npm start

build:
		rm -rf frontend/build
		npm run build

start:
	make start-backend

start-backend:
		npm run start

develop:
	make start-backend & make start-frontend

