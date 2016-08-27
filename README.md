# react-form-demo-page

Status: Completed (Meet the Spec Requirement)

INTRO
-----
This webpage is a single page application, and fully responsive. Under the hood, it utilises Facebook React  
(ES6 through Babel Transpiler), and Twitter Bootstrap. Have a look at the "Technical Consideration +
Presumptions" that can be found in "jsx/main.js" for detailed information about my approach in building this  
web page.  

SOURCE CODE STRUCTURE  
---------------------
/frontend/   
The core source code of the page. The React JSX code and SASS CSS styling reside in here.

/public/  
All of the compiled React, and SASS code can be found in this folder after running the "npm start". The folder
also contains mainScript.js which contains a JS script that will not work properly if minimised with Webpack/Gulp.

/views/  
index.html can be found in here. It is served over file not localhost as the source code doesn't incorporate backend
element. That means in order to see the index.html in action, just double click and display it on a web browser.

/unit_test/  
The source code comes with an unit test sample that will test some functions declared inside the helper.js.
Uncomment the lines inside the /jsx/main.js to see the unit test in action. The output will be displayed in 
console.log. 

/node_modules/  
This folder will show up after running the "npm install". This folder contains all the necessary libraries to get
the webpage up & running. 

gulpfile.js & webpack.config.js  
The source code utilises a mix of gulp & webpack to compile, bundle, rename, and minimised the source code.

Upon executing npm start, the package.json will run gulp build, that in turn will run the webpack bundler. 
The React JSX code, and SASS code are compiled inside the Webpack bundler.    

