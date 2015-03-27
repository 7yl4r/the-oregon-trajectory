echo 'compiling less css...'
./node_modules/.bin/lessc -x ./app.less > ./bundle.css

#echo 'transpiling .coffee into .js...'
#./node_modules/.bin/coffee --output js/coffee --compile coffee

echo 'browserify-ing module dependencies...'
./node_modules/.bin/browserify -t coffeeify app.js -o bundle.js

echo 'starting localhost server for testing...'
python -m SimpleHTTPServer