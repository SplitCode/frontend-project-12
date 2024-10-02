build:
	npm run build

start:
	make start-backend

start-frontend:
	cd frontend && npm start

start-backend:
	npm run start

develop:
	make start-backend & make start-frontend

