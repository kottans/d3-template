Getting started
===============
1. `git clone https://github.com/Kottans/d3-template.git my-d3-project && cd $_ && rm -rf .git` - gets this source locally & deletes .git folder, thus making it a simple folder
2. `npm i` - to complete `npm install` and get all the dependencies
3. `npm run setup` - installs bower dependencies
4. `npm start` - runs static server with livereload. In case you need to change port/hostname, be sure to edit [gulpfile](https://github.com/Kottans/d3-template/blob/master/gulpfile.js#L5-L6)

Dataset
=======
Medal data was retrieved from [hosted.stats.com](http://hosted.stats.com/olympics/medals_widget/data.asp).

Tutorials
=========

+ [Workshop by @mbostock](http://bost.ocks.org/mike/d3/workshop/)
+ [Tutorials from official wiki](https://github.com/mbostock/d3/wiki/Tutorials) -
be sure to check out API & Gallery in the wiki as well
+ [Egghead.io d3 series](https://egghead.io/series/introduction-to-d3)
+ [Intro to d3](http://square.github.io/intro-to-d3/)
