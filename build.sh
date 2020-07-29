echo 'compiling less css...'
./node_modules/.bin/lessc -x ./index.less > ./bundle.css

#echo 'transpiling .coffee into .js...'
#./node_modules/.bin/coffee --output js/coffee --compile coffee

echo 'browserify-ing module dependencies...'
./node_modules/.bin/browserify -t coffeeify index.coffee -o bundle.js

echo 'starting localhost:8000 server for testing...'
python -m http.server
