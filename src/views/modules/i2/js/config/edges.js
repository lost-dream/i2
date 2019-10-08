export default {
  edges: {
    // 箭头 arrow,bar ,circle
    arrows: {
      to: { enabled: true, scaleFactor: 0.5, type: "arrow" },
      middle: { enabled: false, scaleFactor: 1, type: "bar" },
      from: { enabled: false, scaleFactor: 1, type: "arrow" }
    },
    // 当为false时，关系线会在箭头处断开
    arrowStrikethrough: false,
    // 在节点上选择或悬停将根据默认情况改变它和标签的特性
    chosen: true,
    // 边缘颜色对象
    color: {
      color: "#c58e64",
      highlight: "#e58628",
      hover: "#e58628",
      inherit: "from",
      opacity: 1.0
    },
    // 当为true时，边沿将绘制为虚线
    dashes: false,
    // 此对象定义标签的详细信息
    font: {
      color: "#fff",
      size: 11, // px
      face: "Microsoft Yahei",
      strokeWidth: 0
    },
    // 决定边缘在选择边缘时的宽度
    selectionWidth: 1,
    // 平滑曲线
    smooth: {
      enabled: true,
      type: "continuous",
      roundness: 0.5
    }
  }
};
