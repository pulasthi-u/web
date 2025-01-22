class SVGElement {
    htmlElement;

    constructor(name) {
        this.htmlElement = document.createElementNS("http://www.w3.org/2000/svg", name);
    }

    setProperties(properties) {
        for (var property in properties) {
            this.htmlElement.setAttribute(property, properties[property]);
        }
    }

    setProperty(property, value) {
        this.htmlElement.setAttribute(property, value);
    }
}

class SVGLine extends SVGElement {
    constructor(x1, y1, x2, y2) {
        var lineElement = super("line");

        lineElement.setProperties({
            "x1" : x1,
            "y1" : y1,
            "x2" : x2,
            "y2" : y2,
            "stroke" : "black",
            "stroke-width" : 1,
        });

        return lineElement;
    }
}

class SVGText extends SVGElement {
    constructor(text, x, y, anchor) {
        // look at text wrapping. needs to be set with css.
        var textElement = super("text");

        textElement.setProperties({
            "x" : x,
            "y" : y,
            "text-anchor" : anchor,
            "font-family" : "Arial",
            "font-size" : 12,
        });

        textElement.htmlElement.innerHTML = text;

        return textElement;
    }
}

class SVGPath extends SVGElement {
    constructor(pathString) {
        var pathElement = super("path");

        pathElement.setProperties({
            "d" : pathString,
            "stroke" : "black",
            "stroke-width" : 1,
            "fill" : "transparent",
        });
        
        return pathElement;
    }
}

class SVGStage {
    htmlElement

    width;
    height;

    constructor(parentElement) {        
        this.width = parentElement.clientWidth;
        this.height = parentElement.clientHeight;

        var htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        htmlElement.setAttribute("width", this.width);
        htmlElement.setAttribute("height", this.height);
        htmlElement.setAttribute("preserveAspectRatio", "none");
        htmlElement.setAttribute("viewBox", "0 0 " + this.width + " " + this.height);

        this.htmlElement = htmlElement;

        parentElement.appendChild(htmlElement);
    }

    addElement(element) {
        this.htmlElement.appendChild(element.htmlElement);
    }
}

class Plot extends SVGStage {
    #dx;
    #dy;
    #originX;
    #originY;
    #leftmostX;
    #rightmostX;
    #bottommostY;
    #topmostY;

    constructor(parentElement, leftmostX, rightmostX, bottommostY, topmostY) {
        super(parentElement);

        this.#leftmostX = leftmostX;
        this.#rightmostX = rightmostX;
        this.#bottommostY = bottommostY;
        this.#topmostY = topmostY;

        this.#dx = this.width / (rightmostX - leftmostX);
        this.#dy = this.height / (topmostY - bottommostY);

        this.#originX = -this.#dx * leftmostX;
        this.#originY = this.#dy * topmostY;
    }

    getSVGCoords(x, y) {
        var svgX = (x * this.#dx) + this.#originX;
        var svgY = this.#originY - (y * this.#dy);
        return {
            "x" : svgX,
            "y" : svgY
        };
    }

    drawGridlines(xIncrement = 1, yIncrement = 1, properties = {}, properties2 = {}) {
        if (xIncrement > 0) {
            for (var x = this.#leftmostX; x <= this.#rightmostX; x += xIncrement) {
                var startPoint = this.getSVGCoords(x, this.#bottommostY);
                var endPoint = this.getSVGCoords(x, this.#topmostY);

                var line = new SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
                line.setProperty("stroke", "lightgray");
                this.addElement(line);
            }
        }

        if (yIncrement > 0) {
            for (var y = this.#bottommostY; y <= this.#topmostY; y += yIncrement) {
                var startPoint = this.getSVGCoords(this.#leftmostX, y);
                var endPoint = this.getSVGCoords(this.#rightmostX, y);
            
                var line = new SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
                line.setProperty("stroke", "lightgray");
                this.addElement(line);
            }
        }
    }

    drawCoordinateAxes(xAxis = true, yAxis = true) {
        if (xAxis) {
            var startPoint = this.getSVGCoords(this.#leftmostX, 0);
            var endPoint = this.getSVGCoords(this.#rightmostX, 0);
            
            var xaxis = new SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            this.addElement(xaxis);

            var farRight = this.getSVGCoords(this.#rightmostX, 0);
            var arrowPathString = "M " + farRight.x + " " + farRight.y + " m -7 -2 l 7 2 l -7 2";
            var rightArrow = new SVGPath(arrowPathString);
            this.addElement(rightArrow);

            var labelPos = this.getSVGCoords(this.#rightmostX, 0);
            var xlabel = new SVGText("x", labelPos.x - 5, labelPos.y + 12, "end");
            xlabel.setProperty("font-family", "MJXTEX-I");
            this.addElement(xlabel);
        }

        if (yAxis) {
            var startPoint = this.getSVGCoords(0, this.#bottommostY);
            var endPoint = this.getSVGCoords(0, this.#topmostY);
            
            var yaxis = new SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            this.addElement(yaxis);

            var farTop = this.getSVGCoords(0, this.#topmostY);
            var arrowPathString = "M " + farTop.x + " " + farTop.y + " m -2 7 l 2 -7 l 2 7";
            var topArrow = new SVGPath(arrowPathString);
            this.addElement(topArrow);

            var labelPos = this.getSVGCoords(0, this.#topmostY);
            var ylabel = new SVGText("y", labelPos.x - 5, labelPos.y + 12, "end");
            ylabel.setProperty("font-family", "MJXTEX-I");
            this.addElement(ylabel);
        }
    }

    displayNumbers(xIncrement = 1, yIncrement = 1) {
        if (xIncrement > 0) {
            for (var x = this.#leftmostX; x < this.#rightmostX; x += xIncrement) {
                var numberPos = this.getSVGCoords(x, 0);

                var number = new SVGText(x, numberPos.x - 5, numberPos.y + 12, "end");
                number.setProperty("font-family", "MJXTEX");
                this.addElement(number);
            }
        }

        if (yIncrement > 0) {
            for (var y = this.#bottommostY; y < this.#topmostY; y += yIncrement) {
                var numberPos = this.getSVGCoords(0, y);

                var number = new SVGText(y, numberPos.x - 5, numberPos.y + 12, "end");
                number.setProperty("font-family", "MJXTEX");
                this.addElement(number);
            }
        }
    }

    drawLine(x1, y1, x2, y2) {
        var lineElement = new SVGLine(x1, y1, x2, y2);
        this.addElement(lineElement);
        
        return lineElement;
    }

    addText(text, x, y, anchor) {
        var textElement = new SVGText(text, x, y, anchor);
        this.addElement(textElement);
        
        return textElement;
    }

    drawPath(pathString) {
        var pathElement = new SVGPath(pathString);
        this.addElement(pathElement);

        return pathElement;
    }

    drawCurve(x, y, startT, endT, numPts) {
        var tIncrement = (endT - startT) / numPts;

        var point = this.getSVGCoords(x(startT), y(startT));
        var pathString = "M " + point.x + " " + point.y + " ";

        for (var t = startT + tIncrement; t <= endT; t += tIncrement) {
            point = this.getSVGCoords(x(t), y(t));
            pathString += "L " + point.x + " " + point.y + " ";
        }

        var curveElement = new SVGPath(pathString);
        this.addElement(curveElement);

        return curveElement;
    }
}

function I(x) {
    return x;
}