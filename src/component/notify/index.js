import React from "react";
import ReactDOM from 'react-dom';

import NotifyContainer from "./notifyContainer";

class Notify {
    static containerList = []
    static show(type,text,duration,callback){
        if(document.getElementsByClassName('Notify-container').length===0){
            let div = document.createElement('div')
            div.className = 'Notify-container'
            document.body.appendChild(div)
        }

            let container = document.createElement('div')
            let containerId=+new Date()
            this.containerList.push({container, containerId})

            ReactDOM.render(<NotifyContainer containerId={containerId} containerList={this.containerList} type={type} text={text} duration={duration} callback={callback.bind(this)} />, container)
            document.getElementsByClassName('Notify-container')[0].appendChild(container)
    }

  static info(text, duration, callback) {
      this.show('info',text,duration,callback)
  }

  static success(text, duration, callback) {
    this.show('success',text,duration,callback)
  }

  static error(text, duration, callback) {
    this.show('error',text,duration,callback)
  }

  static warn(text, duration, callback) {
    this.show('warn',text,duration,callback)
  }
}

export default Notify