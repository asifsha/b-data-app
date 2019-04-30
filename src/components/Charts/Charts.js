
import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as apiActions from '../../actions/apiActions';

import {
  PieChart, Pie, Sector, Cell,
  RadialBarChart, RadialBar, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
  ScatterChart, Scatter, ZAxis,
} from 'recharts';


import Tree from 'react-d3-tree';



export class ChartsExport extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedOption: null,
    }

  }

  componentDidMount() {
    if(this.props.actions!==undefined)
    this.props.actions.GetData();
  }




  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }


  render() {
    console.log(this.props.data);

    const { selectedOption } = this.state;

    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ];


    return (
      <div >


        <div id="treeWrapper" style={{ width: '75em', height: '50em', overflow: 'scroll' }}>

          <Tree data={this.props.data} useCollapseData={true}
            translate={{ x: 150, y: 250 }}
            styles={
              {
                links: { stroke: '#FFFFFF' },
                nodes: {
                  node: {
                    circle: { stroke: '#FFFFFF', fill: '#FFFFFF' },
                    name: { stroke: '#FFFFFF', fill: '#FFFFFF' },
                    attributes: { stroke: '#A3A6AD' }
                  },
                  leafNode : {
                    circle: { stroke: '#FFFFFF', fill: '#18223C' },
                    name: { stroke: '#FFFFFF',  },
                    attributes: { stroke: '#A3A6AD' }
                  }
                }
              }
            }

          />

        </div>
      </div>
    );
  }
}

// ItemDetails.propTypes = {
//     items: PropTypes.array
// };

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}


function mapStateToProps(state, ownProps) {
  // const itemId = ownProps.match.params.id; // fomr the path course/:id
  // let item = { id: '', name: '', date: '', price: 0, inStock: false, type: '' };

  // if (itemId && state.items.length > 0) {
  //     item = getItemById(state.items, itemId);
  // }
  console.log('mapstatetoprops');
  //console.log(state);

  // let treeData=[
  //   {
  //     name: 'Top Level',
  //     attributes: {
  //       keyA: 'val A',
  //       keyB: 'val B',
  //       keyC: 'val C',
  //     },
  //     children: [
  //       {
  //         name: 'Level 2: A',
  //         attributes: {
  //           keyA: 'val A',
  //           keyB: 'val B',
  //           keyC: 'val C',
  //         },
  //       },
  //       {
  //         name: 'Level 2: B',
  //       },
  //     ],
  //   },
  // ];

  let treeData = [{ name: '' }];
  let d = state.data;
  let totalRecords = 0;
  let icoRecords = 0;
  let preIcoRecords = 0;
  let finalIcoRecords = 0;
  let preIcoGrouped, icoGrouped, finalIcoGrouped;

  if (d != undefined && d.preIco != undefined) {
    console.log(d.preIco.length);

    preIcoRecords = d.preIco.length;
    icoRecords = d.ico.length;
    finalIcoRecords = d.finalIco.length;
    totalRecords = preIcoRecords + icoRecords + finalIcoRecords;
    preIcoGrouped = groupBy(d.preIco, cur => cur.currency);
    icoGrouped = groupBy(d.ico, cur => cur.currency);
    finalIcoGrouped = groupBy(d.finalIco, cur => cur.currency);
    console.log(preIcoGrouped);
    //const key = Array.from(grouped.keys())[0]
    //console.log(key);
    //let groupedValues = groupBy(grouped.get(key), pet => pet.value);
    //console.log(groupedValues);
    // d.preIco=d.preIco.map((x)=>{  x.valuenew=Math.log10(x.value); return x;});
    treeData = [
      {
        name: 'Data',

        attributes: {
          'Total Records': totalRecords

        },
        children: [{
          name: 'PreIco',
          attributes: {
            'Records': preIcoRecords
          },
          _collapsed: true,
          children: []
        },
        {
          name: 'Ico',
          attributes: {
            'Records': icoRecords
          },
          _collapsed: true,
          children: []
        },
        {
          name: 'FinalIco',
          attributes: {
            'Records': finalIcoRecords

          },
          _collapsed: true,
          children: []
        }
        ],

      }
    ];

    console.log(treeData);
    for (var [key, value] of preIcoGrouped) {
      //console.log(key + ' = ' + value);
      let values = (value.map(function (o) { return o.value; }));
      let min = Math.min(...values).toExponential();
      let max = Math.max(...values).toExponential();
      let obj = { name: key, attributes: { 'Records': value.length, 'Min Amount': min, 'Max Amount': max } };
      treeData[0].children[0].children.push(obj);

      console.log(min);
      console.log(max);
      //treeData[0].children[0].attributes=({Min : min});
      //treeData[0].children[0].attributes=({Max : max});

    }

    for (var [key, value] of icoGrouped) {
      //console.log(key + ' = ' + value);
      let values = (value.map(function (o) { return o.value; }));
      let min = Math.min(...values).toExponential();
      let max = Math.max(...values).toExponential();
      let obj = { name: key, attributes: { 'Records': value.length, 'Min Amount': min, 'Max Amount': max } };
      treeData[0].children[1].children.push(obj);

    }

    for (var [key, value] of finalIcoGrouped) {
      let values = (value.map(function (o) { return o.value; }));
      let min = Math.min(...values).toExponential();
      let max = Math.max(...values).toExponential();
      let obj = { name: key, attributes: { 'Records': value.length, 'Min Amount': min, 'Max Amount': max } };
      treeData[0].children[2].children.push(obj);

    }
  }





  //console.log(d.preIco);
  return {
    data: treeData
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

export const Charts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsExport)

const filterDropDown = {
  width: '15em'
};