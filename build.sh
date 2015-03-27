echo 'compiling less css...'
./ng_modules/.bin/lessc -x ./app.less > ./bundle.css

#echo 'transpiling .coffee into .js...'
#./ng_modules/.bin/coffee --output js/coffee --compile coffee

echo 'browserify-ing module dependencies...'
./ng_modules/.bin/browserify -t coffeeify app.js -o bundle.js

echo 'starting localhost server for testing...'
python -m SimpleHTTPServer