import React,{ Component} from 'react'
import Grid from '../../component/grid'

class Demo extends Component {
    constructor(){
        super()
        const datasets = [];

        for (let i = 0; i < 3; i++) {
        datasets.push({
            id: `id-${i}`,
            name: `商品 ${i}`,
            uv: 20,
            stock: i > 1 ? 5 : null
        })
        }

        this.state={
            loading: false,
            column:[
                {
                  title: '商品名',
                  name: 'name',
                  width: '300px',
                }, {
                  title: '访问量',
                  name: 'uv',
                  width: '200px',
                }, {
                  title: '库存',
                  name: 'stock',
                  defaultText: 0,
                  width:'300px'
                }
              ],
            datasets,
            pageInfo:{
                current:1,
                pageSize:2,
                total:3,
            }
        }
    }

    handleClick(data, index, event){
        console.log(data, index, event.target, 'simple onRowClick')
    }
    triggleLoading(){
        const {loading} = this.state
        this.setState({
            ...this.state,
            loading: !loading
        })
    }
    render(){
        const { column,datasets,loading,pageInfo } = this.state
        return (
            <div className="GridDemo">
                <button onClick={this.triggleLoading.bind(this)}>开启/关闭loading</button>
                <Grid 
                    column={column}
                    datasets={datasets}
                    onRowClick={this.handleClick.bind(this)}
                    loading={loading}
                    pageInfo={pageInfo}
                />
            </div>
        )
    }
}

export default Demo