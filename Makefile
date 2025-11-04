.PHONY: install build start start-frontend start-backend develop

install:
	npm ci

build:
	rm -rf frontend/dist
	npm run build
start-frontend:
	make -C frontend start
start-backend:
	npx start-server -s ./frontend/dist
start:
	make start-backend
develop:
	make start-backend & make start-frontend