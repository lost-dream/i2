import global from "@/utils/global";
import { addOrUpdateNode } from "./common";
/**
 * 将节点固定于窗口中心
 * @param _nodes
 */
export function centerNodes(_nodes) {
  // console.log($(container))
  var arr = [];
  for (var i in _nodes) {
    var node = global.nodes.get(_nodes[i]);
    node.x = _XconvertDOMtoCanvas($(global.container).width() / 2);
    node.y = _YconvertDOMtoCanvas($(global.container).height() / 2);
    node.physics = false;
    //    console.log(node.x + ":"+ node.y)
    arr.push(node);
  }

  addOrUpdateNode(arr, false, true);
}
function _XconvertDOMtoCanvas(x) {
  return (
    (x - global.network.canvas.body.view.translation.x) /
    global.network.canvas.body.view.scale
  );
}
function _YconvertDOMtoCanvas(y) {
  return (
    (y - global.network.canvas.body.view.translation.y) /
      global.network.canvas.body.view.scale -
    60 / global.network.canvas.body.view.scale
  );
}
