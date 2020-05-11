export NODE_ENV?=development  ## manage code like minification
export STAGE?=development ## manage on what stage we are
export API_URL?=http://localhost:8080

COMMIT = `git rev-parse --short HEAD`

.PHONY: clean build deploy
.DEFAULT_GOAL := help

clean: ## Remove autogenerated folders
	rm -Rf ./server
	rm -Rf ./public

spa: clean ## Build a static site
	API_URL=https://api.documents.li NODE_ENV=production STAGE=production npx sui-bundler build -C
	cp -R ./statics/ ./public/
	# cp ./public/index.html ./public/200.html
	sed 's/DEV/'"`git rev-parse --short HEAD`"'/' statics/service-worker.js > public/service-worker.js

ssr: ## Build a SSR version of our SPA
	echo "Aquí va -> npx sui-ssr build -C"

spa_dev: spa
	npx sui-bundler dev

ssr_dev: ssr ## Build a SSR server and start it in dev mode
	node --inspect server/index.js

sw_dev: spa ## Start dev env
	# https://unix.stackexchange.com/a/204619
	trap "kill %1" SIGINT
	npx serve public -s & \
	npx nodemon -w statics/service-worker.js --exec 'cp ./statics/service-worker.js ./public/service-worker.js'

build: clean spa ## ssr ## Build a SPA app

deploy: clean build ## deploy new app
	now

release:
	git pull --unshallow
	git config --global user.email "ggsalas@gmail.com"
	git config --global user.name "ggsalas"
	git remote rm origin
	git remote add origin https://ggsalas:${GH_TOKEN}@github.com/documents-library/app.git > /dev/null 2>&1
	git checkout master
	git pull origin master
	rm -Rf package-lock.js
	npm install --only pro --package-lock-only --prefer-online --package-lock --progress false --loglevel error --no-bin-links --ignore-scripts --no-audit
	npm install --only=dev --package-lock-only --prefer-online --package-lock --progress false --loglevel error --no-bin-links --ignore-scripts --no-audit
	git add package-lock.json
	npx sui-mono release

help: ## show help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
