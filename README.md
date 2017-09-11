# the-oregon-trajectory #

[![Join the chat at https://gitter.im/7yl4r/the-oregon-trajectory](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/7yl4r/the-oregon-trajectory?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Bountysource](https://img.shields.io/bountysource/team/mozilla-core/activity.svg)](https://www.bountysource.com/trackers/13859664-7yl4r-the-oregon-trajectory)
[![ghit.me hit counter](https://ghit.me/badge.svg?repo=7yl4r/the-oregon-trajectory)](https://ghit.me/repo/7yl4r/the-oregon-trajectory)

[University of Earth-L4's entry for NASA SpaceApps 2198 challenge - 200 years of space habitation history](https://2015.spaceappschallenge.org/challenge/asteroids-2025-2100-future-history/)

Relive the historical mass terrestrial exodus of the 21st century and take the first wandering steps into the boundless frontier that we now call home. Recommended for entities human-age-equivalent-rating 12 and up.

### [CLICK HERE TO PLAY!](http://7yl4r.github.io/the-oregon-trajectory/) ###
![screenshot](http://i.imgur.com/jK6kihi.png)

Released: 2298

Genre: Adventure, Educational, Simulation

Perspective: 3rd-Person Perspective, Side-Scrolling, Human

Theme: Managerial, Real-Time

Educational: Planetology, History

[read more about it on the wiki!](https://github.com/7yl4r/the-oregon-trajectory/wiki)

![launch](http://i.imgur.com/a7GD71v.png)
-------------------------------------------------------------------------------------------------

# Begin Historical Role-Play #
This is meant to be a tongue-in-cheek re-creation of The Oregon Trail, from the perspective of a 30th century intelligence. [Rogue-lite](http://www.giantbomb.com/forums/general-discussion-30/agreedisagree-by-modern-standards-oregon-trail-was-562547/?page=1#js-message-5994632), procedural, and nearly impossible to win.

Want to know more? Head over to [the game wiki](https://github.com/7yl4r/the-oregon-trajectory/wiki).

## Contributing ##
First steps:

1. make github account
2. say hello [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/7yl4r/the-oregon-trajectory?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
3. see INSTALL.md for dev setup instructions


## version 2.x.x ##
Version 2.x.x is still in-development! Features from version 1.x.x are being ported into phaser.js, and 2.x.x will no longer depend on angular.js.
This will make the code more accessible to future developers and will allow for a more smooth user  (and developer) experience switching between game states.

### Getting Started ###
Various game states are initialized and the first "gameState" activated in `./index.coffee`; this file makes for a good entry point into the code.
The website is bundled together using less & browserify using the build.sh script; more information about building is in INSTALL.md.
[Issues tagged "easyFix"](https://github.com/7yl4r/the-oregon-trajectory/issues?q=is%3Aopen+is%3Aissue+label%3AeasyFix) may be good starting points.

## version 1.x.x ##
Basic, bare bones version for spaceapps comepetion. Includes some original features of The Oregon Trail.

This is the version currently on display on our gh-pages-powered website.

This version was built using a custom modular design using angular.js. Development on this branch (`angular-legacy`) has stopped, but if you want to pick it up please fork the project and take a look at the [1.x.x](https://github.com/7yl4r/the-oregon-trajectory/projects/3) project tracking board for archived discussions/issues.

## acknowledgements ##

* game details bastardized from [the internet archive's page on the Oregon Trail](https://archive.org/details/msdos_Oregon_Trail_The_1990) (and presumably the original MECC release)
* [GrafxKid's little green robot](http://opengameart.org/content/green-robot)
