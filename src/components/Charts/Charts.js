
import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as apiActions from '../../actions/apiActions';

import {
    PieChart, Pie, Sector, Cell,
    RadialBarChart, RadialBar, Legend
  } from 'recharts';


class ChartsExport extends Component {

    constructor(props, context) {
        super(props, context);
               

    }

    componentDidMount(){
        this.props.actions.GetData();
    }
  

    render() {       
 console.log(this.props.data);
        const data01 = [
            { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
          ];
          const data02 = [
            { name: 'A1', value: 100 },
            { name: 'A2', value: 300 },
            { name: 'B1', value: 100 },
            { name: 'B2', value: 80 },
            { name: 'B3', value: 40 },
            { name: 'B4', value: 30 },
            { name: 'B5', value: 50 },
            { name: 'C1', value: 100 },
            { name: 'C2', value: 200 },
            { name: 'D1', value: 150 },
            { name: 'D2', value: 50 },
          ];

          const data = [
            {
              name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8',
            },
            {
              name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed',
            },
            {
              name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1',
            },
            {
              name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d',
            },
            {
              name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c',
            },
            {
              name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57',
            },
            {
              name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658',
            },
          ];
          
          const style = {
            top: 0,
            left: 350,
            lineHeight: '24px',
          };
        return (
            <div>
            <PieChart width={400} height={400}>
        <Pie data={data01} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
        <Pie data={data02} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
      </PieChart>
       <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
       <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
       <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
     </RadialBarChart>
     </div>
        );
    }
}

// ItemDetails.propTypes = {
//     items: PropTypes.array
// };



function mapStateToProps(state, ownProps) {
    // const itemId = ownProps.match.params.id; // fomr the path course/:id
    // let item = { id: '', name: '', date: '', price: 0, inStock: false, type: '' };

    // if (itemId && state.items.length > 0) {
    //     item = getItemById(state.items, itemId);
    // }
    console.log('mapstatetoprops');
    console.log(state);
    return {
        data: state.data        
    }
}
// function mapStateToProps(state, ownProps) {
//     return {
//         console.log(state);
//         itemTypes: state.itemTypes
//     };
// }

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(apiActions, dispatch)
}
)

export const Charts= connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartsExport)