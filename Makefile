install:
		npm ci

start-frontend:
		make -C frontend start

build:
		rm -rf frontend/build
		npm run postinstall
		npm run build

start-backend:
		npm start
