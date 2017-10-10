#!/bin/sh

# master branch
rm -rf ./dist
cp -r ./src ./dist
git checkout gh-pages

# gh-pages branch
cp -r ./dist/* .
rm -rf ./dist
