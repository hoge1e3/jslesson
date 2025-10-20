(function () {
  this.turtle = this.Actor.create();
  this.Turtle = this.turtle;
  this.Turtle.baseURL = this.window.runtimePath + "images/";
  this.Turtle.img = "ayumi.gif";
  this.turtle.action = dtlbind(this, function () {
    return;
  });
  this.turtle.initialize = dtlbind(this, function () {
    var t;
    t = this;
    this.element = this.createSVGElem("image");
    this.element
      .get(0)
      .setAttributeNS("http://www.w3.org/1999/xlink", "href", this.baseURL + this.img);
    this.adjustImage();
    this.getImageSize(this.baseURL + this.img);
    this.element.attr("transform", "scale(1,-1)");
    this.element.click(
      dtlbind(this, function () {
        return t.action();
      }),
    );
    if (!this._lineCol) {
      this.lineColor("black");
    }
    this.newLineG();
    this.isShowing = this.false;
    this.appear();
    this.pos = this.pos.add(this.Vec2.O);
    // Initialize penDownStart to current position (origin)
    this.penDownStart = this.Vec2.create(0, 0);
    // collisionプロパティは設定しない
    // 親オブジェクトから継承されるか、明示的に設定されるまで未定義のままにする
    // Store reference to this turtle object in the DOM element for collision detection
    this.element.data("turtleInstance", this);
    return (this.dir = this.dir);
  });
  this.turtle.width = 32;
  this.turtle.height = 32;
  this.turtle._lineWidth = 3;
  this.turtle.isPenDown = this.true;
  this.turtle.penDownStart = this.pos;
  this.turtle.adjustImage = dtlbind(this, function () {
    return this.element
      .attr("width", this.width + "px")
      .attr("height", this.height + "px")
      .attr("x", -this.width / 2)
      .attr("y", -this.height / 2);
  });
  this.turtle.getImageSize = dtlbind(this, function (url) {
    var t;
    t = this;
    return this.$
      .create("<img>")
      .css("display", "none")
      .load(
        dtlbind(this, function () {
          var j;
          j = t.$.create(this);
          t.width = j.width();
          t.height = j.height();
          t.adjustImage();
          return j.remove();
        }),
      )
      .attr("src", url)
      .appendTo("body");
  });
  this.turtle.newLineG = dtlbind(this, function () {
    var lineGId = "lineG_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    this.lineG = this.createSVGElem("g").attr("id", lineGId).appendTo(this.svg_g);
    // Set transform to (0,0) since lines are added with absolute coordinates to svg_g
    this.lineG.attr("transform", "translate(0 0)");
    return (this.lineOrig = this.Vec2.create(0, 0));
  });
  this.turtle.addPath = dtlbind(this, function (pos1, pos2) {
    var line;
    // Draw lines in world coordinates (svg_g) for accurate positioning
    var figureId = this.lineG.attr("id") || "default";
    line = this.createSVGElem("line")
      .attr("x1", pos1.x)
      .attr("y1", pos1.y)
      .attr("x2", pos2.x)
      .attr("y2", pos2.y)
      .attr("style", "stroke:" + this._lineCol + ";stroke-width:" + this._lineWidth)
      .attr("data-width", this._lineWidth)
      .attr("data-figure-id", figureId)
      .appendTo(this.svg_g);
    // タートルを最前面に移動（線より手前に表示されるようにする）
    this.toFront();
    return this;
  });
  this.turtle.addPathAfterAction = dtlbind(this, function (a) {
    var pos1;
    // Make a copy of the position object to avoid reference issues
    pos1 = this.Vec2.create(this.pos.x, this.pos.y);
    a.execute();
    if (this.isPenDown) {
      this.addPath(pos1, this.pos);
    }
    return this;
  });
  // 元のforwardとmoveToメソッド定義を削除（衝突検出対応版のみを使用）
  this.turtle.circle = dtlbind(this, function (r) {
    var d;
    d = r * 0.1745328;
    this.backward(d / 2);
    dtlbind(this, function () {
      return this.forward(d).rightTurn(10);
    }).repeat(36);
    return this.forward(d / 2);
  });
  this.turtle.closePath = dtlbind(this, function () {
    if (this.isPenDown) {
      // Simply draw a line from turtle's current position to where pen was first put down
      // Use the most basic forward movement to ensure line starts from turtle position
      var currentX = this.pos.x;
      var currentY = this.pos.y;
      // Ensure penDownStart is initialized, default to origin if not
      if (!this.penDownStart) {
        this.penDownStart = this.Vec2.create(0, 0);
      }
      var targetX = this.penDownStart.x;
      var targetY = this.penDownStart.y;

      // Calculate distance and direction
      var deltaX = targetX - currentX;
      var deltaY = targetY - currentY;
      var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      var angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

      // Save current direction
      var oldDir = this.dir;
      // Calculate turn angle needed
      var turnAngle = angle - this.dir;
      // Normalize angle to [-180, 180]
      while (turnAngle > 180) turnAngle -= 360;
      while (turnAngle < -180) turnAngle += 360;
      // Turn to face the target
      this.turnLeft(turnAngle);
      // Move forward the calculated distance
      this.forward(distance);
      // Restore original direction
      var restoreAngle = oldDir - this.dir;
      while (restoreAngle > 180) restoreAngle -= 360;
      while (restoreAngle < -180) restoreAngle += 360;
      this.turnLeft(restoreAngle);
    }
    return this;
  });
  this.turtle.addAlias("closePath", "close");
  this.turtle.autoCloseOpenPath = dtlbind(this, function () {
    // Check if we need to automatically close an open path for figure creation
    // This implements the Dolittle behavior of auto-closing open paths
    // IMPORTANT: Respects pen-up gaps and only closes continuous segments

    // Find lines in svg_g using current figure-id
    var figureId = this.lineG.attr("id") || "default";
    var lines = this.svg_g.find("line[data-figure-id='" + figureId + "']");

    if (lines.length >= 1) {
      // Convert lines to segments (same logic as Figure.js convertLinesToPolygon)
      var segments = this.convertLinesToSegments(lines);

      // Process each segment to auto-close if needed
      for (var i = 0; i < segments.length; i++) {
        var segment = segments[i];
        if (segment.length >= 4) {
          // At least 2 points (4 coordinates)
          var firstX = segment[0];
          var firstY = segment[1];
          var lastX = segment[segment.length - 2];
          var lastY = segment[segment.length - 1];

          // Round coordinates to avoid floating point precision issues
          var roundedFirstX = Math.round(firstX);
          var roundedFirstY = Math.round(firstY);
          var roundedLastX = Math.round(lastX);
          var roundedLastY = Math.round(lastY);

          // Check if this segment is not closed (end point != start point)
          if (roundedFirstX !== roundedLastX || roundedFirstY !== roundedLastY) {
            // Make sure pen is down for drawing the closing line
            var wasPenDown = this.isPenDown;
            this.isPenDown = this.true;
            // Draw line to first point to close this segment
            var closingStartPos = this.Vec2.create(lastX, lastY);
            var closingEndPos = this.Vec2.create(firstX, firstY);
            this.addPath(closingStartPos, closingEndPos);
            // Restore pen state
            this.isPenDown = wasPenDown;
          } else {
          }
        }
      }
    } else {
    }
    return this;
  });
  this.turtle.convertLinesToSegments = dtlbind(this, function (lines) {
    // Convert jQuery line collection to segments, respecting pen-up gaps
    // This is similar to Figure.js convertLinesToPolygon but for Turtle use
    var segments = [];
    var currentSegment = [];
    var i;
    var line;
    var x1, y1, x2, y2;
    var prevX2, prevY2;
    var roundedX1, roundedY1, roundedX2, roundedY2;
    var roundedPrevX2, roundedPrevY2;

    for (i = 0; i < lines.length; i++) {
      line = this.$.create(lines[i]);
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
          // Gap detected (pen-up movement) - save current segment and start new one
          if (currentSegment.length >= 4) {
            // At least 2 points
            segments.push(currentSegment.slice());
          }
          currentSegment = [roundedX1, roundedY1, roundedX2, roundedY2];
        }
      }
      prevX2 = x2;
      prevY2 = y2;
    }

    // Save the last segment
    if (currentSegment.length >= 4) {
      segments.push(currentSegment.slice());
    }

    return segments;
  });
  this.turtle.lineColor = dtlbind(this, function (col) {
    if (col) {
      this._lineCol = col;
    }
    return this;
  });
  this.turtle.lineWidth = dtlbind(this, function (w) {
    w = this.num(w);
    this._lineWidth = w;
    return this;
  });
  this.turtle.makeFigure = dtlbind(this, function (col) {
    var r;

    // Only auto-close path if color is specified (Dolittle behavior)
    if (col) {
      // Color argument provided - auto-close open paths before creating figure
      this.autoCloseOpenPath();
    }

    r = this.Figure.create(this);
    if (col) {
      r.paint(col);
    }
    // Create a new lineG for future drawings to ensure independence
    this.newLineG();
    return r;
  });
  this.turtle.paint = dtlbind(this, function (col) {
    return this.makeFigure(col);
  });
  this.turtle.penDown = dtlbind(this, function () {
    if (!this.isPenDown) {
      this.isPenDown = this.true;
      this.penDownStart = this.pos;
    }
    return this;
  });
  this.turtle.penUp = dtlbind(this, function () {
    this.isPenDown = this.false;
    return this;
  });
  this.turtle.setShape = dtlbind(this, function (url) {
    this.img = url;
    url = url.match("https?") ? url : this.baseURL + url;
    this.element.get(0).setAttributeNS("http://www.w3.org/1999/xlink", "href", url);
    this.getImageSize(url);
    return this;
  });
  this.turtle.addAlias("setShape", "change");
  this.turtle.setTrans = dtlbind(this, function () {
    var str;
    str = "translate(" + this.pos.x + " " + this.pos.y + ") ";
    str = str + "rotate(" + this.dir + ") ";
    str = str + "scale(" + this._scalex + " " + (0 - this._scaley) + ") ";
    this.element
      .attr("transform", str)
      .attr("data-trans", this.pos.x + "," + this.pos.y + "," + this.dir);
    if (this.isShowing) {
      this.checkCrash();
    }
    return this;
  });
  this.turtle.polygon = dtlbind(this, function (d, n) {
    return dtlbind(this, function () {
      return this.forward(d).rightturn(360 / n);
    }).repeat(n);
  });
  root.action = dtlbind(this, function () {
    return;
  });
  root.action.isEventHandler = this.true;
  root.click = dtlbind(this, function () {
    return;
  });
  root.click.isEventHandler = this.true;
  this.turtle.setAction = dtlbind(this, function (f) {
    if (this["typeof"](f) === "function") {
      this.action = f;
    }
    return this;
  });

  // 線分交差判定による衝突検出機能
  this.turtle.lineIntersection = dtlbind(
    this,
    function (line1Start, line1End, line2Start, line2End) {
      // 2つの線分の交差点を計算する
      var x1 = line1Start.x,
        y1 = line1Start.y;
      var x2 = line1End.x,
        y2 = line1End.y;
      var x3 = line2Start.x,
        y3 = line2Start.y;
      var x4 = line2End.x,
        y4 = line2End.y;

      // 極小値を0に修正（浮動小数点誤差対策）
      if (Math.abs(x1) < 1e-10) x1 = 0;
      if (Math.abs(y1) < 1e-10) y1 = 0;
      if (Math.abs(x2) < 1e-10) x2 = 0;
      if (Math.abs(y2) < 1e-10) y2 = 0;
      if (Math.abs(x3) < 1e-10) x3 = 0;
      if (Math.abs(y3) < 1e-10) y3 = 0;
      if (Math.abs(x4) < 1e-10) x4 = 0;
      if (Math.abs(y4) < 1e-10) y4 = 0;

      // 線分の長さが0の場合は交差なし
      var len1 = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      var len2 = Math.sqrt((x4 - x3) * (x4 - x3) + (y4 - y3) * (y4 - y3));
      if (len1 < 1e-6 || len2 < 1e-6) return null;

      var denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (Math.abs(denom) < 1e-10) return null; // 平行線

      var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
      var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

      // 70度問題を解決するため、シンプルで確実な線分交差判定に変更
      // まず厳密な範囲チェック
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
          x: x1 + t * (x2 - x1),
          y: y1 + t * (y2 - y1),
          t: t,
        };
      }

      // 厳密チェックで失敗した場合、70度問題対策として緩い判定を追加
      var tolerance = 0.1; // 10% の余裕
      if (t >= -tolerance && t <= 1 + tolerance && u >= -tolerance && u <= 1 + tolerance) {
        // 範囲外の値を補正
        t = Math.max(0, Math.min(1, t));
        u = Math.max(0, Math.min(1, u));

        return {
          x: x1 + t * (x2 - x1),
          y: y1 + t * (y2 - y1),
          t: t,
        };
      }

      // 範囲外だが近接している場合の処理（平行線対策）
      // タートルの移動パスが線分に接近している場合を検出
      // 70度問題を解決するため、許容値を大幅に拡大
      var tolerance = 10.0; // 接近許容値（ピクセル）

      // line1（タートルの移動）の端点から線分line2への最短距離をチェック
      var dist1 = this.pointToLineDistance({ x: x1, y: y1 }, { x: x3, y: y3 }, { x: x4, y: y4 });
      var dist2 = this.pointToLineDistance({ x: x2, y: y2 }, { x: x3, y: y3 }, { x: x4, y: y4 });

      if (dist1 <= tolerance || dist2 <= tolerance) {
        // 接近している端点を特定
        var closestPoint = dist1 <= dist2 ? { x: x1, y: y1 } : { x: x2, y: y2 };

        // 線分line2上の最も近い点を計算
        var closestOnLine2 = this.closestPointOnLineSegment(
          closestPoint,
          { x: x3, y: y3 },
          { x: x4, y: y4 },
        );

        return {
          x: closestOnLine2.x,
          y: closestOnLine2.y,
          t: dist1 <= dist2 ? 0 : 1, // 接近している端点のt値
        };
      }

      return null;
    },
  );

  // 点から線分への最短距離を計算
  this.turtle.pointToLineDistance = dtlbind(this, function (point, lineStart, lineEnd) {
    var px = point.x,
      py = point.y;
    var x1 = lineStart.x,
      y1 = lineStart.y;
    var x2 = lineEnd.x,
      y2 = lineEnd.y;

    var A = px - x1;
    var B = py - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var lenSq = C * C + D * D;

    if (lenSq === 0) {
      // 点と点の距離
      return Math.sqrt(A * A + B * B);
    }

    var param = dot / lenSq;

    var xx, yy;
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    var dx = px - xx;
    var dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  });

  // 線分上の最接近点を求める
  this.turtle.closestPointOnLineSegment = dtlbind(this, function (point, lineStart, lineEnd) {
    var px = point.x,
      py = point.y;
    var x1 = lineStart.x,
      y1 = lineStart.y;
    var x2 = lineEnd.x,
      y2 = lineEnd.y;

    var A = px - x1;
    var B = py - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var lenSq = C * C + D * D;

    if (lenSq === 0) {
      // 始点と終点が同じ場合
      return { x: x1, y: y1 };
    }

    var param = dot / lenSq;

    if (param < 0) {
      return { x: x1, y: y1 };
    } else if (param > 1) {
      return { x: x2, y: y2 };
    } else {
      return {
        x: x1 + param * C,
        y: y1 + param * D,
      };
    }
  });

  this.turtle.calculateNormalVector = dtlbind(this, function (lineStart, lineEnd) {
    // 線分の法線ベクトルを計算（右向きが正）
    var dx = lineEnd.x - lineStart.x;
    var dy = lineEnd.y - lineStart.y;
    var length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return { x: 0, y: 1 };
    // 法線ベクトル（90度回転）
    return {
      x: -dy / length, // 左向きが正の法線
      y: dx / length,
    };
  });

  this.turtle.reflectVector = dtlbind(this, function (incident, normal) {
    // 反射ベクトルを計算: R = V - 2 * (V・N) * N
    var dotProduct = incident.x * normal.x + incident.y * normal.y;
    return {
      x: incident.x - 2 * dotProduct * normal.x,
      y: incident.y - 2 * dotProduct * normal.y,
    };
  });

  this.turtle.getAllLines = dtlbind(this, function () {
    var self = this;
    var 自分 = self;

    // 全ての描画線を取得（図形内の線を優先、svg_g内の独立した線も含む）
    var lines = [];

    // 1. 図形オブジェクト内のlineを取得（移動済みの線）
    // lineG_: 通常のfigure、figure_: 複製figure を検出
    var figureGroups = this.svg_g.find('g[id^="lineG_"], g[id^="figure_"]');
    var figureLines = figureGroups.find("line");

    // 2. svg_g直下のline（図形になっていない独立した線）のみを取得
    // ただし、自分が描いた線は除外する
    var svgDirectLines = this.svg_g.children("line").filter(function () {
      var currentLineGId = self.lineG ? self.lineG.attr("id") : null;
      var lineFigureId = $(this).attr("data-figure-id");
      return !(currentLineGId && lineFigureId === currentLineGId);
    });

    // 図形内の線を優先的に処理
    var allLines = figureLines.add(svgDirectLines);

    var currentTurtleLineGId = this.lineG ? this.lineG.attr("id") : null;
    allLines.each(
      dtlbind(this, function (i, line) {
        try {
          var $line = $(line);
          var figureId = $line.attr("data-figure-id");

          // 線の親要素（図形グループ）を取得
          var parentGroup = $line.parent();

          // 親要素が存在しない場合はスキップ
          if (!parentGroup || parentGroup.length === 0) {
            return;
          }

          var parentId = parentGroup.attr("id");

          // 自分自身が描いた線を除外
          if (currentTurtleLineGId && parentId === currentTurtleLineGId) {
            return; // 自分の線はスキップ
          }

          // 図形内の線かどうかを判定
          var isInFigure =
            parentId && (parentId.startsWith("lineG_") || parentId.startsWith("figure_"));

          // 図形IDを持つ線も図形として扱う（移動した図形の線など）
          var hasFigureId = $line.attr("data-figure-id");

          var x1 = parseFloat($line.attr("x1"));
          var y1 = parseFloat($line.attr("y1"));
          var x2 = parseFloat($line.attr("x2"));
          var y2 = parseFloat($line.attr("y2"));
          var transformedCoords;

          // 座標変換の対象グループを決定
          var transformGroup = null;

          if (isInFigure && parentGroup.attr("transform")) {
            // 図形内の線：親グループのtransform属性を使用
            transformGroup = parentGroup;
          } else if (hasFigureId) {
            // 図形IDを持つ線：その図形要素のtransform属性を検索
            var figureElement = self.svg_g.find("#" + hasFigureId);
            if (figureElement.length > 0 && figureElement.attr("transform")) {
              transformGroup = figureElement;
            }
          }

          // 座標変換を適用
          if (transformGroup) {
            transformedCoords = self.applyTransformToLine(x1, y1, x2, y2, transformGroup);
          } else {
            transformedCoords = { x1: x1, y1: y1, x2: x2, y2: y2 };
          }

          lines.push({
            x1: transformedCoords.x1,
            y1: transformedCoords.y1,
            x2: transformedCoords.x2,
            y2: transformedCoords.y2,
            element: $line,
            figureId: figureId,
          });
        } catch (error) {
          console.error("ERROR in line processing for line", i, ":", error);
          throw error;
        }
      }),
    );

    // svg_gのfind('line')で全ての線（直接とグループ内の両方）が取得される

    // 衝突検出用のstart/end形式に変換
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line && typeof line.x1 !== "undefined") {
        // {x1, y1, x2, y2}形式を{start: {x, y}, end: {x, y}}形式に変換
        lines[i] = {
          start: { x: line.x1, y: line.y1 },
          end: { x: line.x2, y: line.y2 },
          element: line.element,
          figureId: line.figureId,
        };
      }
    }

    return lines;
  });

  this.turtle.applyTransformToLine = dtlbind(this, function (x1, y1, x2, y2, groupElement) {
    try {
      // 親グループ要素のtransform属性をパース
      var transformAttr = groupElement.attr
        ? groupElement.attr("transform")
        : groupElement.attr("transform");

      if (!transformAttr) {
        return { x1: x1, y1: y1, x2: x2, y2: y2 };
      }

      // translate, rotate, scaleを処理
      var translateX = 0,
        translateY = 0,
        rotation = 0,
        scaleX = 1,
        scaleY = 1;

      // translate(x y) または translate(x,y) の抽出
      var translateMatch = transformAttr.match(/translate\(([^,\)\s]+)[\s,]+([^,\)\s]+)\)/);
      if (translateMatch) {
        translateX = parseFloat(translateMatch[1]) || 0;
        translateY = parseFloat(translateMatch[2]) || 0;
      }

      // rotate(angle) の抽出
      var rotateMatch = transformAttr.match(/rotate\(([^,\)\s]+)\)/);
      if (rotateMatch) {
        rotation = parseFloat(rotateMatch[1]) || 0;
        rotation = (rotation * Math.PI) / 180; // 度をラジアンに変換
      }

      // scale(x y) の抽出
      var scaleMatch = transformAttr.match(/scale\(([^,\)\s]+)[\s,]+([^,\)\s]+)\)/);
      if (scaleMatch) {
        scaleX = parseFloat(scaleMatch[1]) || 1;
        scaleY = parseFloat(scaleMatch[2]) || 1;
      }

      // 変換を適用: scale → rotate → translate の順序
      function transformPoint(x, y) {
        // 1. Scale適用
        var sx = x * scaleX;
        var sy = y * scaleY;

        // 2. Rotate適用
        var cos = Math.cos(rotation);
        var sin = Math.sin(rotation);
        var rx = sx * cos - sy * sin;
        var ry = sx * sin + sy * cos;

        // 3. Translate適用
        return {
          x: rx + translateX,
          y: ry + translateY,
        };
      }

      var p1 = transformPoint(x1, y1);
      var p2 = transformPoint(x2, y2);

      return {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
      };
    } catch (error) {
      return { x1: x1, y1: y1, x2: x2, y2: y2 };
    }
  });

  this.turtle.checkCollisionAndBounce = dtlbind(this, function (oldPos, newPos) {

    // 衝突処理中の場合は衝突検出をスキップ（Step 2で相手を移動させる場合）
    if (this._collisionExecuting) {
      return newPos;
    }

    // 衝突検出の条件チェック
    // 1. collision プロパティが存在しない、またはundefined
    // 2. collision が true でない
    // 3. collision が関数でない、または空の関数（意味のある処理がない）
    var isEmptyFunction =
      typeof this.collision === "function" &&
      this.collision.toString().indexOf("return }") > -1 &&
      this.collision.toString().indexOf("return;}") === -1;

    if (
      !this.collision ||
      this.collision === this.undef ||
      (typeof this.collision !== "function" && this.collision !== this.true) ||
      isEmptyFunction
    ) {
      return newPos;
    }

    var movementLine = {
      start: { x: oldPos.x, y: oldPos.y },
      end: { x: newPos.x, y: newPos.y },
    };

    var allLines = this.getAllLines();

    var closestIntersection = null;
    var closestDistance = Infinity;
    var collidingLine = null;
    var collidingLineData = null; // Store the original line data with element reference

    for (var i = 0; i < allLines.length; i++) {
      var line = allLines[i];
      var lineStart = { x: line.start.x, y: line.start.y };
      var lineEnd = { x: line.end.x, y: line.end.y };

      var intersection = this.lineIntersection(
        movementLine.start,
        movementLine.end,
        lineStart,
        lineEnd,
      );

      if (intersection) {
        var distance = Math.sqrt(
          (intersection.x - oldPos.x) * (intersection.x - oldPos.x) +
            (intersection.y - oldPos.y) * (intersection.y - oldPos.y),
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIntersection = intersection;
          collidingLine = { start: lineStart, end: lineEnd };
          collidingLineData = line; // Store original line data
        }
      } else {
      }
    }

    if (closestIntersection && collidingLine) {
      // 同一線分での重複衝突を防ぐため、線分IDを生成
      var lineId =
        collidingLine.start.x +
        "," +
        collidingLine.start.y +
        "-" +
        collidingLine.end.x +
        "," +
        collidingLine.end.y;

      // 重複衝突の防止：同一線分での連続衝突を完全にブロック
      var currentTime = Date.now();
      var shouldProcess =
        !this._lastCollisionLineId ||
        lineId !== this._lastCollisionLineId ||
        (this._lastCollisionTime && currentTime - this._lastCollisionTime > 100);

      if (shouldProcess) {
        // 衝突位置、時間、線分IDを記録
        this._lastCollisionPoint = { x: closestIntersection.x, y: closestIntersection.y };
        this._lastCollisionTime = currentTime;
        this._lastCollisionLineId = lineId;

        // Get the other object (if colliding with a figure)
        var otherFigure = null;
        if (collidingLineData && collidingLineData.element) {
          var parentGroup = collidingLineData.element.parent();
          if (parentGroup && parentGroup.length > 0) {
            var parentId = parentGroup.attr("id");
            // Check if parent is a figure group
            if (parentId && (parentId.startsWith("lineG_") || parentId.startsWith("figure_"))) {
              otherFigure = parentGroup.data("figureInstance");
            }
          }
        }

        // 衝突処理
        if (this.collision === this.true) {
          // 自動跳ね返り処理
          var normal = this.calculateNormalVector(collidingLine.start, collidingLine.end);
          var incidentVector = {
            x: newPos.x - oldPos.x,
            y: newPos.y - oldPos.y,
          };

          // 入射ベクトルの長さチェック
          var incidentLength = Math.sqrt(
            incidentVector.x * incidentVector.x + incidentVector.y * incidentVector.y,
          );
          if (incidentLength < 0.1) {
            // 移動距離が極小の場合は現在位置を維持
            return oldPos;
          }

          var reflectedVector = this.reflectVector(incidentVector, normal);

          // 反射方向の更新
          var reflectedLength = Math.sqrt(
            reflectedVector.x * reflectedVector.x + reflectedVector.y * reflectedVector.y,
          );
          if (reflectedLength > 0) {
            var normalizedReflection = {
              x: reflectedVector.x / reflectedLength,
              y: reflectedVector.y / reflectedLength,
            };

            var newDir =
              (Math.atan2(normalizedReflection.y, normalizedReflection.x) * 180) / Math.PI;
            this.dir = newDir;
          }

          // 衝突前の安全な位置（oldPos）に戻す
          // タートルが壁と重なった状態を回避し、安定した動作を実現
          return oldPos;
        } else if (this["typeof"](this.collision) === "function") {
          // オブジェクト固有の再帰防止: この特定のオブジェクトの衝突関数が既に実行中の場合はスキップ
          if (this._collisionExecuting) {
            return oldPos;
          }

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
          // カスタム衝突関数の場合は、処理を実行した後に目的地まで移動を続ける
          return newPos;
        }
      } else {
        // 重複衝突のため処理をスキップ
      }
    } else {
    }

    return newPos;
  });

  // 既存のforwardメソッドを衝突検出対応に修正
  this.turtle.forward = dtlbind(this, function (by) {
    var oldPos = { x: this.pos.x, y: this.pos.y };

    return this.addPathAfterAction(
      dtlbind(this, function () {
        this.Actor.forward.call(this, by);

        // 衝突検出と跳ね返り処理
        var newPos = this.checkCollisionAndBounce(oldPos, this.pos);
        this.pos.x = newPos.x;
        this.pos.y = newPos.y;
        this.setTrans();
      }),
    );
  });

  // 既存のmoveToメソッドを衝突検出対応に修正
  // moveToでもペンが下りていれば線を描く
  this.turtle.moveTo = dtlbind(this, function (x, y) {
    var oldPos = { x: this.pos.x, y: this.pos.y };

    // addPathAfterActionを使って移動し、ペンが下りていれば線を描く
    return this.addPathAfterAction(
      dtlbind(this, function () {
        this.Actor.moveTo.call(this, x, y);

        // 衝突検出と跳ね返り処理
        var newPos = this.checkCollisionAndBounce(oldPos, this.pos);
        this.pos.x = newPos.x;
        this.pos.y = newPos.y;
        this.setTrans();
      }),
    );
  });

  return this;
})
  .checkerror()
  .apply(root, []);

/*
// system ! "Actor" use.
//test3
turtle=Actor ! create.
Turtle=turtle.
Turtle:baseURL=window:runtimePath+"images/".
Turtle:img="ayumi.gif".
turtle:action=[/*:window!"aa"alert* /].
turtle:initialize=[|;t|
    t=this.//@hoge1e3
    element= ! "image" createSVGElem.
    element ! 0 get 
    "http://www.w3.org/1999/xlink" "href" 
    (baseURL+img) setAttributeNS.
    !adjustImage.
    ! (baseURL+img) getImageSize .
    element ! "transform" "scale(1,-1)" attr.
    element ! [t!action] click.//@hoge1e3
    [_lineCol]!else[! "black" lineColor]execute.
    !newLineG.
    isShowing=false.
    !appear.
    self:pos=self:pos!(Vec2:O)add.
    self:dir=self:dir.
].
turtle:width=32.
turtle:height=32.
turtle:_lineWidth=3.
turtle:isPenDown=true.

turtle:adjustImage=[
    element ! "width" (width+"px") attr
    "height" (height+"px") attr
    "x" (-width/2) attr
    "y" (-height/2) attr.
].
turtle:getImageSize=[|url;t|
    t=this.
    $ ! "<img>" create "display" "none" css [|;j|
        j=(t:$) ! (this) create.
        t:width=j ! width.
        t:height=j ! height.
        //(t:console) ! "getims" (t:width) (t:height) log.
        t!adjustImage.
        j!remove.
    ] load "src" (url) attr "body" appendTo.
].
turtle:newLineG=[
    lineG=! "g" createSVGElem (svg_g) appendTo.
    lineG ! "transform" ("translate("+(pos:x)+" "+(pos:y)+")") attr.
    lineOrig=pos.
].
turtle:addPath=[|pos1 pos2;line|// pos:world coord
    pos1=pos1 ! (lineOrig) sub.
    pos2=pos2 ! (lineOrig) sub.
    line=! "line" createSVGElem
    "x1" (pos1:x) attr "y1" (pos1:y) attr
    "x2" (pos2:x) attr "y2" (pos2:y) attr 
    "style" ("stroke:"+_lineCol+";stroke-width:"+_lineWidth) attr
    "data-width" (_lineWidth) attr
    (lineG) appendTo.
    this.
].
turtle:addPathAfterAction=[|a;pos1|
    pos1=pos.
    a ! execute.
    //console ! "PEND" (isPenDown) log.
    //[[isShowing]![isPendown]or] ! then  // <-これだとペンなしが効かなくなるよー
    [isPenDown] ! then [
        ! (pos1) (pos) addPath.
    ] execute.
    this.
].
turtle:forward=[|by|
    ! [(Actor:forward) ! (this) (by) call.] addPathAfterAction.
].
turtle:moveTo=[|x y|
    ! [(Actor:moveTo) ! (this) (x) (y) call.] addPathAfterAction.
].
turtle:circle=[|r;d|
    d=r * 0.1745328.
    !(d/2)backward.
    [!(d)forward 10 rightTurn] !36 repeat。
    !(d/2)forward
].
turtle:closePath=[
    [isPenDown]!then[
        //! (pos) (lineOrig) addPath.
        ! (lineOrig:x)(lineOrig:y)moveTo.
    ]execute.
    self.
].
turtle!"closePath" "close" addAlias.
turtle:lineColor=[|col|
	[col]!then[_lineCol=col]execute.
	this.
].
turtle:lineWidth=[|w|
    w=!(w)num.
    _lineWidth=w.this.
].
turtle:makeFigure=[|col;r|
    r=Figure ! (this) create.
    [col]! then[r!(col) paint]execute.
    r.
].
turtle:paint=[|col|
    !(col) makeFigure.
].
turtle:penDown=[
    [isPenDown]!then [] else [isPenDown=true. !newLineG] execute. 
    this
].
turtle:penUp=[isPenDown=false.this.].
turtle:setShape=[|url|
    self:img=url.
    url=[url ! "https?" match] ! then [url] else [baseURL+url] execute.
    element ! 0 get 
    "http://www.w3.org/1999/xlink" "href" 
    (url) setAttributeNS.
    ! (url) getImageSize.
    this.
].
turtle ! "setShape" "change" addAlias.
turtle:setTrans=[|;str|
    str="translate("+(pos:x)+" "+(pos:y)+") ".
    str=str+"rotate("+dir+") ".
    str=str+"scale("+_scalex+" "+(0-_scaley)+") ".
    element ! "transform" (str) attr
    "data-trans" ((pos:x)+","+(pos:y)+","+dir) attr.
    [isShowing] ! then [ ! checkCrash ] execute.
    this.
].
turtle:polygon=[|d n|
    [self!(d)forward(360/n)rightturn]!(n)repeat.
].
:action=[].
:action:isEventHandler=true.
:click=[].
:click:isEventHandler=true.
turtle:setAction=[|f|
    [(!(f)typeof)=="function"]!then[
        self:action=f.    
    ]execute.
    self.
].
*/
