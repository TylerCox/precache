function precacheConstructor(){
///////////////////////////////////////////////////////////////////////////////////////////////
//Precache/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//Stored variables
var spacing = 0;
var imagecount = 0;
var imageList = [];
var maxAnimationTime = 3000;
//Main function
this.go = function (goto,forward,images,dots,animation) {
//////////////////////
//Web page to access when loading finishes
//var goto = "http://www.google.com";

//var forward = true; 
//false if you want to test without forwading to goto page.
//true for deployed mode. 
    
//Place your image locations in the list below
/*
var images = [
    "http://images.huffingtonpost.com/2015-12-23-1450895141-5774790-food02.jpg",
    "http://weknowyourdreams.com/images/food/food-03.jpg",
    "http://www.charterforcompassion.org/images/menus/communities/best-food.jpg",
    "http://www.technobuffalo.com/wp-content/uploads/2014/04/fast-food.jpg",
];
*/
    
//var dots = true;
//Show rotating dots.
    
//var animation = dropdown
//set to false for no animation
///////////////////////
    
    imagecount = images.length;
    
    $(document).ready(function(){
        adjustStatusScreen();
        if(dots){
            rotateDots();
        }else{
            $("#dots").css("display","none");   
        }
        if(animation && animation.prep){
                animation.prep();   
        }
        adjustExistingImages();
    });
    
    var insertImage = function(obj,c){
        var top = document.getElementById("precacheProgress");
        obj.className = "loaded";
        obj.position = c;
        obj.leftloc = spacing*obj.position;
        if(animation){
            obj.animating = true;
            obj.id = "downloaded"+c;
            top.appendChild(obj);
            animation(obj);
            imageList.push(obj);
        }else{
            obj.animating = false;
            obj.id = "downloaded"+c;
            obj.style.left = ""+obj.leftloc+"px";  
            top.appendChild(obj);
            imageList.push(obj);
        }
    }
    
    var finish = function(){
        $("#swap_complete").html("Complete");
        setTimeout(function(){
            if(forward){window.location.replace(goto);}
        },maxAnimationTime);
    }
    
    var count = 0;
    images.forEach(function(src){
        var i = $("<img>");
        i.load(function(){
            insertImage(this,count);
            count++;  
            if(count == images.length){
                finish();
            }
        }).error(function(err){
            var currentCount = count;
            var j = $("<img>");
            j.load(function(){insertImage(this,currentCount);});
            j.attr("src","precache-images/notfound.png");
            count++;
            if(count == images.length){
                finish();
            }
        });
        i.attr("src",src);
    });

}

var adjustStatusScreen = function(){
    var width = $(window).width();
    var height = $(window).height();
    var width3rd = width/3;
    var height3rd = height/3;
    var tar = $("#precache");
    var minw = parseFloat(tar.css("min-width"));
    var minh = parseFloat(tar.css("min-height"));
    if(width3rd > minw){
        tar.css({left:width3rd});
    }else{
        tar.css({left:(width-minw)/2});
    }
    if(height3rd > minh){
        tar.css({top:height3rd});
    }else{
        tar.css({top:(height-minh)/2});
    }
    tar.width(width3rd);
    tar.height(height3rd);
};
    
var adjustExistingImages = function(){
    spacing = ($("#precache").width())/imagecount;
    imageList.forEach(function(obj){
        obj.leftloc = spacing*obj.position;
        if(obj.animating != true){
               obj.style.left = ""+obj.leftloc+"px";
        }
    });
}
    
$(window).resize(
    function(){
        adjustStatusScreen();
        adjustExistingImages();
    }
);

    
///////////////////////////
//Dots Addon
var dotcolors =    ["#000000",
                    "#808080",
                    "#C4C4C4",
                    "#FFFFFF",
                    "#FFFFFF",
                    "#FFFFFF",
                    "#FFFFFF",
                    "#FFFFFF",
                    "#FFFFFF",
                    "#FFFFFF"];
var dotRotator = {"dot1":4,"dot2":3,"dot3":2,"dot4":1,"dot5":0};  
var rotateDots = function(){
    setInterval(function(){
        dotRotator["dot1"] = (dotRotator["dot1"]+1)%10;
        dotRotator["dot2"] = (dotRotator["dot2"]+1)%10;
        dotRotator["dot3"] = (dotRotator["dot3"]+1)%10;
        dotRotator["dot4"] = (dotRotator["dot4"]+1)%10;
        dotRotator["dot5"] = (dotRotator["dot5"]+1)%10;
        $("#dot1").css("color",dotcolors[dotRotator["dot1"]]);
        $("#dot2").css("color",dotcolors[dotRotator["dot2"]]);
        $("#dot3").css("color",dotcolors[dotRotator["dot3"]]);
        $("#dot4").css("color",dotcolors[dotRotator["dot4"]]);
        $("#dot5").css("color",dotcolors[dotRotator["dot5"]]);
    },100);
}
///////////////////////////
    

///////////////////////////
//Animations

this.dropdown = function(obj){
    obj.style.left = ""+obj.leftloc+"px";
    obj.style.bottom = ""+($("#precache").height()+20)+"px";
    //obj.style.bottom = "0px";
    $("#"+obj.id).animate(
        {   bottom: "0px",
            left: ""+obj.leftloc+"px"
        },
        {   duration : maxAnimationTime,
            step: function(now, fx) {
                if(fx.prop == "left"){
                    fx.now = obj.leftloc;
                    fx.end = obj.leftloc;
                }
            },
        complete: function(){
                obj.animating = false;
            }
        }
    );
}
this.dropdown.prep = function(){
    $("#precache").css("border-top","solid 1px black");
    $("#precache").css("border-bottom","solid 1px black");
}


///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
}
var precache = new precacheConstructor();