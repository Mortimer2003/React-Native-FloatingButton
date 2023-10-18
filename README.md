# React-Native-FloatingButton
自主实现React Native悬浮球组件

**组件说明：**
* 该悬浮球可以点击与拖动；
* 可以防止拖动移出屏幕，松手会自动贴到靠近的左/右侧，并可以半吸附到左右侧；

**参数说明：**
* `handlePress`：处理点击事件的函数
* `size`：悬浮球大小，默认为50(px)
* `top`：悬浮球上边界限制（拖到上边界外会弹回上边界处）
* `bottom`：悬浮球下边界限制（拖到上边界外会弹回上边界处）

**使用示例：**
```jsx
<FloatingButton handlePress={handleOpenAI} size={50} bottom={scrollHeight} top={80}/>
```

**效果示例：**

![2023-10-18 15 23 33](https://github.com/Mortimer2003/React-Native-FloatingButton/assets/98103203/1b608254-063f-41ea-908b-b19edd5775b6)

