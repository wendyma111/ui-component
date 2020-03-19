import React,{ Component } from "react";
import Sortable from '../../component/sortable'
import withStyles from "../../component/withStyles";
import classes from '../../component/classes'


const sortableDemoStyles = `
.child {
    width: 100px;
    height: 100px;
    text-align: center;
    margin: 0 20px 20px 0;
    border: 1px solid #333;
    font-size: 20px;
    line-height: 100px;
  }
`

class Demo extends Component {
    constructor(){
        super()
        this.state={
          //list的内容是唯一的，且用来做渲染元素的key
          list:[1,2,3,4,'+']
        }
      }
      handleChange(items){
        console.log(items)
      }
      handleClick(ev){
        const {list} = this.state
        let temp = list.map(item=>typeof item==='number'&&item)
        list.splice(list.length-1,0,Math.max.apply(Math,temp)+1)
        this.setState({
          list
        })
      }
      render(){
        const {list} = this.state
        return (
          <div className="SortableDemo">
            <Sortable
              items={list}
              onChange={this.handleChange.bind(this)}
              className='test'
            >
              {list.map(item=>{
               return item==='+'?(
                  <div className={classes(this,'child')} key={item} onClick={this.handleClick.bind(this)}>{item}</div>
               ):(
                  <div className={classes(this,'child')} key={item}>
                  {item}
                  </div>)
              })}
            </Sortable>
          </div>
        );
      }
      
}

export default withStyles(Demo,sortableDemoStyles)