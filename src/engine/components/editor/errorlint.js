var GUTTER_ID = "CodeMirror-lint-markers";

function showTooltip(cm, e, content) {
  let tt = document.createElement("div");
  tt.className = "CodeMirror-lint-tooltip";
  tt.appendChild(content.cloneNode(true));
  document.body.appendChild(tt);

  function position(e) {
    if (!tt.parentNode){
      //return cm.off(document, "mousemove", position);
      document.onmouseover = null;
    }
    tt.style.top = Math.max(0, e.clientY - tt.offsetHeight - 5) + "px";
    tt.style.left = (e.clientX + 5) + "px";
  }
  //cm.on(document, "mousemove", position);
  document.onmouseover = position;
  position(e);
  if (tt.style.opacity != null) tt.style.opacity = 1;
  return tt;
}
function rm(elt) {
  if (elt.parentNode) elt.parentNode.removeChild(elt);
}
function hideTooltip(tt) {
  if (!tt.parentNode) return;
  if (tt.style.opacity == null) rm(tt);
  tt.style.opacity = 0;
  setTimeout(function() { rm(tt); }, 600);
}

function showTooltipFor(cm, e, content, node) {
  let tooltip = showTooltip(cm,e, content);
  function hide() {
    //cm.off(node, "mouseout", hide);
    node.onmouseout = null;
    if (tooltip) { hideTooltip(tooltip); tooltip = null; }
  }
  let poll = setInterval(function() {
    if (tooltip) for (let n = node;; n = n.parentNode) {
      if (n && n.nodeType === 11) n = n.host;
      if (n === document.body) return;
      if (!n) { hide(); break; }
    }
    if (!tooltip) return clearInterval(poll);
  }, 400);
  //cm.on(node, "mouseout", hide);
  node.onmouseout = hide;
}

function clearMarks(cm) {
  /*let state = cm.state.lint;
  if (state && state.hasGutter) cm.clearGutter(GUTTER_ID);
  for (var i = 0; i < state.marked.length; ++i)
    state.marked[i].clear();
  state.marked.length = 0;*/
}

function makeMarker(cm, labels, severity, multiple, tooltips) {
  let marker = document.createElement("div"), inner = marker;
  marker.className = "CodeMirror-lint-marker-" + severity;
  if (multiple) {
    inner = marker.appendChild(document.createElement("div"));
    inner.className = "CodeMirror-lint-marker-multiple";
  }

  if (tooltips !== false){
    inner.onmouseover = function(e) {
      showTooltipFor(cm, e, labels, inner);
    }
  }
  return marker;
}

export default {
  GUTTER_ID,
  makeMarker,
  clearMarks,
  marked : []
}