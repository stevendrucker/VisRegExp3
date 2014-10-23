
var dataList = [];
var connList = [];
var drawingLink = false;
var linkStart = [];
var linkEnd = [];
var startObject = null;
var inObject = null;
var UniqueId = 0;
var globalOrigin = [0, 0];

function init() {
    svg = d3.select("#mainArea").append("svg")
        .attr("width", 800)
        .attr("height", 600)
        .attr("style", "background-color:white")




    svg.on("dblclick", function () { addNode(); })
        .on("mousemove", mousemove)
        .on("mouseup", mouseup);

    drag = d3.behavior.drag()
        .origin(function (d) {
            var t = d3.select(this);
            // this is gross, but don't know better way to get out the translate transform
            s = t.attr("transform");
            news = s.substr(s.indexOf("(") + 1);
            thesplit = news.split(",");
            newx = parseInt(thesplit[0]);
            newy = parseInt(thesplit[1]);
            theObject = t.datum();
            globalOrigin = [newx, newy];
            return ({ "x": newx, "y": newy })
        })
        .on("drag", dragmove)
        .on("dragend", dropHandler);


    svg.append("line")
        .attr("class", "newLink")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "blue")
        .attr("stroke-width", 10);

}


function queryServer() {
    var service = new QueryWebApi("http://localhost:60064");

    service.postLog(
        new DatasetConfiguration("Sanddance", "d", "", 200, 10000, "", "MM/dd/yyyy HH:mm:ss"),
            function (logid) {
                var e = new EventExpression(0, true, Quantifier.One, false, []);
                service.postQuery(new LogQuery(logid, e),
                    function (queryId) {
                        service.getPropertyHistogram(logid, e.ID, function (histo) {
                            debugger;
                        });
                    });
            });
}

var lineFunction = d3.svg.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .interpolate("basis");

function dragmove(d) {
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select(this)
        .attr("transform", "translate(" + x + "," + y + ")")

    node = d3.select(this).datum();
    node.x = x;
    node.y = y;
    outConnections = node.outConnections;
    theLinks = svg.selectAll(".startlinks_" + node.uid)
        .data(outConnections);

    theLinks
        .attr("d", function (d) {
            var theLineObjects = [{ x: d.start.x, y: d.start.y },
                                 { x: d.start.x + 100, y: d.start.y },
                                 { x: d.end.x - 100, y: d.end.y },
                                 { x: d.end.x, y: d.end.y }];
            return (lineFunction(theLineObjects));

        })
    inConnections = node.inConnections;
    theLinks = svg.selectAll(".endlinks_" + node.uid)
            .data(inConnections);
    theLinks
        .attr("d", function (d) {
            var theLineObjects = [{ x: d.start.x, y: d.start.y },
                                 { x: d.start.x + 100, y: d.start.y },
                                 { x: d.end.x - 100, y: d.end.y },
                                 { x: d.end.x, y: d.end.y }];
            return (lineFunction(theLineObjects));

        })
}

function mousemove() {
    if (drawingLink) {
        p = d3.mouse(svg.node());
        d3.selectAll(".newLink")
            .attr("style", "visibility:visible")
            .attr("x1", linkStart[0])
            .attr("y1", linkStart[1])
            .attr("x2", p[0])
            .attr("y2", p[1]);
    }
}

function mouseup() {
    if (drawingLink) {
        p = d3.mouse(svg.node());
        d3.selectAll(".newLink")
            .attr("style", "visibility:hidden")
        drawingLink = false;
        if (inObject != null) {
            // we dropped the link on top of another object
            a = d3.select(inObject.parentElement);
            endObject = a.datum();
            aLink = new VR_connection(startObject, endObject);
            aLink.addToScene();
            endObject.inConnections.push(aLink);
            startObject.outConnections.push(aLink);
        }
    }
}

function dropHandler(d) {
    t = d3.select(this);
    node = t.datum();
    s = t.attr("transform");
    news = s.substr(s.indexOf("(") + 1);
    thesplit = news.split(",");
    newx = parseInt(thesplit[0]);
    newy = parseInt(thesplit[1]);       
    node.x = newx;
    node.y = newy;
}

VR_node = function (name, stype, x, y) {
    this.uid = UniqueId++;
    this.text = name;
    this.stype = stype;
    this.x = x;
    this.y = y;
    this.outConnections = [];
    this.inConnections = [];
    myObj = this;
    this.addToScene = function () {
        theElem = svg.append("g")
            .attr("transform", "translate(" + this.x + "," + this.y + ")")
            .attr("class", "nodeClass node_" + this.uid)
            .datum(this)
            .call(drag);

        // link circle
        theElem.append("circle")
               .attr("r", 10)
               .attr("cx", 100)
               .attr("cy", 0)
               .attr("fill", "lightgray")
               .on("mousedown", function () {
                   d3.event.stopPropagation();
                   drawingLink = true;
                   linkStart = d3.mouse(svg.node());
                   linkEnd = d3.mouse(svg.node());
                   a = d3.select(this.parentElement);
                   startObject = a.datum();
               });

        // body rect
        theRect = theElem.append("rect")
          .attr("rx", 10)
          .attr("ry", 80)
          .attr("x", -100)
          .attr("y", -50)
          .attr("width", 200)
          .attr("height", 100)
          .on("mouseover", function () {
              inObject = this;
          })
          .on("mouseout", function () {
              inObject = null;
          })
          .on("click", function () {
              if (d3.event.shiftKey) {
                  theNode = d3.select(this.parentElement).datum();
                  deleteNode(theNode);

              }
          });

        // node name
        theElem.append("text")
          .attr("x", -90)
          .attr("y", -30)
          .text(this.text);

        //expander
        theElem.append("circle")
          .attr("cx", 85)
          .attr("cy", 40)
          .attr("r", 5)
          .attr("fill", "white")
          .attr("class", "expander")
         .on("mousedown", function () {             
             theParent = d3.select(d3.event.target.parentElement);
             newRect = theParent.select("rect");
             newIcon = theParent.select(".expander");
             // need to fix this to refer back to the node rather than the graphical representation of the node
             if (this.stype == "expanded") {
                 this.stype = "compact";
                 newRect.transition()
                     .duration(500)
                     .attr("width", 200)
                     .attr("height", 100)
                 newIcon.transition()
                      .duration(500)
                      .attr("cx", 85)
                      .attr("cy", 40)
              
             } else {
                 this.stype = "expanded";
                 newRect.transition()
                     .duration(500)
                     .attr("width", 600)
                     .attr("height", 400)
                 newIcon.transition()
                      .duration(500)
                      .attr("cx", 485)
                      .attr("cy", 340)
               
             }
         });



    }
}


function deleteNode(theNode) {
    which = dataList.indexOf(theNode);
    dataList.splice(which, 1);
    // now delete the start and end links
    theLinks = svg.selectAll(".startlinks_" + theNode.uid);
    theLinks.remove();

    theLinks = svg.selectAll(".endlinks_" + theNode.uid);
    theLinks.remove();

    theNode.inConnections.forEach(function (alink) {
        otherObject = alink.start;
        which = otherObject.outConnections.indexOf(alink)
        otherObject.outConnections.splice(which, 1);
    });

    theNode.outConnections.forEach(function (alink) {
        otherObject = alink.end;
        which = otherObject.inConnections.indexOf(alink)
        otherObject.inConnections.splice(which, 1);
    });

    svg.selectAll(".node_" + theNode.uid).remove();
}

VR_connection = function (startObject, endObject) {
    this.start = startObject;
    this.end = endObject;

    // links will be created from the startingObject
    this.addToScene = function () {
        theLinkObj = this;
        var theLineObjects = [{ x: startObject.x, y: startObject.y },
                { x: startObject.x + 100, y: startObject.y },
                { x: endObject.x - 100, y: endObject.y },
                { x: endObject.x, y: endObject.y }];

        theLinks = svg
                .insert("path", ".newLink")
//                .append("path")
                .attr("d", lineFunction(theLineObjects))
                .attr("class", function (d) { return ("startlinks_" + theLinkObj.start.uid + " endlinks_" + theLinkObj.end.uid) })
                .attr("stroke", "blue")
                .attr("stroke-width", 15)
                .attr("fill", "none");
    }
}



function addNode() {
    p = d3.mouse(svg.node());

    newnode = new VR_node("newnode", "compact", p[0], p[1], []);
    dataList.push(newnode);
    newnode.addToScene();
}