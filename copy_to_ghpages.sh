#!/bin/sh
rm -rf ./dist
cp -r ./src ./dist
git checkout gh-pages
cp -r ./dist/* .
