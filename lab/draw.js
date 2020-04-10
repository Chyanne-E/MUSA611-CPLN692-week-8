/* =====================
Lab 1: Leaflet Draw

Task 1: Try to draw something on the map */

//Global variables
var myRectangle;
var myRectangles = [];

// Initialize Leaflet Draw
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    marker: false,
    circlemarker: false,
    rectangle: true
  }
});

map.addControl(drawControl);

/*
var x = deleteOne(myRectangles);

function deleteOne(myRectangles) {
  //map.removeLayer(myRectangles[0]);
  console.log('flowers'); // did this just to test if I could get a function to run on only the button click- I couldn't.. it runs automatically before I even draw a rectangle
}
*/

//Task 2: Add rectangles to map -done
map.on('draw:created', function (e) {
  var type = e.layerType;
  var layer = e.layer;
  var id = L.stamp(layer);
  console.log(layer, type, id);
  //if(myRectangle) {map.removeLayer(myRectangle);}
  myRectangle = layer;
  map.addLayer(myRectangle);
  myRectangles.push(drawControl);

  var jhtml = $.parseHTML(`<div class="shape" data-leaflet-id=${id}><h1>Current ID:${id}</h1></div>`);
$('#shapes').append(jhtml);

//Task 7: highlight Current ID in sidebar by hovering over a rectangle
// Q: I see how to identify the sidebar by leaflet_id, when I inspect element, the sidebar is shown as <div class="shape" data-leaflet-id="119"><h1>Current ID:119</h1></div>
// When I inspect element for the rectangle tho, no leaflet_id is included... I can't find the corresponding number anywhere (except in the console), so how do I identify each rectangle to be hovered over?
//to eventaully apply color- maybe build off Nathan's code for highlighting sidebar text?
/*
NATHAN'S CODE FOR CHANGING THE BACKGROUND COLOR
  layer.on("mouseover", function(e) {
  
    console.log(e.target._leaflet_id);
    $(`div[data-leaflet-id|=${e.target._leaflet_id}]`).css('background-color', 'yellow');
  })
*/

/*
$(`div[stroke]='#3388ff'`).hover(function(f) {
  console.log('flowers');
});
*/
//remove rectangle by clicking Current ID in sidebar
$(`div[data-leaflet-id|=${id}]`).click(function(e) {
  var currentId = $(e.currentTarget).data('leaflet-id');

  map.eachLayer(function (myLayer) {
    if (L.stamp(myLayer) === currentId) {
      map.removeLayer(myLayer);
      $(e.currentTarget).remove();
    }
  });
});
});

$(``)

/*
EXAMPLE FROM ONLINE TO CREATE AN ONCLICK FUNCTION
window.onclick = myFunction;
function myFunction() {
 document.getElementsByTagName("BODY")[0].style.backgroundColor = "lime";
}
*/

/*
var jhtml = $.parseHTML(`<button onclick="map.removeLayer(myRectangle)"> Current ID:${id} </button>`);
$('#shapes').append(jhtml);
});
*/

//VERSION 2: Runs a function to console log "flowers" when button is clicked
//var jhtml = $.parseHTML(`<button onclick="console.log('flowers')"> Current ID:${id} </button>`);
//$('#shapes').append(jhtml);
//});


//VERSION 1: Just makes Shape name in sidebar a link (to any website)
//var jhtml = $.parseHTML(`<a class="shape" href="https://laracasts.com/discuss/channels/vue/make-whole-div-clickable" data-leaflet-id=${id}><h1>Current ID:${id}</h1></a>`);
//$('#shapes').append(jhtml);
//});

//ORIGINAL: (works! just text!)
/*
var jhtml = $.parseHTML(`<div class="shape" data-leaflet-id=${id}><h1>Current ID:${id}</h1></div>`);
$('#shapes').append(jhtml);
});
//add click function
*/

/*
Try to use one or two of the drawing tools. They should allow you to draw
without needing any additional configuration. These shapes will not be added to
the map. We'll fix that in the next task.

Task 2: Add rectangles to map -done

Add the rectangle layers to the map when they are drawn. Hint: you can use the
addLayer function that we have used in the past.

Task 3: Limit to one rectangle -done

For our application, we only want one rectangle to be displayed on the map at
any given time. When a user draws a new rectangle, the old rectangle should be
removed from the map. To remove a previously drawn rectangle, we will need to
store some information about it in a global variable. Use the variable
myRectangle, which is already defined in this document, to store the new Leaflet
layer before adding it to the map.

You will also need to remove the previous layer from the map.

If you get the error: "Cannot read property '_leaflet_id' of undefined", it
may be because you are trying to remove a layer that does not yet exist.
Check to see if myRectangle is defined before trying to remove it.

Task 4: Add shape to sidebar -done

Let's add the shape we've created to the sidebar. In the HTML, there is a
container with ID #shapes. Use jQuery's `append` or `appendTo` function
to add a new div inside the #shapes container. The HTML should look somewhat
like the following:

<div class="shape" data-leaflet-id="[the id]"><h1>Current ID: [the id]</h1></div>

Where [the id] is replaced by the Leaflet ID of the layer.

When a new layer is added, you can use jQuery's empty function to clear
out the #shapes container before appending a new .shape.


HINT 1: Templating is probably the best way to build HTML elements. Great news:
javascript (finally) has a fantastic templating system. (If the docs don't
help, bug your professor for an example!)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

Hint 2: jQuery can help! Once you've built some HTML, jQuery can parse it. At
that point, you should be able to modify it and use it like any other element
jQuery has selected.
https://api.jquery.com/jquery.parsehtml/

Hint 3: We've never seen this "data-leaflet-id" thing. It's just an attribute like
we've used before (think back to checkboxes, which required jQuery's 'attr'
method https://api.jquery.com/attr/). As it turns out, we can stash data on HTML
elements by creating as many attributes as we need!
This is valid HTML: <div my-made-up-attribute='information-stored-in-string'></div>
And it allows us to retrieve "information-stored-in-string" by querying
"my-made-up-attribute"

Task 5: Store multiple shapes -done (I think)

Instead of showing one shape at a time, let's allow multiple shapes to be drawn.
Instead of storing one Leaflet layer in the myRectangle variable, we should use
an array to store multiple layers. There will also be multiple shapes displayed
in the sidebar.

Change the variable myRectangle to myRectangles and set it to equal an empty
array. Change the rest of your code to push new layers into the array.

Task 6: Connect sidebar and map

The HTML in the sidebar and the Leaflet layers on the map and in our Javascript
variable can be linked by using the Leaflet ID. Modify the application so that
clicking on a shape in the sidebar will do one of the following:

- Change the color of the corresponding shape on the map
- Delete the corresponding shape on the map (be sure to remove it from the
sidebar and the myRectanges array)
- Anything else you can think of!

Task 7 (Stretch Goal): Reverse Task 6

Modify the application so moving your mouse over a rectangle on the map will
highlight (change style in some way) the corresponding element in the sidebar.
Moving your mouse outside of the circle should remove the highlighting.

===================== */
