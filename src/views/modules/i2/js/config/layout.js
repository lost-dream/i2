/**
 * 分层布局
 */
export default {
  layout: {
    randomSeed: 1,
    improvedLayout: true,
    hierarchical: {
      enabled: false,
      levelSeparation: 150,
      nodeSpacing: 100,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: 'UD', // UD, DU, LR, RL
      sortMethod: 'hubsize', // hubsize, directed
    },
  },
}
