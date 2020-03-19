import React, { Component } from "react";
import withStyles from "../withStyles";
import classes from '../classes'
// items: 用于排序的数组；onChange：排序完成发生的回调函数
const sortableStyles = `
  .sortable {
    display: inline-block;
  }
  .sortable>div {
    display: inline-block;
  }
`

class Sortable extends Component {
  drag(ev) {
    ev.dataTransfer.setData("target", ev.target.getAttribute("data-id"));
  }
  drop(ev) {
    const { items, onChange } = this.props;
    ev.preventDefault();
    const index = ev.dataTransfer.getData("target");
    const target = document.querySelector(`div[data-id="${index}"]`);
    const children = Array.from(target.parentNode.children);
    const targetIndex = children.indexOf(target);
    const dropIndex = children.indexOf(ev.target.parentNode);
    if (targetIndex === children.length - 1) {
      target.parentNode.appendChild(children[dropIndex]);
    } else {
      target.parentNode.insertBefore(
        children[dropIndex],
        children[targetIndex + 1]
      );
    }
    if (dropIndex === children.length - 1) {
      target.parentNode.appendChild(children[targetIndex]);
    } else {
      target.parentNode.insertBefore(
        children[targetIndex],
        children[dropIndex + 1]
      );
    }
    const target_arr = items[targetIndex];
    const drop_arr = items[dropIndex];
    items.splice(targetIndex, 1, drop_arr);
    items.splice(dropIndex, 1, target_arr);

    onChange(items);
  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  render() {
    const { children, className = '',items} = this.props;
    return (
      <div className={classes(this,'sortable') + ' ' + className}>
        {items.map((item, index) => {
          return (
            <div
              key={item}
              draggable="true"
              data-id={index}
              onDragStart={this.drag.bind(this)}
              onDragOver={this.allowDrop.bind(this)}
              onDrop={this.drop.bind(this)}
            >
            {React.Children.map(children,itemChild=>{
              return (itemChild.key === item || itemChild.key === item+'' )&& itemChild
            })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(Sortable,sortableStyles);
