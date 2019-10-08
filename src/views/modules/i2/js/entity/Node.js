export function Node(network, node) {
  $.extend(
    this,
    {
      fontSize: 12,
      size: 35,
      colorCode: undefined,
      shapeProperties: { useBorderWithImage: false },
      previousState: "",
      currentState: ""
    },
    {}
  );
  this.init = function() {
    this.initPosition();
  };
  /**
   * 节点位置初始化为父节点位置
   */
  this.initPosition = function() {
    if (this.x && this.y) {
      this.physics = false;
      return;
    }
    if (!this.pid || this.pid === "") {
      return;
    }

    var arr = [this.pid];
    var pos = network.getPositions(arr);
    if (pos[this.pid]) {
      this.x =
        pos[this.pid].x +
        10; /* 避免单个新节点时，位置覆盖在父节点之上 LGG 2017-02-20 */
      this.y = pos[this.pid].y;
    }
  };
  this.init();
}
