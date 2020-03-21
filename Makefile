export NODE_ENV ?= development
export STAGE ?= development

.PHONY: clean build deploy
.DEFAULT_GOAL := help

clean: ## Remove autogenerated folders
	rm -Rf ./server
	rm -Rf ./public

spa: ## Build a static site
	npx sui-bundler build -C
	cp -R ./statics/ ./public/
	cp ./public/index.html ./public/200.html

ssr: ## Build a SSR version of our SPA
	npx sui-ssr build -C

ssr_dev: ssr ## Build a SSR server and start it in dev mode
	node --inspect server/index.js

build: clean spa ssr ## Build a SPA app

deploy: clean build ## deploy new app
	surge public/ -d https://documentsly-$(STAGE).surge.sh

release:
	git pull --unshallow
	git config --global user.email "carlosvillu@gmail.com"
	git config --global user.name "carlosvillu"
	git remote rm origin
	git remote add origin https://carlosvillu:${GH_TOKEN}@github.com/carlosvillu/UABTexthandler.git > /dev/null 2>&1
	git checkout master
	git pull origin master
	rm -Rf package-lock.js
	npm install --only pro --package-lock-only --prefer-online --package-lock --progress false --loglevel error --no-bin-links --ignore-scripts --no-audit
	npm install --only=dev --package-lock-only --prefer-online --package-lock --progress false --loglevel error --no-bin-links --ignore-scripts --no-audit
	git add package-lock.json
	npx sui-mono release

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
