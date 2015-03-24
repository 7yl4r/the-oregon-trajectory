# the-oregon-trajectory #

[![Join the chat at https://gitter.im/7yl4r/the-oregon-trajectory](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/7yl4r/the-oregon-trajectory?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Relive the historical mass terrestrial exodus of the 21st century and take the first wandering steps into the boundless frontier that we now call home. Recommended for entities human-age-equivalent-rating 12 and up.

![launch](http://i.imgur.com/a7GD71v.png)

Released: 2290

Genre: Adventure, Educational, Simulation

Perspective: 3rd-Person Perspective, Side-Scrolling, Human

Theme: Managerial, Real-Time

Educational: Planetology, History

![map](http://pri.wpengine.netdna-cdn.com/wp-content/themes/planetary-resources/assets/img/map/map-bg-med.jpg)

[gameplay storyboard on google slides](https://docs.google.com/presentation/d/1ihHx87kblOmQkT12vq68Q_uwOBYdLQET56Rgdd7GUQY/edit?usp=sharing)

-------------------------------------------------------------------------------------------------

# Begin Historical Role-Play #
This is meant to be a tongue-in-cheek re-creation of The Oregon Trail, from the perspective of a 30th century intelligence. [Rogue-lite](http://www.giantbomb.com/forums/general-discussion-30/agreedisagree-by-modern-standards-oregon-trail-was-562547/?page=1#js-message-5994632), procedural, and nearly impossible to win.

Unless we get a lot of contributors, we'll probably need to cut content (and mini-games) but ideally we stick to the original style of gameplay. The game is largely text-driven with accompanying graphics and videos; interactive experiences are desired but will be up on the chopping block until core features are in place. 

## The Trajectory ##
The "trail" will be loosely based on realistic constraints, but we'll do a bit of a scenic route for plot's sake. This might involve some gravity-assist hand-waiving (physicists look away), but there will absolutely NOT be any of this maneuver-through-an-asteroid-field nonsense. Notable milestones along the ~~trail~~ trajectory might include:
 
 * notable asteroids or visable-from-orbit planetary features
 * lava tubes
 * lagrange points

 ![trajectory](http://i.imgur.com/owPzscY.png)

# Dev Details #
These are up for discussion, but here are my tentative thoughts:

Game sections can be implemented in a number of ways, but the game will be primarily driven by HTML5, javascript/coffeescript, & css/less. The game may traverse a number of html pages or may be implemented as a single-page angular application (if I find others comfortable with that), but will most definitely not be run inside a single canvas. WebGL scenes from [Cosmosium](https://github.com/rSimulate/Cosmosium) will be utilized along with existing content from any consenting parties. We don't have time to create all this content, so I want to find a way to leverage existing works as much as possible. Further details will be developed based on the responses I get, so send your ideas/thoughts/questions to me early. 

Please don't feel intimidated or hesitate to contact me, I want to find a workflow where you can be happy on this project whether you're a writer, programmer, artist, or even a playtester.

## first steps to getting involved ##

1. github account
2. say hello [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/7yl4r/the-oregon-trajectory?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
3. review [The Oregon Trail](https://archive.org/details/msdos_Oregon_Trail_The_1990)
4. contribute!

## version 1.0.0 ##
Basic, bare bones version includes the original features of The Oregon Trail and not a hair more.

## stretch goals ##
If we have extra manhours, these are some improvements to 1.0.0 we'd like to include.
* more advanced store pages. Choose your ship specs (engine type, etc), and then store offerings are tailored to remove stuff you don't need. Additionally, shop sub-pages to seperate 'food/energy/water' from fuel
* more advanced trajectory planner. v1 puts user on a set trajectory, but a big part of mission planning is finding a good launch window and trajectory plan. 


## diaglogue-tree resources ##
* [dialogue.js](https://github.com/scottbw/dialoguejs)
* [Lemma dialogger](https://github.com/et1337/Lemma/tree/master/Dialogger) (nice web ui for buidling dialog, and [blog writeup](http://et1337.com/2014/05/16/the-poor-mans-dialogue-tree/) too)
* [convo.js](https://github.com/hoverbird/convo)

## acknowledgements ##

* awesome map from [planetary resources](http://www.planetaryresources.com/asteriods/#asteroids-map)
* game details bastardized from [the internet archive's page on the Oregon Trail](https://archive.org/details/msdos_Oregon_Trail_The_1990) (and presumably the original MECC release)

## Additional Links / inspiration ##
#### [The Organ Trail](https://play.google.com/store/apps/details?id=com.hatsproductions.OrganTrail) ####
Zombies survival in the style of the Oregon Trail
#### Real-life x-over ####
![](http://i.imgur.com/iICqqPq.jpg)
#### Suggested random events ####

* a variation on [the dissin Terry joke](http://www.reddit.com/r/Jokes/comments/17sfkv/playing_oregon_trail/)

#### HTML Tombstone Generator ####
[Here](http://www.oregontrailtombstone.com/).

#### History of The Oregon Trail ####
[The game, I mean](http://www.citypages.com/2011-01-19/news/oregon-trail-how-three-minnesotans-forged-its-path/).

#### Humorous Video ####
[In need of overdubbing with "space words"](https://www.youtube.com/watch?v=CHps2SecuDk)
