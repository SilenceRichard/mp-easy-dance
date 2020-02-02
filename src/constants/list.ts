export const PAGE_SIZE = 10;

/**mescroll 配置项 */

export const DOWN_OPTION = {
  use: true, // 是否启用下拉刷新; 默认true
  auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
  autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
  isLock: false, // 是否锁定下拉刷新,默认false;
  offset: 80, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
  fps: 80, // 下拉节流 (值越大每秒刷新频率越高)
  inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
  outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
  bottomOffset: 20, // 当手指touchmove位置在距离body底部20upx范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
  minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
  textInOffset: "下拉刷新", // 下拉的距离在offset范围内的提示文本
  textOutOffset: "释放更新", // 下拉的距离大于offset范围的提示文本
  textLoading: "加载中 ..." // 加载中的提示文本
}

export const UP_OPTION = {
  use: true, // 是否启用上拉加载; 默认true
  auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
  isLock: false, // 是否锁定上拉加载,默认false;
  isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
  isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
  page: {
    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
    size: PAGE_SIZE, // 每页数据的数量
    time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
  },
  noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
  offset: 80, // 距底部多远时,触发upCallback
  textLoading: "加载中 ...", // 加载中的提示文本
  textNoMore: "-- 没有更多啦 --", // 没有更多数据的提示文本
  toTop: {
    // 回到顶部按钮,需配置src才显示
    src: "http://www.mescroll.com/img/mescroll-totop.png", // 图片路径
    offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
    duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
    zIndex: 9990, // fixed定位z-index值
    left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取mescroll-uni.vue的safearea值)
    width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    radius: "50%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
  },
  empty: {
    use: true, // 是否显示空布局
    icon: "http://www.mescroll.com/img/mescroll-empty.png", // 图标路径
    tip: "~ 暂无相关数据 ~", // 提示
    btnText: "去逛逛 >", // 按钮
    fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效
    top: "35%", // fixed定位的top值 (完整的单位值,如 "35%"; "300upx")
    zIndex: 99 // fixed定位z-index值
  },
  onScroll: true // 是否监听滚动事件, 默认false (配置为true时,可@scroll="scroll"获取到滚动条位置和方向)
}