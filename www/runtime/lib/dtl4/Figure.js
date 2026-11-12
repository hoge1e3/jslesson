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
              // 2個目の引数は「自分が動いた側か」（V4）。動いたのはこの図形
              this.collision.call(this, otherFigure, true);
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
                // ぶつけられた側なので2個目の引数は偽（V4）
                otherCollision.call(otherFigure, this, false);
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
    x = this.num(x, "位置");
    y = this.num(y, "位置");
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
    dx = this.num(dx, "移動する");
    dy = this.num(dy, "移動する");
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

  // ===== 図形の座標・向き・回転（V4 FXPath に合わせる） =====
  // 図形の線は「描き始めの点」を原点とする局所座標で要素に入っている。
  // 画面上の座標 = 位置 + 回転(向き)・(拡大率 × 局所座標)（setTrans の translate/rotate/scale と同じ順）。
  this.Figure.toWorld = dtlbind(this, function (x, y) {
    var sx = this._scalex || 1;
    var sy = this._scaley || 1;
    var r = ((this.dir || 0) * Math.PI) / 180;
    var c = Math.cos(r);
    var s = Math.sin(r);
    var lx = x * sx;
    var ly = y * sy;
    return {
      x: lx * c - ly * s + (this.pos.x - (this._lineStartOffsetX || 0)),
      y: lx * s + ly * c + (this.pos.y - (this._lineStartOffsetY || 0)),
    };
  });
  // 自分の要素の線（局所座標）。複製は同じ data-figure-id の線を持つので、要素の中だけを見る。
  this.Figure.localLines = dtlbind(this, function () {
    var res = [];
    if (!this.element) {
      return res;
    }
    this.element.find("line").each(function () {
      res.push({
        x1: parseFloat(this.getAttribute("x1")) || 0,
        y1: parseFloat(this.getAttribute("y1")) || 0,
        x2: parseFloat(this.getAttribute("x2")) || 0,
        y2: parseFloat(this.getAttribute("y2")) || 0,
        w: parseFloat(this.getAttribute("data-width")) || 1,
      });
    });
    return res;
  });
  // 中心（頂点の外接矩形の中心。V4 getCenterX/Y と同じ）。線が無ければ位置。
  this.Figure.centerPoint = dtlbind(this, function () {
    var ls = this.localLines();
    var minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;
    var t = this;
    ls.forEach(function (l) {
      [t.toWorld(l.x1, l.y1), t.toWorld(l.x2, l.y2)].forEach(function (p) {
        if (p.x < minx) minx = p.x;
        if (p.x > maxx) maxx = p.x;
        if (p.y < miny) miny = p.y;
        if (p.y > maxy) maxy = p.y;
      });
    });
    if (ls.length === 0) {
      return { x: this.pos.x, y: this.pos.y };
    }
    return { x: (minx + maxx) / 2, y: (miny + maxy) / 2 };
  });
  this.Figure.getx = dtlbind(this, function () {
    return this.centerPoint().x;
  });
  this.Figure.gety = dtlbind(this, function () {
    return this.centerPoint().y;
  });
  // 描き始めの線の方向（0〜360）。図形の「向き？」の基準（V3 OxPath.getOrgDirection）
  this.Figure.orgDirection = dtlbind(this, function () {
    var ls = this.localLines();
    var i, dx, dy;
    if (ls.length === 0) {
      return 0;
    }
    for (i = 0; i < ls.length; i++) {
      dx = ls[i].x2 - ls[0].x1;
      dy = ls[i].y2 - ls[0].y1;
      if (Math.abs(dx) > 1e-9 || Math.abs(dy) > 1e-9) {
        return this.norm360((Math.atan2(dy, dx) * 180) / Math.PI);
      }
    }
    return 0;
  });
  // 向き？は描き始めの方向＋回した角度（0〜360）。跳ね返るが壁の角度として使う
  this.Figure.getDir = dtlbind(this, function () {
    return this.norm360(this.orgDirection() + (this.dir || 0));
  });
  this.Figure.setDir = dtlbind(this, function (d) {
    this.dir = this.num(d, "向き") - this.orgDirection();
    return this.setTrans();
  });
  // 回転の中心は描き始めの点（＝位置）。3引数（角度 中心x 中心y）ならその点のまわりに回す（組図形が使う）
  this.Figure.turnAround = dtlbind(this, function (by, cx, cy) {
    var r, dx, dy;
    if (cx !== undefined && cy !== undefined) {
      r = (by * Math.PI) / 180;
      dx = this.pos.x - cx;
      dy = this.pos.y - cy;
      this.pos = this.Vec2.create(
        cx + dx * Math.cos(r) - dy * Math.sin(r),
        cy + dx * Math.sin(r) + dy * Math.cos(r),
      );
    }
    this.dir = (this.dir || 0) + by;
    return this.setTrans();
  });
  this.Figure.turnLeft = dtlbind(this, function (by, cx, cy) {
    by = this.num(by, "左回り");
    if (cx !== undefined && cy !== undefined) {
      return this.turnAround(by, this.num(cx, "左回り"), this.num(cy, "左回り"));
    }
    return this.turnAround(by);
  });
  this.Figure.turnRight = dtlbind(this, function (by, cx, cy) {
    by = this.num(by, "右回り");
    if (cx !== undefined && cy !== undefined) {
      return this.turnAround(-by, this.num(cx, "右回り"), this.num(cy, "右回り"));
    }
    return this.turnAround(-by);
  });
  this.Figure.leftTurn = this.Figure.turnLeft;
  this.Figure.rightTurn = this.Figure.turnRight;
  // 図形に「歩く」「戻る」は無い（V4: エラー）。Actor から継承しないよう未定義で覆う
  this.Figure.forward = undefined;
  this.Figure.backward = undefined;

  // 衝突の形: 線（太さつき）と、塗った部分（内側も判定対象。V4: 塗った図形は内側も衝突する）。
  // 画面上の座標で作るので、複製・拡大・回転にも追随する。
  this.Figure.getCrashShape = dtlbind(this, function () {
    var g = this.ShapeGroup.create();
    var t = this;
    var sw = Math.max(Math.abs(this._scalex || 1), Math.abs(this._scaley || 1));
    this.localLines().forEach(function (l) {
      var p1 = t.toWorld(l.x1, l.y1);
      var p2 = t.toWorld(l.x2, l.y2);
      if (Math.abs(p1.x - p2.x) < 1e-9 && Math.abs(p1.y - p2.y) < 1e-9) {
        return;
      }
      g.add(t.Polygon.fromLine(t.Vec2.create(p1.x, p1.y), t.Vec2.create(p2.x, p2.y), l.w * sw));
    });
    if (this.element) {
      this.element.find("polygon").each(function () {
        var nums = (this.getAttribute("points") || "").trim().split(/[\s,]+/).map(parseFloat);
        var pts = [];
        var i, p, last;
        for (i = 0; i + 1 < nums.length; i += 2) {
          pts.push(t.toWorld(nums[i], nums[i + 1]));
        }
        // 閉じた経路の最後の点（最初と同じ）は除く
        while (pts.length > 1) {
          last = pts[pts.length - 1];
          if (Math.abs(last.x - pts[0].x) < 1e-6 && Math.abs(last.y - pts[0].y) < 1e-6) {
            pts.pop();
          } else {
            break;
          }
        }
        if (pts.length < 3) {
          return;
        }
        p = t.Polygon.create();
        pts.forEach(function (q) {
          p.addVertex(q.x, q.y);
        });
        g.add(p);
      });
    }
    return g;
  });

  // ===== 組図形（図形！（A）（B）結合する）: V4 dolittle.ini の組図形と同じ振る舞い =====
  // 要素の図形はそれぞれ画面に置いたまま、組図形は要素へ命令を配る。
  // 中心は要素の中心（getx/gety）の外接矩形の中心、回転は中心のまわり、位置は中心を合わせる。
  this.FigureGroup = this.create();
  this.FigureGroup.angle = 0;
  this.FigureGroup.initialize = dtlbind(this, function () {
    var args = Array.prototype.slice.call(arguments);
    var proto = Object.getPrototypeOf(this);
    var t = this;
    this.members = [];
    if (args.length > 0) {
      args.forEach(function (m) {
        if (m && typeof m.getx === "function") {
          t.members.push(m);
        }
      });
      this.angle = 0;
    } else if (proto && proto.members) {
      // 組図形！作る: 要素を複製した新しい組図形
      proto.members.forEach(function (m) {
        t.members.push(m.create());
      });
      this.angle = proto.angle || 0;
    }
  });
  this.FigureGroup.centerPoint = dtlbind(this, function () {
    var minx = Infinity, maxx = -Infinity, miny = Infinity, maxy = -Infinity;
    this.members.forEach(function (m) {
      var x = m.getx(), y = m.gety();
      if (x < minx) minx = x;
      if (x > maxx) maxx = x;
      if (y < miny) miny = y;
      if (y > maxy) maxy = y;
    });
    if (this.members.length === 0) {
      return { x: 0, y: 0 };
    }
    return { x: (minx + maxx) / 2, y: (miny + maxy) / 2 };
  });
  this.FigureGroup.getx = dtlbind(this, function () {
    return this.centerPoint().x;
  });
  this.FigureGroup.gety = dtlbind(this, function () {
    return this.centerPoint().y;
  });
  this.FigureGroup.each = dtlbind(this, function (f) {
    this.members.forEach(f);
    return this;
  });
  this.FigureGroup.moveBy = dtlbind(this, function (dx, dy) {
    dx = this.Actor.num(dx, "移動する");
    dy = this.Actor.num(dy, "移動する");
    return this.each(function (m) {
      m.moveBy(dx, dy);
    });
  });
  this.FigureGroup.moveTo = dtlbind(this, function (x, y) {
    var c = this.centerPoint();
    x = this.Actor.num(x, "位置");
    y = this.Actor.num(y, "位置");
    return this.moveBy(x - c.x, y - c.y);
  });
  this.FigureGroup.turnLeft = dtlbind(this, function (d, cx, cy) {
    var c;
    d = this.Actor.num(d, "左回り");
    if (cx !== undefined && cy !== undefined) {
      c = { x: this.Actor.num(cx, "左回り"), y: this.Actor.num(cy, "左回り") };
    } else {
      c = this.centerPoint();
    }
    this.each(function (m) {
      m.turnLeft(d, c.x, c.y);
    });
    this.angle = (this.angle || 0) + d;
    return this;
  });
  this.FigureGroup.turnRight = dtlbind(this, function (d, cx, cy) {
    d = this.Actor.num(d, "右回り");
    return this.turnLeft(-d, cx, cy);
  });
  this.FigureGroup.leftTurn = this.FigureGroup.turnLeft;
  this.FigureGroup.rightTurn = this.FigureGroup.turnRight;
  this.FigureGroup.getDir = dtlbind(this, function () {
    return this.Actor.norm360(this.angle || 0);
  });
  this.FigureGroup.setDir = dtlbind(this, function (d) {
    d = this.Actor.num(d, "向き");
    return this.turnLeft(d - (this.angle || 0));
  });
  this.FigureGroup.forward = dtlbind(this, function (s) {
    var r = ((this.angle || 0) * Math.PI) / 180;
    s = this.Actor.num(s, "歩く");
    return this.moveBy(s * Math.cos(r), s * Math.sin(r));
  });
  this.FigureGroup.scale = dtlbind(this, function (mx, my) {
    var c = this.centerPoint();
    var single = my === undefined;
    mx = this.Actor.num(mx, "拡大する");
    my = single ? mx : this.Actor.num(my, "拡大する");
    return this.each(function (m) {
      var x0 = m.getx(), y0 = m.gety();
      if (single) {
        m.scale(mx);
      } else {
        m.scale(mx, my);
      }
      // 要素の中心は動かさずに拡大し、組図形の中心からの距離を拡大率に合わせる
      m.moveBy(x0 - m.getx(), y0 - m.gety());
      m.moveBy((m.getx() - c.x) * (mx - 1), (m.gety() - c.y) * (my - 1));
    });
  });
  this.FigureGroup.paint = dtlbind(this, function (c) {
    return this.each(function (m) {
      m.paint(c);
    });
  });
  this.FigureGroup.hide = dtlbind(this, function () {
    return this.each(function (m) {
      m.hide();
    });
  });
  this.FigureGroup.show = dtlbind(this, function () {
    return this.each(function (m) {
      m.show();
    });
  });
  this.FigureGroup["show?"] = dtlbind(this, function () {
    return this.members.some(function (m) {
      return m["show?"]();
    });
  });
  this.FigureGroup.toFront = dtlbind(this, function () {
    return this.each(function (m) {
      m.toFront();
    });
  });
  this.Figure.makeGroup = dtlbind(this, function () {
    return this.FigureGroup.create.apply(this.FigureGroup, arguments);
  });

  // ===== 画面（Screen）: 図形・部品の一覧、マウスの位置、方眼紙、画面消去 =====
  // Screen 本体は UI.js。UI.js（GUI担当）への変更を避けるため、ここで命令を足す（UI.js の後に読み込まれる）。
  var scr = this.Screen;
  var R = this;
  // GUI部品の一覧は UI.js の root.UI.parts（autoLayout で登録）を使う
  var guiParts = function () {
    return (R.UI && R.UI.parts) || [];
  };
  var isOnScreen = function (ui) {
    var el = ui.element && ui.element.get ? ui.element.get(0) : null;
    if (!el || !el.ownerDocument || !el.ownerDocument.documentElement.contains(el)) {
      return false;
    }
    if (typeof ui["show?"] === "function") {
      return !!ui["show?"]();
    }
    return ui.element.css("visibility") !== "hidden";
  };
  // getguis: 画面上の（見えている）GUI部品の配列（V3 getGuiContents）
  scr.getguis = dtlbind(this, function () {
    var res = this.Array.create();
    guiParts().forEach(function (ui) {
      if (isOnScreen(ui)) {
        res.push(ui);
      }
    });
    return res;
  });
  // getgraphics: 画面上の（見えている）タートル・図形の配列（V3 getTurtleContents）
  scr.getgraphics = dtlbind(this, function () {
    var res = this.Array.create();
    R.Actor.group.members.forEach(function (a) {
      // Group.js の見本（this.Group）も members に入っているので、タートルと図形だけを返す
      if (a.isShowing && (R.turtle.isPrototypeOf(a) || R.Figure.isPrototypeOf(a))) {
        res.push(a);
      }
    });
    return res;
  });
  // 画面：取得（dolittle.ini）: GUI部品と図形をまとめた配列。配列に 現れる／消える を持たせる
  scr.getContents = dtlbind(this, function () {
    var a = this.Array.create();
    var show, hide;
    this.getguis().forEach(function (e) {
      a.push(e);
    });
    this.getgraphics().forEach(function (e) {
      a.push(e);
    });
    show = function () {
      a.forEach(function (e) {
        e.show();
      });
      return a;
    };
    hide = function () {
      a.forEach(function (e) {
        e.hide();
      });
      return a;
    };
    a["現れる"] = a["あらわれる"] = a["描画"] = a.show = a.appear = show;
    a["消える"] = a["きえる"] = a["消去"] = a.hide = a.die = hide;
    return a;
  });
  // 画面：消去（dolittle.ini）: 画面上の部品・図形を消して（見えなくして）、その配列を返す
  scr.clearContents = dtlbind(this, function () {
    var a = this.getContents();
    a.hide();
    return a;
  });
  // マウス（＝画面）の位置。タートルの座標（中央が原点、上が正）
  scr._mouseX = 0;
  scr._mouseY = 0;
  this.$.create(this.document).on("mousemove", function (e) {
    var svg = R.Actor.svg && R.Actor.svg.get ? R.Actor.svg.get(0) : null;
    var w = svg ? svg.getAttribute("width") - 0 : R.window.innerWidth;
    var h = svg ? svg.getAttribute("height") - 0 : R.window.innerHeight;
    R.Screen._mouseX = e.pageX - R.Actor.originX(w);
    R.Screen._mouseY = R.Actor.originY(h) - e.pageY;
  });
  scr["xpos?"] = dtlbind(this, function () {
    return Math.round(R.Screen._mouseX);
  });
  scr["ypos?"] = dtlbind(this, function () {
    return Math.round(R.Screen._mouseY);
  });
  // 方眼紙: 色を渡すと表示、引数なしで消す（V4 showGrid）。V4 の drawGrid と同じく SVG の線で描く: 10 ごとに太さ 1、100 ごとに太さ 2、
  // 軸は太さ 3。色も反映する（以前は grid.js の画像で、色が効かなかった。2026-10-17 V4 の画素テストで発見）。線や図形の下に置く
  scr.showgrid = dtlbind(this, function (c) {
    var A = R.Actor, g0 = A.svg_g.children("g.dtl_grid");
    g0.remove();
    if (typeof this.window.grid_hide === "function") this.window.grid_hide();
    if (c === undefined || c === null) return this;
    var svg = A.svg.get(0), W = +svg.getAttribute("width") || 0, H = +svg.getAttribute("height") || 0;
    var g = A.createSVGElem("g").attr("class", "dtl_grid"), col = String(c);
    var line = function (x1, y1, x2, y2, w) {
      A.createSVGElem("line").attr({ x1: x1, y1: y1, x2: x2, y2: y2 }).css({ stroke: col, "stroke-width": w }).appendTo(g);
    };
    var i;
    for (i = Math.floor(-H / 20); i <= Math.ceil(H / 20); i++) line(-W / 2, i * 10, W / 2, i * 10, i % 10 === 0 ? 2 : 1);
    for (i = Math.floor(-W / 20); i <= Math.ceil(W / 20); i++) line(i * 10, -H / 2, i * 10, H / 2, i % 10 === 0 ? 2 : 1);
    line(-W / 2, 0, W / 2, 0, 3);
    line(0, -H / 2, 0, H / 2, 3);
    g.prependTo(A.svg_g);
    return this;
  });
  // システム！画面消去: タートル・図形・GUI部品・描いた線を画面から消す（V4 clearDisplay）
  if (this.System) {
    this.System.clearDisplay = dtlbind(this, function () {
      R.Actor.group.members.slice().forEach(function (a) {
        a.hide();
      });
      R.Actor.svg_g.children().detach();
      guiParts().forEach(function (ui) {
        if (ui.element) {
          ui.element.detach();
        }
      });
      guiParts().splice(0);
      R.UI.last = undefined;
      return this;
    });
  }

  return this;
})
  .checkerror()
  .apply(root, []);
//# sourceMappingURL=Figure.js.map
