Precache is a project by Tyler Cox

Precache loads images from a list set in the index.html page contained in the precache.go function call. 
When the list is loaded, it redirects the browser to whatever page is listed as the first variable in the precache.go function call.  
The last variable of preache.go sets what animation you want to use for presenting the photos as they are loaded, new animations can be created by adding functions in the "Animation" section to precache.js. Create the function similar to this.dropdown, and if there is any preperation that needs to be done when precache.go begins, create an extra variable to your function object with the name '.prep' (IE: this.dropdown has a variable fucntion called this.dropdown.prep). 
