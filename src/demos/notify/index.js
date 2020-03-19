import React,{Component} from 'react'
import Notify from '../../component/notify'

class Demo extends Component{
    render(){
        return (
            <div className="NotifyDemo">
                <button onClick={()=>{Notify.info('常规',1000,()=>{console.log('info')})}}>info</button>
                <button onClick={()=>{Notify.success('成功',1000,()=>{console.log('success')})}}>success</button>
                <button onClick={()=>{Notify.error('错误',1000,()=>{console.log('error')})}}>error</button>
                <button onClick={()=>{Notify.warn('警告',1000,()=>{console.log('warn')})}}>warn</button>
            </div>
        )
    }
}

export default Demo