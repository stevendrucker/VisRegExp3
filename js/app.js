var app = angular.module('MyAngularApp', ['ui.bootstrap']);

app.directive('node', function ($timeout) {

    return {
        restrict: 'AEC',
   		scope: {
            obj: '=',         
        },
        link: function (scope, lElement, lAttr) {
          var path = makeNode('g', lElement, lAttr);
          var newGuy = path.cloneNode(true);
	      $timeout(function() {
	          lElement.replaceWith(newGuy);	 
	          var theElem = d3.select(newGuy);
	          theElem.append("circle")
                  .attr("r", 10)
                  .attr("cx", 100)
                  .attr("cy", 0)
                  .attr("fill", "lightgray")
                  .on("mousedown", function() {
                 		var p = [0,0];
                 		p = d3.mouse(document.getElementById("mysvg"));
                 		// scope.$parent.$parent.$parent.lineDraw = true;                 		
                      // scope.$parent.$parent.$parent.mouseDownObject = scope.obj;
                 		scope.$parent.$parent.lineDraw = true;
                        scope.$parent.$parent.mouseDownObject = scope.obj;
                 		newx=p[0]
                 		newy=p[1];
//                 		newx = $event.pageX - $event.currentTarget.offsetLeft;
//                 		newy = $event.pageY - $event.currentTarget.offsetTop;
                 		scope.$parent.curPath.x1=newx;
                 		scope.$parent.curPath.y1=newy;
                 		scope.$parent.curPath.x2=newx;
                 		scope.$parent.curPath.y2=newy;
                	});
	          theRect = theElem.append("rect")
                .attr("rx", 10)
                .attr("ry", 80)
                .attr("x", -100)
                .attr("y", -50)
                .attr("width", 200)
                .attr("height", 100);
              theElem.append("text")
              	.attr("x",-90)
              	.attr("y",-30)
              	.text(scope.obj.text)
              theElem.append("circle")
                .attr("cx", 85)
                .attr("cy", 40)
                .attr("r", 5)
                .attr("fill", "white")
                .attr("class", "expander")
               .on("mousedown", function () {
                   // this is gross, but need a better way of finding the enclosing rect
                   theParent = d3.select(d3.event.target.parentElement);
                   newRect = theParent.select("rect");
                   newIcon = theParent.select(".expander");
                   if (scope.obj.stype == "compact") {
                       scope.obj.stype = "expanded";
                       newRect.transition()
                           .duration(500)
                           .attr("width", 600)
                           .attr("height", 400)
                       newIcon.transition()
                            .duration(500)
                            .attr("cx", 485)
                            .attr("cy",340)                            
                   } else {
                       scope.obj.stype = "compact";
                       newRect.transition()
                           .duration(500)
                           .attr("width", 200)
                           .attr("height", 100)
                       newIcon.transition()
                            .duration(500)
                            .attr("cx", 85)
                            .attr("cy", 40)
                   }
               });

	      })
	      //console.log('Replacing ', lElement, ' with ', newGuy);
	    } 
	}} ) ;



var lineFunction = d3.svg.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .interpolate("basis");

app.directive('nodeconnection', function ($timeout) {

    return {
        restrict: 'AEC',
        scope: {
            theconn: '=',         
        },
        link: function (scope, lElement, lAttr) {
            
            var theObject = scope.theconn;
            
            var theLineObjects = [{ x:theObject.start.x, y: theObject.start.y },
                { x: theObject.start.x + 100, y: theObject.start.y },
                { x: theObject.end.x - 100, y: theObject.end.y },
                { x: theObject.end.x, y: theObject.end.y } ];
            var path = makeNode('path', lElement, lAttr);
            var d3path = d3.select(path);
            d3path.attr("d", lineFunction(theLineObjects))
                .attr("stroke", "blue")
                .attr("stroke-width", 15)
                .attr("fill", "none");
            var newGuy = path.cloneNode(true);
            scope.thePath = newGuy;
            $timeout(function () {
                lElement.replaceWith(newGuy);                
            })
            scope.$watchGroup(
            	[function() {
            		return(theObject.end.x)
            	},
            	function() {
            		return(theObject.end.y)
            	},
            	function() {
            		return(theObject.start.x)
            	},
				function() {
            		return(theObject.start.y)
            	}]
            	, function () {
				var theObject = scope.theconn;
				var theLineObjects = [{ x:theObject.start.x, y: theObject.start.y },
                	{ x: theObject.start.x + 100, y: theObject.start.y },
                	{ x: theObject.end.x - 100, y: theObject.end.y },
                	{ x: theObject.end.x, y: theObject.end.y } ];
            	var path = makeNode('path', lElement, lAttr);
            	var d3path = d3.select(scope.thePath);
	            d3path.attr("d", lineFunction(theLineObjects))
	                .attr("stroke", "blue")
	                .attr("stroke-width", 15)
	                .attr("fill", "none");			
        	})
        }
    }
});

/* Create a shape node with the given settings. */
function makeNode(name, element, settings) {
  var ns = 'http://www.w3.org/2000/svg';
  var node = document.createElementNS(ns, name);
  for (var attribute in settings) {
    var value = settings[attribute];
    if (value !== null && value !== null && !attribute.match(/\$/) &&
      (typeof value !== 'string' || value !== '')) {
      node.setAttribute(attribute, value);
    }
  }
  return node;
}


