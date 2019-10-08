/**
 * 节点
 */
export default {
  nodes: {
    borderWidth: 1,
    borderWidthSelected: 2,
    brokenImage: undefined,
    chosen: true,
    color: {
      border: "#2B7CE9",
      background: "#97C2FC",
      highlight: {
        border: "#2B7CE9",
        background: "#D2E5FF"
      },
      hover: {
        border: "#2B7CE9",
        background: "#D2E5FF"
      }
    },
    // 此对象定义标签的详细信息
    font: {
      color: "#fff",
      size: 12, // px
      face: "Microsoft Yahei",
      background: "none",
      strokeWidth: 0
    },
    shape: "dot",
    shapeProperties: {
      borderDashes: false, // only for borders
      borderRadius: 6, // only for box shape
      interpolation: false, // only for image and circularImage shapes
      useImageSize: false, // only for image and circularImage shapes
      useBorderWithImage: false // only for image shape
    },
    size: 18
  }
};
