import os
import fileinput

CONTROLLER_TEMPLATE = """require('angular');

var app = angular.module('{0}', []);

app.directive("{1}", function() {{
    return {{
        restrict: 'E',
        templateUrl: "/ng-modules/{1}/{1}.html"
    }};
}});

module.exports = angular.module('{0}').name;"""

TEST_PAGE_PRE = """<!DOCTYPE html>
<html lang="en" ng-app="ng-boot-boiler-demo" id="top">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

   <title>ng-module test</title>

   <meta name="description" content="angular & bootstrap boilerplate for rapid modern web dev">

   <!-- browserify bundle -->
   <script src="./../../bundle.js"></script>

   <!-- less bundle -->
   <link rel="stylesheet" href="./../../bundle.css"/>

   <link rel="author" href="https://github.com/7yl4r">
</head>
<body class="ng-cloak" ng-controller="MainCtrl">

<nav-header></nav-header>

<div role="main">

   <div class="container">
        """

TEST_PAGE_POST = """
    </div><!-- /.container -->

</div><!-- /.main -->

<app-footer></app-footer>

</body>
</html>
"""

module_name = raw_input("enter module name (with spaces (if any)). example: my module\n").strip()

def get_camel_name(module_name):
    words = module_name.split(' ')
    if len(words) == 1:
        return words[0]
    elif len(words) > 1:
        c_name = words[0]
        for word in words[1:]:
            c_name += word.title()
        return c_name
    else:
        raise ValueError('wordlist ' + str(words) + 'len < 1')

camel_name = get_camel_name(module_name)
hyphen_name = module_name.replace(" ", "-")

directory = './ng-modules/'+camel_name+'/'
print 'creating', directory
if os.path.exists(directory):
    print "module name already taken"
else:
    os.makedirs(directory)

print 'making html template (view) ', camel_name + '.html'
with open(directory + camel_name + '.html', 'w') as file:
    file.write("<div>\n\tput " + module_name + " view content here...\n</div>")

print 'making angular module ', camel_name + '.js'
with open(directory + camel_name + '.js', 'w') as file:
    file.write(CONTROLLER_TEMPLATE.format(hyphen_name, camel_name))

print 'making less style file', camel_name + '.less'
with open(directory + camel_name + '.less', 'w') as file:
    file.write("/* styles for " + module_name + " module */")

print 'making test html page ng-modules/' + camel_name + '/index.html'
with open(directory + 'index.html', 'w') as file:
    file.write(TEST_PAGE_PRE + module_name + ' test: <br> <' + hyphen_name + '></' + hyphen_name + '>' + TEST_PAGE_POST)

print 'adding module to package.json'
inserted = False
for line in fileinput.input('package.json', inplace=1):
    if line.strip() == '"browser":{':
        inserted = True
    else:
        if inserted:
            print '        "' + hyphen_name + '":"' + directory + camel_name + '.js",'
        inserted = False
    print line,

print 'adding styles to app.less'
with open("app.less", 'r+') as f:
    content = f.read()
    f.seek(0, 0)
    f.write('@import "' + directory[2:] + camel_name + '";\n' + content)

