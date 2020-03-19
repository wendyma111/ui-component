import React, { Component } from "react";
import withStyles from "../withStyles";
import classes from "../classes";

const gridStyles = `
    .grid {
        position:relative;
        display:inline-block;
    }
    .grid .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 100;
        background: rgba(255,255,255,30%)
    }
    .grid .mask img{
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        z-index: 101
    }
    .grid th{
        text-align:center;
        border-bottom: 1px solid #333;
    }
    .grid td{
        text-align:center;
        border-bottom: 1px solid #333;
    }
    .grid table tr {
        height: 40px;
    }
    .grid table thead tr {
        background: #838789;
    }
    .grid table tbody tr:hover {
        background: rgba(119,152,186,30%);
    }
    .not-allowed {
        cursor: not-allowed!important;
    }
    .grid input{
        width:20px;
    }
    .grid span{
        margin-left: 5px;
        cursor: pointer;
    }
    .hover:hover {
        text-decoration:underline
    }
    .choosen {
        color: blue;
    }
`;

class Grid extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataContainer: [],
      pageInfo: {},
      shownPage: []
    };
  }

  componentWillMount() {
    const { datasets, pageInfo = {} } = this.props;

    if (JSON.stringify(pageInfo) === "") {
      //如果pageinfo是空对象的话
      this.setState({
        ...this.state,
        data: datasets
      });
    } else {
      this.setState(
        {
          ...this.state,
          pageInfo
        },
        () => {
          const { pageInfo, shownPage, dataContainer } = this.state;
          const { current, pageSize, total } = pageInfo;

          for (let i = 0; i < Math.ceil(total / pageSize); i++) {
            dataContainer[i] = [];
            for (let j = i * pageSize; j < (i + 1) * pageSize; j++) {
              if (datasets[j] === undefined) break;
              dataContainer[i].push(datasets[j]);
            }
          }

          const max =
            Number(current) + 5 > Math.ceil(total / pageSize)
              ? Math.ceil(total / pageSize) + 1
              : Number(current) + 5;

          for (let k = current; k < max; k++) {
            shownPage.push(k);
          }

          this.setState({
            ...this.state,
            data: dataContainer[current - 1],
            shownPage,
            dataContainer
          });
        }
      );
    }
  }

  handleClick(data, index, event) {
    const { onRowClick } = this.props;
    onRowClick(data, index, event);
  }

  changePage(ev) {
    let { pageInfo, shownPage } = this.state;
    const inner = ev.target.innerHTML;

    if (isNaN(Number(inner))) {
      //说明是< >

      if (inner === "&lt;") {
        // 注意<号在代码中呈现的形式

        if (pageInfo.current - 1 === shownPage[0] - 1) {
          shownPage.pop();
          shownPage.unshift(shownPage[0] - 1);
        }
        this.setState({
          ...this.state,
          pageInfo: {
            ...pageInfo,
            current: pageInfo.current - 1
          },
          data: this.state.dataContainer[pageInfo.current - 1 - 1],
          shownPage
        });
      } else {
        if (pageInfo.current - 0 + 1 === shownPage[shownPage.length - 1] + 1) {
          shownPage.shift();
          shownPage.push(shownPage[shownPage.length - 1] - 0 + 1);
        }
        this.setState({
          ...this.state,
          pageInfo: {
            ...pageInfo,
            current: pageInfo.current - 0 + 1
          },
          data: this.state.dataContainer[pageInfo.current - 0],
          shownPage
        });
      }
    } else {
      this.setState({
        ...this.state,
        pageInfo: {
          ...pageInfo,
          current: inner - 0
        },
        data: this.state.dataContainer[inner - 1],
        shownPage
      });
    }
  }

  keypress(ev) {
    const { total, pageSize } = this.state.pageInfo;
    if (ev.keyCode === 13) {
      const that = this;
      const value = this.refs.input.value;
      if (
        value.trim() !== "" &&
        value <= Math.ceil(total / pageSize) &&
        value >= 1
      ) {
        that.setState(
          {
            ...that.state,
            pageInfo: {
              ...that.state.pageInfo,
              current: value
            },
            data: this.state.dataContainer[value - 1]
          },
          () => {
            let { shownPage, pageInfo } = this.state;
            const { current, pageSize, total } = pageInfo;
            if (
              current < shownPage[0] ||
              current > shownPage[shownPage.length - 1]
            ) {
              shownPage = [];

              const max =
                Number(current) + 5 > Math.ceil(total / pageSize)
                  ? Math.ceil(total / pageSize) + 1
                  : Number(current) + 5;
              for (let i = this.state.current; i < max; i++) {
                shownPage.push(i);
              }
              this.setState({
                ...this.state,
                shownPage
              });
            }
          }
        );
      }
    }
  }

  focus(ev) {
    document.addEventListener("keypress", this.keypress.bind(this));
  }

  blur() {
    document.removeEventListener("keypress", this.keypress.bind(this));
  }

  render() {
    const { column, loading } = this.props;
    const { data, pageInfo, shownPage } = this.state;
    const { current } = pageInfo;

    return (
      <div className={classes(this, "grid")}>
        <div
          style={{ display: loading ? "block" : "none" }}
          className={classes(this, "mask")}
        >
          <img src="../../../loading.gif" alt="LOADING" />
        </div>
        <table cellSpacing={0}>
          <thead>
            <tr>
              {column.map(item => {
                return (
                  <th key={item.name} style={{ width: item.width }}>
                    {item.title === undefined ? item.defaultText : item.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr
                  key={item.id}
                  onClick={this.handleClick.bind(this, item, index)}
                >
                  {column.map(rowItem => {
                    return (
                      <td key={rowItem.name} style={{ width: item.width }}>
                        {item[rowItem.name]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {JSON.stringify(pageInfo) !== "" && (
          <div className="page">
            共{Math.ceil(pageInfo.total / pageInfo.pageSize)}页
            <span
              className={current-0 !== 1 ? "" : classes(this, "not-allowed")}
              onClick={current-0 !== 1 ? this.changePage.bind(this) : () => {}}
            >
              {"<"}
            </span>
            {shownPage.map(item => (
              <span
                key={item}
                className={
                  item === current - 0
                    ? classes(this, "choosen", "hover")
                    : classes(this, "hover")
                }
                onClick={this.changePage.bind(this)}
              >
                {item}
              </span>
            ))}
            <span
              className={
                current-0 !== Math.ceil(pageInfo.total / pageInfo.pageSize)
                  ? ""
                  : classes(this, "not-allowed")
              }
              onClick={
                current-0 !== Math.ceil(pageInfo.total / pageInfo.pageSize)
                  ? this.changePage.bind(this)
                  : () => {}
              }
            >
              {">"}
            </span>
            跳至
            <input
              ref="input"
              onFocus={this.focus.bind(this)}
              onBlur={this.blur.bind(this)}
              type="text"
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(Grid, gridStyles);
