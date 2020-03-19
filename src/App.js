import React,{Component} from 'react';
import './App.css';
import NotifyDemo from './demos/notify'
import GridDemo from './demos/grid'
import SortableDemo from './demos/sortable'

class App extends Component {
  render(){
    return(
      <div className="App">
        <h3>notify组件（函数组件）——点击下列按钮测试</h3>
        <NotifyDemo />
        <hr />
        <br />
        <h3>grid组件——开启/关闭loading按钮仅为展示loading功能所用，并得组件内部组成部分</h3>
        <GridDemo />
        <hr />
        <br />
        <h3>sortable组件——可拖拽任意卡片交换位置，➕卡片用于新增卡片</h3>
        <SortableDemo />
        <hr />
      </div>
    )
  }
}

export default App;
