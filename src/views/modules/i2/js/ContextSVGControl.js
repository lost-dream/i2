export function ContextSVGControl(params) {
  $.extend(
    this,
    {
      nodes: [],
      edges: [],
      event: {},
      svg: null,
      symbolsContainer: null,
      itemsContainer: null,
    },
    params,
  )

  this.options = {
    svgns: 'http://www.w3.org/2000/svg',
    xlinkns: 'http://www.w3.org/1999/xlink',
    nbOfSlices: 8, // 菜单个数
    typeOfCircle: 'fullCircle', // fullCircle,semiCircle 菜单样式：满环/半环
    menuCenter: {
      // 中心位置
      x: 115,
      y: 115,
    },
    menuRadius: 0, // 外圆半径
    menuSmallRadius: 0, // 内圆半径
    iconPos: 0, // 图标位置
    iconWidth: 40, // 图标宽度
    iconHeight: 40, // 图标高度
    iconArea: {}, // 图标寻址区域
    angle: 0, // 单个菜单项扇形大小
    pizzaCoordinates: {}, // 内圆扇形点位
    pieCoordinates: {}, // 外圆扇形点位
  }

  /**
   * 初始化参数
   */
  this.setOptions = function(_options) {
    this.options.menuRadius = this.options.menuCenter.x
    this.options.iconPos = 0.7 * this.options.menuRadius
    this.options.menuSmallRadius = (0.7 * this.options.menuRadius) / 2
    this.options = $.extend(this.options, _options)
  }
  /**
   * 设置菜单个数
   */
  this.setSlicesNumber = function(nbOfSlices) {
    this.options.nbOfSlices = nbOfSlices
  }

  this.init = function() {
    removeSVGContextMenu()
    var items = this.getMenuItems()
    if (!items || items.length < 1) return
    this.setOptions(params)
    this.setSlicesNumber(items.length)
    this.showContext()

    this.generateMenu(items)

    /*
		this.showContext();
		this.showItems();

		this.event.returnValue = false;	//取消系统菜单显示 */
  }

  this.generateMenu = function(items) {
    var op = this.options
    this.getAngle()
    this.getCoordinates(op.menuRadius, op.pizzaCoordinates)
    this.getCoordinates(op.menuSmallRadius, op.pieCoordinates)
    this.getIconArea()
    this.drawSectors(items)
    //		this.rotateItems();
    //		this.addIcons();
  }

  /**
   * 计算每个菜单项扇形大小
   */
  this.getAngle = function() {
    var n = this.options.nbOfSlices
    var t = this.options.typeOfCircle
    if (t == 'semiCircle') {
      this.options.angle = 180 / n
    } else if (t == 'fullCircle') {
      this.options.angle = 360 / n
    }
  }

  /**
   * 坐标计算
   */
  this.getCoordinates = function(radius, coordinates) {
    var s = (-this.options.angle * Math.PI) / 180
    var a = this.options.menuCenter.x + radius * Math.cos(s)
    var o = this.options.menuCenter.y + radius * Math.sin(s)
    coordinates.x = a
    coordinates.y = o
  }

  /**
   * 图标区域计算
   */
  this.getIconArea = function() {
    var s = {}
    var op = this.options
    if (op.angle > 90) {
      s.x =
        op.pizzaCoordinates.x +
        (2 * op.menuRadius - op.pizzaCoordinates.x) / 2 +
        50
      s.y =
        op.pizzaCoordinates.y + (op.menuRadius - op.pizzaCoordinates.y) / 2 - 50
    } else {
      s.x =
        op.pizzaCoordinates.x + (2 * op.menuRadius - op.pizzaCoordinates.x) / 2
      s.y = op.pizzaCoordinates.y + (op.menuRadius - op.pizzaCoordinates.y) / 2
    }
    this.options.iconArea = s
  }

  /**
   * 画菜单
   */
  this.drawSectors = function(items) {
    for (var n = 0; this.options.nbOfSlices > n; n++) {
      var aItem = this.createAItem(n)
      this.rotateItem(aItem, n)
      //			this.addIcon(aItem, n, null, (function(control){return function(){control.addTaggingItem()}})(this));
      this.addIcon(aItem, n, items[n])
      this.itemsContainer.appendChild(aItem)
    }
  }

  /**
   * 创建<a>标签容器，每个菜单按钮一个<a>容器，容器包括菜单形状路径、图标引用
   */
  this.createAItem = function(index) {
    var op = this.options
    var aItem = document.createElementNS(op.svgns, 'a')
    aItem.setAttribute('class', 'item')
    aItem.setAttribute('id', 'item-' + (index + 1))
    aItem.setAttribute('role', 'link')
    aItem.setAttribute('tabindex', '0')
    aItem.setAttributeNS(op.xlinkns, 'xlink:href', ' '),
      aItem.setAttributeNS(op.xlinkns, 'xlink:title', ' ')
    var s = document.createElementNS(op.svgns, 'path')
    s.setAttribute('fill', 'none')
    // s.setAttribute("stroke", "#111"),
    s.setAttribute(
      'd',
      'M' +
        (op.menuCenter.x + op.menuSmallRadius) +
        ',' +
        op.menuCenter.y +
        ' l' +
        (op.menuRadius - op.menuSmallRadius) +
        ',0 A' +
        op.menuRadius +
        ',' +
        op.menuRadius +
        ' 0 0,0 ' +
        op.pizzaCoordinates.x +
        ',' +
        op.pizzaCoordinates.y +
        ' l' +
        -(op.pizzaCoordinates.x - op.pieCoordinates.x) +
        ',' +
        (-op.pizzaCoordinates.y + op.pieCoordinates.y) +
        ' A' +
        op.menuSmallRadius +
        ',' +
        op.menuSmallRadius +
        ' 0 0,1 ' +
        (op.menuCenter.x + op.menuSmallRadius) +
        ',' +
        op.menuCenter.y,
    )
    s.setAttribute('class', 'sector')
    aItem.appendChild(s)
    return aItem
  }

  /**
   * 旋转<a>标签菜单，使形成环形
   */
  this.rotateItem = function(aItem, index) {
    var itemRotate = -this.options.angle * index
    aItem.setAttribute(
      'transform',
      'rotate(' +
        itemRotate +
        ' ' +
        this.options.menuCenter.x +
        ' ' +
        this.options.menuCenter.y +
        ')',
    )
    aItem.removeAttribute('style')
  }

  /**
   * 执行点击事件
   */
  this.doCallback = function(fn, args) {
    fn.apply(this, args)
  }

  /**
   * 为菜单添加图标及文字、点击事件
   */
  this.addIcon = function(aItem, index, menuItem) {
    var op = this.options
    var this_ = this
    var callback = menuItem.action
    var subMenu = menuItem.submenu
    var iconRotate = op.angle * index
    var subMenuRotate = op.angle < 90 ? iconRotate : iconRotate + 30
    // 点击事件
    aItem.onclick = function(event) {
      event.preventDefault()
      removeSVGContextMenu()
      if (callback && typeof callback === 'function') {
        this_.doCallback(callback, event)
      }
    }

    // 显示二级菜单
    aItem.onmouseenter = function(event) {
      event.preventDefault()
      if (subMenu && subMenu.length > 0) {
        if (this_.nodeId) {
        } else if (this_.edgeId) {
        }
      }
    }

    //		aItem.onmouseover = function(event){
    //			event.preventDefault();
    //			removeSubSVGContextMenu();
    //			if(subMenu && subMenu.length > 0){
    //				if(this_.nodeId){
    //					new NodeSubContextSVGControl(this_.nodeId, subMenu,iconRotate,params);
    //				}
    //			}
    //		}

    var path = document.createElementNS(op.svgns, 'path')
    path.setAttribute(
      'd',
      'M' +
        op.menuCenter.x +
        ',' +
        op.menuCenter.y +
        ' L' +
        op.iconArea.x +
        ',' +
        op.iconArea.y,
    )
    // path.setAttribute("stroke", "orange");
    var l = path.getPointAtLength(op.iconPos)

    var use = document.createElementNS(op.svgns, 'use')
    use.setAttributeNS(op.xlinkns, 'xlink:href', '#icon-' + (index + 1))
    use.setAttribute('width', op.iconWidth)
    use.setAttribute('height', op.iconHeight)
    use.setAttribute('x', l.x - use.getAttribute('width') / 2)
    use.setAttribute('y', l.y - use.getAttribute('height') / 2)
    // u.setAttribute("transform", "rotate(" + (90 - angle + angle / 2) + " " + l.x + " " + l.y + ")"),//图标以圆心为中心旋转
    use.setAttribute(
      'transform',
      'rotate(' + iconRotate + ' ' + l.x + ' ' + l.y + ')',
    ) // 图标以水平线为中心旋转
    aItem.appendChild(use)

    var c = document.createElementNS(op.svgns, 'symbol')
    c.setAttribute('class', 'icon icon-')
    c.setAttribute('id', 'icon-' + (index + 1))
    c.setAttribute('viewBox', '0 0 ' + op.iconWidth + ' ' + op.iconHeight)

    var icon = menuItem.icon
    var title = menuItem.title
    if (!icon || icon == '') {
      icon =
        'M30.478 18.061c0.088-0.65 0.138-1.311 0.138-1.983 0-8.072-6.579-14.617-14.694-14.617-0.806 0-1.597 0.066-2.367 0.192-1.38-0.899-3.021-1.423-4.788-1.423-4.845 0-8.768 3.925-8.768 8.769 0 1.762 0.519 3.4 1.412 4.774-0.12 0.751-0.182 1.52-0.182 2.304 0 8.073 6.576 14.618 14.693 14.618 0.916 0 1.808-0.089 2.675-0.246 1.347 0.836 2.933 1.322 4.634 1.322 4.844 0 8.768-3.926 8.768-8.77-0-1.831-0.56-3.533-1.522-4.94zM17.296 26.85c-4.669 0.243-6.854-0.79-8.856-2.668-2.235-2.098-1.337-4.491 0.484-4.613 1.82-0.122 2.913 2.063 3.884 2.671 0.97 0.605 4.662 1.985 6.612-0.244 2.123-2.427-1.412-3.683-4.004-4.063-3.7-0.548-8.372-2.55-8.008-6.494 0.364-3.942 3.349-5.963 6.491-6.248 4.005-0.364 6.612 0.607 8.674 2.366 2.384 2.033 1.094 4.306-0.425 4.489-1.513 0.182-3.213-3.344-6.549-3.397-3.439-0.054-5.764 3.579-1.518 4.612 4.248 1.032 8.797 1.455 10.435 5.339 1.639 3.884-2.547 8.008-7.22 8.251z'
    }
    if (icon instanceof Array) {
      for (var i = 0, len = icon.length; i < len; i++) {
        c.appendChild(this.createIconElement(icon[i]))
      }
    } else {
      c.appendChild(this.createIconElement(icon))
    }

    if (title) {
      c.appendChild(this.createIconTitleElement(title))
    }

    this.symbolsContainer.appendChild(c)
  }

  this.createIconElement = function(icon) {
    var op = this.options
    var iconItem = document.createElementNS(op.svgns, 'path')
    iconItem.setAttribute('d', icon)
    return iconItem
  }
  this.createIconTitleElement = function(title) {
    var op = this.options
    var titleItem = document.createElementNS(op.svgns, 'text')
    titleItem.setAttribute('fill', '#fff')
    titleItem.setAttribute('text-anchor', 'middle')
    titleItem.setAttribute('x', op.iconWidth / 2)
    titleItem.setAttribute('y', op.iconHeight * 1.2)
    titleItem.textContent = title
    return titleItem
  }

  this.getMenuItems = function() {
    // 子类中实现
  }

  this.getCurrentNode = function() {
    return nodes.get(this.nodeId)
  }

  this.showContext = function() {
    $(document.body).append(this.getHtmlTpml())

    /**
     * 修正右键菜单显示位置
     * 根据当前点击节点的DOM位置作为中心
     * LGG 2017-3-8
     */
    //		this.getMenuContainer().css("left", this.event.clientX-this.options.menuCenter.x -2);
    //		this.getMenuContainer().css("top", this.event.clientY-this.options.menuCenter.y -2);
    //		FIXME 获取当前节点的坐标，应该可以直接获取到，而非通过network.getPositions()方式
    if (this.nodeId) {
      this.position = getDomPointer(
        network.getPositions(this.nodeId)[this.nodeId],
      )
    } else {
      this.position = {
        x: this.event.clientX,
        y: this.event.clientY,
      }
    }
    this.getMenuContainer().css(
      'left',
      this.position.x - this.options.menuCenter.x - 2,
    )
    this.getMenuContainer().css(
      'top',
      this.position.y - this.options.menuCenter.y - 2,
    )

    //		end
    this.svg = document.getElementById('svgmenu')
    this.symbolsContainer = document.getElementById('symbolsContainer')
    this.itemsContainer = document.getElementById('itemsContainer')
    $(this.symbolsContainer).empty()
    $(this.itemsContainer).empty()
    this.event.preventDefault()
  }

  this.getMenuContainer = function() {
    var contextMenu = $('#svgmenu-wrapper')
    return contextMenu
  }

  this.getHtmlTpml = function() {
    var menuWidth = this.options.menuCenter.x * 2 + 4
    var menuHeight = this.options.menuCenter.y * 2 + 4
    var html =
      '<div id="svgmenu-wrapper" style="width:' +
      menuWidth +
      ';height:' +
      menuHeight +
      ';position: absolute;z-index:1001"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-2 -2 ' +
      menuWidth +
      ' ' +
      menuHeight +
      '" id="svgmenu">' +
      '<g id="symbolsContainer"></g>' +
      '<g id="itemsContainer"></g>' +
      '</svg></div>'

    return html
  }

  //	this.init();
}

function removeSVGContextMenu() {
  if ($('#svgmenu-wrapper')) {
    $('#svgmenu-wrapper').remove()
  }
  removeSubSVGContextMenu()
}
