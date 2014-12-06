Getting started
===============
1. `git clone https://github.com/Kottans/d3-template.git my-d3-project && cd $_ && rm -rf .git` - gets this source locally & deletes .git folder, thus making it a simple folder
2. `npm i` - to complete `npm install` and get all the dependencies
3. `npm run setup` - installs bower dependencies
4. `npm start` - runs static server with livereload. In case you need to change port/hostname, be sure to edit [gulpfile](https://github.com/Kottans/d3-template/blob/master/gulpfile.js#L5-L6)

Data
====
Medal data was retrieved from [hosted.stats.com](http://hosted.stats.com/olympics/medals_widget/data.asp).
