(function () {
  this.Figure = this.Actor.create();
  this.Figure.initialize = dtlbind(this, function (parent) {
    if (parent) {
      this.element = parent.lineG;

      // Get the actual position of the first line drawn for this figure
      var figureId = parent.lineG.attr("id");
      var linesForThisFigure = parent.svg_g.find(
        "line[data-figure-id='" + figureId + "']",
      );
      var initialX = 0,
        initialY = 0;

      if (linesForThisFigure.length > 0) {
        // Use the first line's start position as the figure's initial position
        var firstLine = linesForThisFigure.first();
        initialX = parseFloat(firstLine.attr("x1") || 0);
        initialY = parseFloat(firstLine.attr("y1") || 0);
      } else {
        // Fallback: use turtle's current position as figure position
        if (parent.pos && parent.pos.x !== undefined) {
          initialX = parent.pos.x;
          initialY = parent.pos.y;
        }
      }

      // Set the figure's position to the first line's start position
      this.pos = parent.Vec2.create(initialX, initialY);
      this._lineStartOffsetX = 0;
      this._lineStartOffsetY = 0;

      this.dir = 0;
      // Store parent's line color for use in paint method when no color specified
      this._parentLineColor = parent._lineCol;

      // Move lines from svg_g to this figure element before removing from parent
      var figureId = this.element.attr("id");
      if (figureId) {
        var self = this;
        var figureX = initialX;
        var figureY = initialY;
        this.svg_g.find("line[data-figure-id='" + figureId + "']").each(function () {
          var line = self.$.create(this);
          // Convert absolute coordinates to relative coordinates
          var x1 = parseFloat(line.attr("x1")) - figureX;
          var y1 = parseFloat(line.attr("y1")) - figureY;
          var x2 = parseFloat(line.attr("x2")) - figureX;
          var y2 = parseFloat(line.attr("y2")) - figureY;

          // Update line coordinates to be relative to figure origin
          line.attr("x1", x1);
          line.attr("y1", y1);
          line.attr("x2", x2);
          line.attr("y2", y2);

          // Move the line to figure element
          self.element.append(this);
        });
      }

      // Remove from parent turtle but keep in svg_g as independent figure
      this.element.remove();
      // Set the transform to position the figure at its initial location
      this.element.attr("transform", "translate(" + initialX + " " + initialY + ")");
      // Re-add to svg_g as independent figure object
      this.svg_g.append(this.element);
      // Store reference to this figure object in the DOM element for collision detection
      this.element.data("figureInstance", this);
      this.setLocalShapeAsLines();
    } else {
      // Create new g element for figure duplication
      this.element = this.createSVGElem("g");
      // For figure duplication, clone from prototype if it exists
      if (this.__proto__ && this.__proto__.element) {
        // Use jQuery's clone method for proper deep cloning
        var protoElement = this.__proto__.element;
        var clonedElement = protoElement.clone(true, true); // clone with data and events
        // Replace our element with the cloned one
        this.element.remove(); // remove the empty element we created
        this.element = clonedElement;
        // Generate a unique ID for the cloned element
        var uniqueId = "figure_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        this.element.attr("id", uniqueId);
        // Append to svg_g
        this.svg_g.append(this.element);
        // Copy position and direction from prototype
        this.pos = this.__proto__.pos
          ? this.Vec2.create(this.__proto__.pos.x, this.__proto__.pos.y)
          : this.Vec2.create(0, 0);
        this.dir = this.__proto__.dir || 0;
        // Copy parent line color from prototype
        this._parentLineColor = this.__proto__._parentLineColor || "black";
      }
      // Initialize position and direction if not set yet
      if (!this.pos) {
        this.pos = this.Vec2.create(0, 0);
      } else {
      }
      if (this.dir === undefined) {
        this.dir = 0;
      }
      this.polygonElem = this.undef;
      this.findPolygonElem();
    }
    this.isShowing = this.false;
    // Store reference to this figure object in the DOM element for collision detection
    this.element.data("figureInstance", this);
    return this.appear();
  });
  this.Figure.findPolygonElem = dtlbind(this, function () {
    var p;
    p = this.element.find("polygon");
    if (p.length > 0) {
      this.polygonElem = p;
    }
    return;
  });
  this.Figure.setLocalShapeAsPolygon = dtlbind(this, function () {
    var t;
    var j;
    var lx;
    var ly;
    var ls;
    t = this;
    // Find lines in svg_g using data-figure-id attribute, or within this figure element
    var figureId = this.element.attr("id") || "default";
    ls = this.svg_g.find("line[data-figure-id='" + figureId + "']");

    // If no lines found in svg_g, look within this figure's element (lines already moved)
    var linesInFigure = false;
    if (ls.length === 0) {
      ls = this.element.find("line");
      linesInFigure = true;
    }

    this.localShape = this.Polygon.create();
    var lastLine = null;
    ls.each(
      dtlbind(this, function () {
        j = t.$.create(this);
        lastLine = j; // Store reference to last line

        if (linesInFigure) {
          // Lines are already in figure element with relative coordinates - use as is
          lx = parseFloat(j.attr("x1"));
          ly = parseFloat(j.attr("y1"));
        } else {
          // Lines are in svg_g with absolute coordinates - convert to relative
          var lineOrigX = 0,
            lineOrigY = 0;
          if (this.pos && this.pos.x !== undefined) {
            lineOrigX = this.pos.x;
            lineOrigY = this.pos.y;
          }
          lx = parseFloat(j.attr("x1")) - lineOrigX;
          ly = parseFloat(j.attr("y1")) - lineOrigY;
        }
        return t.localShape.addVertex(lx, ly);
      }),
    );
    // Convert last point coordinates to relative using stored reference
    if (lastLine) {
      if (linesInFigure) {
        // Lines are already in figure element with relative coordinates - use as is
        lx = parseFloat(lastLine.attr("x2"));
        ly = parseFloat(lastLine.attr("y2"));
      } else {
        // Lines are in svg_g with absolute coordinates - convert to relative
        var lineOrigX = 0,
          lineOrigY = 0;
        if (this.pos && this.pos.x !== undefined) {
          lineOrigX = this.pos.x;
          lineOrigY = this.pos.y;
        }
        lx = parseFloat(lastLine.attr("x2")) - lineOrigX;
        ly = parseFloat(lastLine.attr("y2")) - lineOrigY;
      }
      return this.localShape.addVertex(lx, ly);
    }
  });
  this.Figure.setLocalShapeAsLines = dtlbind(this, function () {
    var t;
    var j;
    var x1;
    var y1;
    var x2;
    var y2;
    var p1;
    var p2;
    var w;
    t = this;
    this.localShape = this.ShapeGroup.create();
    // Find lines in svg_g using data-figure-id attribute
    var figureId = this.element.attr("id") || "default";
    this.svg_g.find("line[data-figure-id='" + figureId + "']").each(
      dtlbind(this, function () {
        j = t.$.create(this);
        x1 = j.attr("x1");
        x1 = x1 - 0;
        y1 = j.attr("y1");
        y1 = y1 - 0;
        p1 = t.Vec2.create(x1, y1);
        x2 = j.attr("x2");
        x2 = x2 - 0;
        y2 = j.attr("y2");
        y2 = y2 - 0;
        p2 = t.Vec2.create(x2, y2);
        w = j.attr("data-width");
        w = w - 0;
        return t.localShape.add(t.Polygon.fromLine(p1, p2, w));
      }),
    );
    return this.localShape;
  });
  this.Figure.getLocalShape = dtlbind(this, function () {
    return this.localShape;
  });
  this.Figure.getCrashShape = dtlbind(this, function () {
    return this.getLocalShape().transform(this.dir, this.pos);
  });
  this.Figure.convertLinesToPolygon = dtlbind(this, function (lines) {
    var segments = [];
    var currentSegment = [];
    var i;
    var line;
    var x1, y1, x2, y2;
    var prevX2, prevY2;
    var roundedX1, roundedY1, roundedX2, roundedY2;
    var roundedPrevX2, roundedPrevY2;
    for (i = 0; i < lines.length; i++) {
      line = $(lines[i]);
      x1 = parseFloat(line.attr("x1"));
      y1 = parseFloat(line.attr("y1"));
      x2 = parseFloat(line.attr("x2"));
      y2 = parseFloat(line.attr("y2"));
      // Round to nearest integer for pixel coordinates
      roundedX1 = Math.round(x1);
      roundedY1 = Math.round(y1);
      roundedX2 = Math.round(x2);
      roundedY2 = Math.round(y2);
      if (i === 0) {
        // Start first segment
        currentSegment.push(roundedX1);
        currentSegment.push(roundedY1);
        currentSegment.push(roundedX2);
        currentSegment.push(roundedY2);
      } else {
        // Check if this line connects to the previous line
        roundedPrevX2 = Math.round(prevX2);
        roundedPrevY2 = Math.round(prevY2);
        if (roundedX1 === roundedPrevX2 && roundedY1 === roundedPrevY2) {
          // Continuous - add to current segment
          currentSegment.push(roundedX2);
          currentSegment.push(roundedY2);
        } else {
          // Gap detected - save current segment and start new one
          if (currentSegment.length >= 6) {
            // At least 3 points
            segments.push(currentSegment.slice());
          }
          currentSegment = [roundedX1, roundedY1, roundedX2, roundedY2];
        }
      }
      prevX2 = x2;
      prevY2 = y2;
    }
    // Save the last segment
    if (currentSegment.length >= 6) {
      segments.push(currentSegment.slice());
    }
    return segments;
  });
  this.Figure.isPathClosed = dtlbind(this, function (segments) {
    var i;
    var points;
    var len;
    var firstX, firstY, lastX, lastY;
    var isClosed;
    if (!segments || segments === null || segments.length === 0) {
      return this.false;
    }
    // Check each segment for closure
    for (i = 0; i < segments.length; i++) {
      points = segments[i];
      len = points.length;
      if (len < 6) {
        continue;
      }
      firstX = points[0];
      firstY = points[1];
      lastX = points[len - 2];
      lastY = points[len - 1];
      isClosed = firstX === lastX && firstY === lastY;
      if (isClosed) {
        return this.true;
      }
    }
    return this.false;
  });
  this.Figure.paint = dtlbind(this, function (col) {
    // If no color argument provided, use the parent's line color
    if (arguments.length === 0 || col === undefined || col === null) {
      col = this._parentLineColor || "black";
    }
    var buf;
    var ls;
    var points;
    buf = "";
    // Find lines in svg_g using data-figure-id attribute, or within this figure element if it's a clone
    var figureId = this.element.attr("id") || "default";
    ls = this.svg_g.find("line[data-figure-id='" + figureId + "']");

    // If no lines found in svg_g (likely a cloned figure), look within this figure's element
    if (ls.length === 0) {
      ls = this.element.find("line");
    }
    if (ls.length >= 2) {
      var segments = this.convertLinesToPolygon(ls);
      var isClosedResult = this.isPathClosed(segments);
      var i;
      // Handle both closed and open paths for polygon creation
      // Process ALL segments, not just one
      var polygonCount = 0;

      // Process each segment independently
      for (i = 0; i < segments.length; i++) {
        points = segments[i];
        // Skip segments that are too small to form a polygon
        if (points.length < 6) {
          // Less than 3 points
          continue;
        }

        // Check if this segment is closed
        var firstX = points[0],
          firstY = points[1];
        var lastX = points[points.length - 2],
          lastY = points[points.length - 1];
        var isClosed = firstX === lastX && firstY === lastY;

        // Prepare segment for polygon creation
        var segmentToUse;
        if (isClosed) {
          // Already closed - use as is
          segmentToUse = points;
        } else {
          // Open segment - close it automatically (Dolittle behavior)
          segmentToUse = points.slice(); // Copy the array
          // Add closing line back to start
          segmentToUse.push(firstX);
          segmentToUse.push(firstY);
        }

        // Create polygon if we have enough points (at least 3 points forming 2 lines)
        if (segmentToUse.length >= 8) {
          // At least 4 coordinates (2 lines = 3 points)
          // Use the coordinates directly without conversion
          // Since lineG has transform="translate(0 0)", use absolute coordinates
          buf = "";
          for (var j = 0; j < segmentToUse.length; j += 2) {
            var x = segmentToUse[j];
            var y = segmentToUse[j + 1];
            buf += x + "," + y + " ";
          }

          // Create a polygon for this segment
          // Use unique class or id to identify multiple polygons if needed
          var polygon = this.createSVGElem("polygon")
            .attr("points", buf.trim())
            .attr("fill", col)
            .attr("fill-rule", "nonzero")
            .appendTo(this.element);

          // Store reference to polygons (for potential future use)
          if (polygonCount === 0) {
            this.polygonElem = polygon; // Keep first polygon reference for compatibility
          }
          polygonCount++;
        }
      }
    }
    // Check if lines are within figure element (cloned figure) or in svg_g (original figure)
    var linesInSvgG =
      this.svg_g.find("line[data-figure-id='" + figureId + "']").length > 0;

    if (linesInSvgG) {
      // Original figure: just change line colors since the figure element IS the lineG
      var t = this;
      ls.each(
        dtlbind(this, function () {
          var line = t.$.create(this);
          var width = line.attr("data-width") || "1";
          line.attr("style", "stroke:" + col + ";stroke-width:" + width);
        }),
      );
    } else {
      // Cloned figure: directly change colors of lines within figure element
      var t = this; // Store reference to outer 'this'
      ls.each(
        dtlbind(this, function () {
          var line = t.$.create(this); // Use stored reference 't'
          var width = line.attr("data-width") || line.attr("stroke-width") || "1";
          line.attr("style", "stroke:" + col + ";stroke-width:" + width);
        }),
      );
      // Also change polygon fill color if it exists
      var polygons = this.element.find("polygon");
      if (polygons.length > 0) {
        polygons.attr("fill", col);
      }
    }
    return this;
  });
  this.Figure.getFigureLines = dtlbind(this, function () {
    // 図形の線分を取得（回転を考慮）
    var lines = [];
    var figureElement = this.element;

    if (figureElement) {
      var transform = figureElement.attr("transform") || "translate(0 0)";
      var translateX = 0,
        translateY = 0,
        rotateAngle = 0;

      // Extract translate
      var matchTranslate = transform.match(
        /translate\(([^,]+),([^)]+)\)|translate\(([^ ]+) ([^)]+)\)/,
      );
      if (matchTranslate) {
        if (matchTranslate[1] && matchTranslate[2]) {
          translateX = parseFloat(matchTranslate[1]);
          translateY = parseFloat(matchTranslate[2]);
        } else if (matchTranslate[3] && matchTranslate[4]) {
          translateX = parseFloat(matchTranslate[3]);
          translateY = parseFloat(matchTranslate[4]);
        }
      }

      // Extract rotate
      var matchRotate = transform.match(/rotate\(([^)]+)\)/);
      if (matchRotate) {
        rotateAngle = parseFloat(matchRotate[1]);
      }

      // Convert angle to radians
      var angleRad = (rotateAngle * Math.PI) / 180;
      var cos = Math.cos(angleRad);
      var sin = Math.sin(angleRad);

      figureElement.find("line").each(
        dtlbind(this, function (i, line) {
          var $line = $(line);
          var x1 = parseFloat($line.attr("x1"));
          var y1 = parseFloat($line.attr("y1"));
          var x2 = parseFloat($line.attr("x2"));
          var y2 = parseFloat($line.attr("y2"));

          // Apply rotation to relative coordinates
          var x1Rotated = x1 * cos - y1 * sin;
          var y1Rotated = x1 * sin + y1 * cos;
          var x2Rotated = x2 * cos - y2 * sin;
          var y2Rotated = x2 * sin + y2 * cos;

          // Apply translation
          lines.push({
            x1: x1Rotated + translateX,
            y1: y1Rotated + translateY,
            x2: x2Rotated + translateX,
            y2: y2Rotated + translateY,
            element: $line,
          });
        }),
      );
    }

    return lines;
  });

  // 指定位置に図形を配置した時の線分座標を取得（回転を考慮）
  this.Figure.getMyLinesAt = dtlbind(this, function (pos) {
    // newPosに図形を配置した時の各線分の絶対座標を計算
    var lines = [];
    var figureElement = this.element;

    if (figureElement) {
      // Get rotation angle from this['dir']
      var rotateAngle = this.dir || 0;
      var angleRad = (rotateAngle * Math.PI) / 180;
      var cos = Math.cos(angleRad);
      var sin = Math.sin(angleRad);

      // element内の各線分を取得（相対座標）
      figureElement.find("line").each(
        dtlbind(this, function (i, line) {
          var $line = $(line);
          var x1 = parseFloat($line.attr("x1"));
          var y1 = parseFloat($line.attr("y1"));
          var x2 = parseFloat($line.attr("x2"));
          var y2 = parseFloat($line.attr("y2"));

          // Apply rotation to relative coordinates
          var x1Rotated = x1 * cos - y1 * sin;
          var y1Rotated = x1 * sin + y1 * cos;
          var x2Rotated = x2 * cos - y2 * sin;
          var y2Rotated = x2 * sin + y2 * cos;

          // posを基準とした絶対座標に変換
          lines.push({
            x1: x1Rotated + pos.x,
            y1: y1Rotated + pos.y,
            x2: x2Rotated + pos.x,
            y2: y2Rotated + pos.y,
          });
        }),
      );
    }

    return lines;
  });

  this.Figure.checkCollisionAndBounce = dtlbind(this, function (oldPos, newPos) {
    // 衝突処理中の場合は衝突検出をスキップ（Step 2で相手を移動させる場合）
    if (this._collisionExecuting) {
      return newPos;
    }

    // Check if this object has a valid collision handler
    var thisHasCollision = false;
    var isEmptyFunction =
      typeof this.collision === "function" &&
      this.collision.toString().indexOf("return }") > -1 &&
      this.collision.toString().indexOf("return;}") === -1;

    if (
      this.collision &&
      this.collision !== this.undef &&
      (typeof this.collision === "function" || this.collision === this.true) &&
      !isEmptyFunction
    ) {
      thisHasCollision = true;
    }

    // Note: We don't skip collision detection even if this object has no collision handler,
    // because the other object might have a collision handler that needs to be executed.
    // We'll check for collision handlers later.

    // newPosでの自分の線分を取得
    var myLinesAtNewPos = this.getMyLinesAt(newPos);
    // console.log('[Figure.checkCollisionAndBounce] newPos:', newPos);
    // console.log('[Figure.checkCollisionAndBounce] myLinesAtNewPos count:', myLinesAtNewPos.length);

    // 他のオブジェクトの線分を取得
    var allOtherLines = [];

    // Get lines from svg_g (turtle lines) - only direct children, not lines inside figure elements
    var svgLines = this.svg_g.children("line");
    // console.log('[Figure.checkCollisionAndBounce] svgLines count:', svgLines.length);
    svgLines.each(
      dtlbind(this, function (i, line) {
        var $line = $(line);
        var lineData = {
          x1: parseFloat($line.attr("x1")),
          y1: parseFloat($line.attr("y1")),
          x2: parseFloat($line.attr("x2")),
          y2: parseFloat($line.attr("y2")),
          element: $line,
        };
        // console.log('[Figure.checkCollisionAndBounce] svgLine[' + i + ']:', lineData);
        allOtherLines.push(lineData);
      }),
    );

    // Get lines from other figures
    var currentFigureId = this.element.attr("id");

    this.svg_g.find('g[id^="lineG_"], g[id^="figure_"]').each(
      dtlbind(this, function (i, figGroup) {
        var $figGroup = $(figGroup);
        var figureId = $figGroup.attr("id");

        // Skip self
        if (figureId === currentFigureId) return;

        var transform = $figGroup.attr("transform");
        var translateX = 0,
          translateY = 0,
          rotateAngle = 0;

        if (transform) {
          // Extract translate
          var matchTranslate = transform.match(
            /translate\(([^,]+),([^)]+)\)|translate\(([^ ]+) ([^)]+)\)/,
          );
          if (matchTranslate) {
            if (matchTranslate[1] && matchTranslate[2]) {
              translateX = parseFloat(matchTranslate[1]);
              translateY = parseFloat(matchTranslate[2]);
            } else if (matchTranslate[3] && matchTranslate[4]) {
              translateX = parseFloat(matchTranslate[3]);
              translateY = parseFloat(matchTranslate[4]);
            }
          }

          // Extract rotate
          var matchRotate = transform.match(/rotate\(([^)]+)\)/);
          if (matchRotate) {
            rotateAngle = parseFloat(matchRotate[1]);
          }
        }

        // Convert angle to radians
        var angleRad = (rotateAngle * Math.PI) / 180;
        var cos = Math.cos(angleRad);
        var sin = Math.sin(angleRad);

        $figGroup.find("line").each(
          dtlbind(this, function (j, line) {
            var $line = $(line);
            var x1 = parseFloat($line.attr("x1"));
            var y1 = parseFloat($line.attr("y1"));
            var x2 = parseFloat($line.attr("x2"));
            var y2 = parseFloat($line.attr("y2"));

            // Apply rotation to relative coordinates
            var x1Rotated = x1 * cos - y1 * sin;
            var y1Rotated = x1 * sin + y1 * cos;
            var x2Rotated = x2 * cos - y2 * sin;
            var y2Rotated = x2 * sin + y2 * cos;

            // Apply translation
            allOtherLines.push({
              x1: x1Rotated + translateX,
              y1: y1Rotated + translateY,
              x2: x2Rotated + translateX,
              y2: y2Rotated + translateY,
              element: $line,
              parentGroup: $figGroup, // Store reference to parent figure group
            });
          }),
        );
      }),
    );

    // Get turtle objects and add their bounding boxes as lines for collision detection
    this.svg_g.find("image[data-trans]").each(
      dtlbind(this, function (i, turtleImg) {
        var $turtle = $(turtleImg);
        var dataTrans = $turtle.attr("data-trans");

        if (dataTrans) {
          // Parse position from data-trans attribute: "x,y,dir"
          var parts = dataTrans.split(",");
          var tx = parseFloat(parts[0]) || 0;
          var ty = parseFloat(parts[1]) || 0;

          // Get turtle size
          var width = parseFloat($turtle.attr("width")) || 32;
          var height = parseFloat($turtle.attr("height")) || 32;

          // Calculate bounding box corners (turtle is centered on position)
          var halfW = width / 2;
          var halfH = height / 2;
          var left = tx - halfW;
          var right = tx + halfW;
          var top = ty - halfH;
          var bottom = ty + halfH;

          // Add four edges of bounding box as lines
          allOtherLines.push({ x1: left, y1: top, x2: right, y2: top, element: $turtle }); // top edge
          allOtherLines.push({ x1: right, y1: top, x2: right, y2: bottom, element: $turtle }); // right edge
          allOtherLines.push({ x1: right, y1: bottom, x2: left, y2: bottom, element: $turtle }); // bottom edge
          allOtherLines.push({ x1: left, y1: bottom, x2: left, y2: top, element: $turtle }); // left edge
        }
      }),
    );

    // newPosでの自分の線分と、他のオブジェクトの線分が交差しているかチェック
    var hasCollision = false;
    var collidingLine = null;

    for (var i = 0; i < myLinesAtNewPos.length; i++) {
      var myLine = myLinesAtNewPos[i];
      var myLineStart = { x: myLine.x1, y: myLine.y1 };
      var myLineEnd = { x: myLine.x2, y: myLine.y2 };

      for (var j = 0; j < allOtherLines.length; j++) {
        var otherLine = allOtherLines[j];
        var otherLineStart = { x: otherLine.x1, y: otherLine.y1 };
        var otherLineEnd = { x: otherLine.x2, y: otherLine.y2 };

        // 2つの線分が交差しているかチェック
        var intersection = this.turtle.lineIntersection(
          myLineStart,
          myLineEnd,
          otherLineStart,
          otherLineEnd,
        );

        if (intersection) {
          // console.log('[Figure.checkCollisionAndBounce] COLLISION DETECTED!');
          // console.log('[Figure.checkCollisionAndBounce] myLine:', myLineStart, '->', myLineEnd);
          // console.log('[Figure.checkCollisionAndBounce] otherLine:', otherLineStart, '->', otherLineEnd);
          // console.log('[Figure.checkCollisionAndBounce] intersection:', intersection);
          hasCollision = true;
          collidingLine = otherLine; // Keep the original object with parentGroup reference
          break;
        }
      }

      if (hasCollision) break;
    }

    // 衝突処理
    if (hasCollision) {
      // Get the other object (collided with object) first
      // This is needed for Step 1 to pass as parameter
      var otherFigure = null;
      if (collidingLine && collidingLine.parentGroup) {
        // Collided with a figure object
        var $parentGroup = collidingLine.parentGroup;
        otherFigure = $parentGroup.data("figureInstance");
      } else if (collidingLine && collidingLine.element) {
        // Collided with a turtle object (turtle bounding box line)
        // Check if the element is a turtle image element
        var $element = collidingLine.element;
        if ($element.is("image[data-trans]")) {
          otherFigure = $element.data("turtleInstance");
        }
      }

      // Step 1: Execute this object's (moving object) collision handler first (if it has one)
      if (thisHasCollision) {
        if (this.collision === this.true) {
          // 自動跳ね返り処理（簡易版：oldPosに戻す）
          // Continue to step 2 to execute the other object's collision handler
        } else if (this["typeof"](this.collision) === "function") {
          // 壁との衝突時（otherFigure = null）は、相手オブジェクトが存在しないため
          // カスタム衝突関数を実行してもエラーになる可能性が高いのでスキップ
          // オブジェクト同士の衝突時のみ実行
          if (otherFigure && !this._collisionExecuting) {
            // カスタム衝突処理を実行（オブジェクト固有の再帰防止フラグ付き）
            this._collisionExecuting = true;
            try {
              // Pass otherFigure as the second argument (相手 parameter)
              this.collision.call(this, otherFigure);
            } catch (error) {
              console.error("Error in collision function:", error);
            } finally {
              this._collisionExecuting = false;
            }
          }
        }
      }

      // Step 2: Execute the other object's (collided with) collision handler
      if (otherFigure && otherFigure !== this) {
        // Check if the other figure has a collision handler
        var otherCollision = otherFigure.collision;

        // Check for empty function
        var isOtherEmptyFunction =
          typeof otherCollision === "function" &&
          otherCollision.toString().indexOf("return }") > -1 &&
          otherCollision.toString().indexOf("return;}") === -1;

        // Execute if valid collision handler exists
        if (
          otherCollision &&
          otherCollision !== otherFigure.undef &&
          (typeof otherCollision === "function" || otherCollision === otherFigure.true) &&
          !isOtherEmptyFunction
        ) {
          // Prevent recursion for the other object
          if (!otherFigure._collisionExecuting) {
            if (typeof otherCollision === "function") {
              // Set flag for both the executing object (otherFigure) AND the target object (this)
              // This prevents the target object from triggering collision detection when moved
              var savedThisFlag = this._collisionExecuting;
              otherFigure._collisionExecuting = true;
              this._collisionExecuting = true; // Set flag on target object (mf4)
              try {
                // Pass this (moving object) as the second argument (相手 parameter)
                otherCollision.call(otherFigure, this);
              } catch (error) {
                console.error("Error in other object collision function:", error);
              } finally {
                otherFigure._collisionExecuting = false;
                this._collisionExecuting = savedThisFlag; // Restore original flag state
              }
            } else if (otherCollision === otherFigure.true) {
              // The other object has auto-bounce enabled, but we don't move it
              // (it's not the moving object)
            }
          }
        }
      }

      // Return appropriate position
      // Only return to old position if this object has auto-bounce enabled
      if (thisHasCollision && this.collision === this.true) {
        return oldPos;
      } else {
        // Return current position (may have been modified by Step 2)
        return { x: this.pos.x, y: this.pos.y };
      }
    }

    return { x: this.pos.x, y: this.pos.y };
  });

  // 既存のmoveToメソッドを衝突検出対応に修正
  this.Figure.moveTo = dtlbind(this, function (x, y) {
    var oldPos = { x: this.pos.x, y: this.pos.y };

    // 251026_2: Actor.moveToの処理を直接実装（setTransを呼ばないようにするため）
    // this.Actor.moveTo.call(this, x, y);
    x = this.num(x);
    y = this.num(y);
    this.pos = this.Vec2.create(x, y);

    // 衝突処理中の場合は衝突検出をスキップ（Step 2で相手を移動させる場合）
    if (this._collisionExecuting) {
      // 衝突処理中なので、位置更新後にそのまま適用
      this.setTrans();
      return this;
    }

    // 衝突検出と跳ね返り処理
    var newPos = this.checkCollisionAndBounce(oldPos, this.pos);
    this.pos.x = newPos.x;
    this.pos.y = newPos.y;
    // 251026_2: setTransは1回だけ呼ぶ（checkCollisionAndBounceの重複実行を防ぐ）
    this.setTrans();

    return this;
  });

  // 既存のmoveByメソッドを衝突検出対応に修正
  this.Figure.moveBy = dtlbind(this, function (dx, dy) {
    var oldPos = { x: this.pos.x, y: this.pos.y };

    // 251026_2: Actor.moveByの処理を直接実装（setTransを呼ばないようにするため）
    // this.Actor.moveBy.call(this, dx, dy);
    dx = this.num(dx);
    dy = this.num(dy);
    this.pos = this.Vec2.create(this.pos.x + dx, this.pos.y + dy);

    // 衝突処理中の場合は衝突検出をスキップ（Step 2で相手を移動させる場合）
    if (this._collisionExecuting) {
      // 衝突処理中なので、位置更新後にそのまま適用
      this.setTrans();
      return this;
    }

    // 衝突検出と跳ね返り処理
    var newPos = this.checkCollisionAndBounce(oldPos, this.pos);
    this.pos.x = newPos.x;
    this.pos.y = newPos.y;
    // 251026_2: setTransは1回だけ呼ぶ（checkCollisionAndBounceの重複実行を防ぐ）
    this.setTrans();

    return this;
  });

  // Override setTrans to account for line start offset
  this.Figure.setTrans = dtlbind(this, function () {
    // Calculate the actual transform position considering the offset
    var actualX = this.pos.x - (this._lineStartOffsetX || 0);
    var actualY = this.pos.y - (this._lineStartOffsetY || 0);

    var transform = "translate(" + actualX + " " + actualY + ")";
    if (this.dir && this.dir !== 0) {
      transform += " rotate(" + this.dir + ")";
    }
    if (this._scalex && this._scaley && (this._scalex !== 1 || this._scaley !== 1)) {
      transform += " scale(" + this._scalex + " " + this._scaley + ")";
    }

    this.element.attr("transform", transform);
    return this;
  });

  return (this.Figure.makeGroup = dtlbind(this, function () {
    return this.Group.create(arguments);
  }));
})
  .checkerror()
  .apply(root, []);
//# sourceMappingURL=Figure.js.map
