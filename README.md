yarn start 启动

自定义的ui组件库，用于学习，使用自定义的classes函数包装组件内部元素的className，避免全局冲突，使用自定义的withStyles高阶组件实现css in js

通过在app.js中引入要观察组件的demo进行效果演示，demo定义在demo文件夹下

-sortable   可排序组件
    /className   (string)——自定义类名
    /items       (Array)——用于排序的数组
    /onChange    (func(itemsAfterSort))——排序结束后触发的函数，将排序后的items传入该函数作为第一个参数

-grid   表格  
    /className   (string)——自定义类名
    /loading     (boolean)——显示加载中动画
    /column      (Array)——表格列配置           
    /datasets    (Array)——表格数据，必须具有id属性作为内置的key
    /pageInfo    (Object{pageSize, current, total})——翻页配置
    /onRowClick  (func(data, index))——当点击行时触发的函数,将本行数据及本行序列号作为该函数的参数

-Notify   轻提示
        /text	    (string)——通知文案
        /duration	(number)——持续时间
        /callback	(func)——关闭时的回调