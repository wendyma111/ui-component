import React, { useEffect,useRef, useCallback } from "react";
import withStyles from "../withStyles";
import ReactDOM from 'react-dom';

const NotifyContainerStyles = `
.notify {
    text-align: center;
    position: fixed;
    z-index: 100;
    left: 50%;
    top:0px;
    transform: translateX(-50%);
    width: 150px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #3e3e3e;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 5px 5px 15px rgba(0,0,0,10%);
    background:#fff;
}

.notify img {
    margin-top:10px;
    margin-left:10px;
    width:20px;
    height:20px;
    float:left;
}
`;
//props:{type,text,duration,callback}
function NotifyContainer(props) {
    
    let notify = useRef()
    let animation = null
    let top = 0
    const appear=useCallback(()=>{
        notify.current.style.top = notify.current.style.top.substring(0,notify.current.style.top.length-2)-0+10+'px'
        //console.log(notify.current.style.top.substring(0,notify.current.style.top.length-2)-0>=top+50)
        if((notify.current.style.top.substring(0,notify.current.style.top.length-2)-0)>=top+50){
            cancelAnimationFrame(animation)
            console.log('end')
        }else{
            animation = requestAnimationFrame(appear)
        }             
    },[notify,top])


    const disappear = useCallback(()=>{
            notify.current.style.top =  notify.current.style.top.substring(0,notify.current.style.top.length-2)-10+'px'
    
            if((notify.current.style.top.substring(0,notify.current.style.top.length-2)-0) <= 0){
                cancelAnimationFrame(animation)
                const {container:targetContainer} = props.containerList.find(item=>item.containerId === props.containerId)
                ReactDOM.unmountComponentAtNode(targetContainer)
                document.getElementsByClassName('Notify-container')[0].removeChild(targetContainer)
            }else{
                animation = requestAnimationFrame(disappear)
            }
    },[notify,top,props])

    useEffect(()=>{
        top = (document.getElementsByClassName("NotifyContainer-notify").length - 1) * 50
        notify.current.style.top = top + "px"
        appear()
        setTimeout(()=>{
            disappear()
            props.callback()
        },props.duration)
    },[appear,disappear,props])

  return (
    <div ref={notify} className='NotifyContainer-notify'>
      <img src={`../../../notify/${props.type}.jpg`} alt={props.type} />
      {props.text}
    </div>
  );
}

export default withStyles(NotifyContainer, NotifyContainerStyles)
