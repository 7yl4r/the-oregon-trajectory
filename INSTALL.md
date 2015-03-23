how to get started developing

You'll need git and npm to get started. To test locally you'll also need to run a server (we use python SimpleHTTPServer). Contact us on gittr chat if you have any trouble.

These instructions assume you're using ubuntu or similar linux distro. Windows/mac shouldn't be too different though.

1. open a terminal
2. download the repo with git: `git clone https://github.com/7yl4r/the-oregon-trajectory`
3. enter the project directory: `cd the-oregon-trajectory`
4. install with npm `npm install`

You're ready! To build the app use the included `./build.sh` file. This file bundles the javascript/coffeescript & less/css into a bundle.js and bundle.css file for the site html to load. It will also try to start a server on localhost so that you can test out your changes before pushing to the repo. To view the application after building & starting the server just open your browser to localhost:8000.

To review, the workflow here is:

1. edit files
2. run build.sh
3. check your changes on localhost
4. `git add` any new files
5. `git pull` to check for changes on the remote
6. resolve any merge conflicts
7. `git commit -a -m 'i did stuff to stuff'` to describe your changes & create a local commit
8. `git push origin master` to push your commit(s) to the github repo

contact us on gitter chat if you have any troubles.