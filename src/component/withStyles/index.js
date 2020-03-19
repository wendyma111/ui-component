import React, { Component } from "react";

const withStyles = (WrappedComponent, styles) => {
  if(WrappedComponent.prototype.__proto__.constructor.name==='Component'){
    // 如果是react类组件
    return class extends Component {
      componentDidMount() {
        const style = document.getElementsByTagName("style")[0];
        if (style.innerHTML.indexOf(WrappedComponent.name) === -1) {
          //用组件名加工类型 防止命名冲突
          const stylesArr = Array.from(styles).map(item => {
            return item === "." ? item + WrappedComponent.name + "-" : item;
          });
          style.innerHTML += stylesArr.join("");
        }
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  } else {
    const style = document.getElementsByTagName("style")[0];
        if (style.innerHTML.indexOf(WrappedComponent.name) === -1) {
          //用组件名加工类型 防止命名冲突
          const stylesArr = Array.from(styles).map(item => {
            return item === "." ? item + WrappedComponent.name + "-" : item;
          });
          style.innerHTML += stylesArr.join("");
        }
    return WrappedComponent
  }
  
};
export default withStyles;
