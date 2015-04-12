#!/usr/bin/env python
import os
import fileinput

CONTROLLER_TEMPLATE = """require('angular');
Howl = require('howler');    // for sounds (if you need them)
Nodule = require('nodule');  // for nodule helpers

var app = angular.module('{0}', []);

app.directive("{1}", function() {{
    return {{
        restrict: 'E',
        templateUrl: "ng-modules/{1}/{1}.html"
    }};
}});

app.controller("{1}Controller", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope) {{
    var vm = this;
    vm.nodule = new Nodule($rootScope, '{0}');

    // your controller code here
    vm.clickedTheButton = function(){{
        alert('you clicked {0} button')
    }}
}}]);

module.exports = angular.module('{0}').name;"""

TEST_PAGE_PRE = """<!DOCTYPE html>
<html lang="en" ng-app="the-oregon-trajectory" id="top">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

   <title>ng-module test</title>

   <meta name="description" content="angular & bootstrap boilerplate for rapid modern web dev">

   <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

   <!-- browserify bundle -->
   <script src="./../../bundle.js"></script>

   <!-- less bundle -->
   <link rel="stylesheet" href="./../../bundle.css"/>

   <link rel="author" href="https://github.com/7yl4r">
</head>
<body class="ng-cloak" ng-controller="MainCtrl">

<nav-header></nav-header>

<div role="main">

   <div>
        <!-- main menu needed here for init -->
        <main-menu class="game-module" style="display:none"></main-menu>
        """

TEST_PAGE_POST = """
    </div>

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
    raise ValueError("module name already taken")
else:
    os.makedirs(directory)

print 'making html template (view) ', camel_name + '.html'
with open(directory + camel_name + '.html', 'w') as file:
    file.write('<div ng-controller="' + camel_name + 'Controller as ' + camel_name + 'Ctrl">\n\t'+
               'put ' + module_name + " view content here...\n"+
               '\t<button ng-click="' + camel_name + 'Ctrl.clickedTheButton()"></button>\n</div>')

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

print 'adding module to app.coffee main module'
inserted = False
for line in fileinput.input('app.coffee', inplace=1):
    if line.strip() == "var app = angular.module('the-oregon-trajectory', [":
        inserted = True
    else:
        if inserted:
            print "        require('" + hyphen_name + "'),"
        inserted = False
    print line,

print 'adding styles to app.less'
with open("app.less", 'r+') as f:
    content = f.read()
    f.seek(0, 0)
    f.write('@import "' + directory[2:] + camel_name + '";\n' + content)

