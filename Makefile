.PHONY: clean lint build test dist watch dist-watch publish

V=patch

all: clean lint build test dist

clean:
	rm -rf dist/ lib/

lint:
	npm run lint

build:
	npm run build

test:
	npm test

dist:
	npm run dist

watch:
	npm run watch

dist-watch:
	npm run dist-watch

publish: all
	npm version ${V}
	git push && git push --tags
	npm publish
