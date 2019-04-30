import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as apiActions from '../../actions/apiActions';

import Tree from 'react-d3-tree';



export class ChartsExport extends Component {

 
  componentDidMount() {
    if(this.props.actions!==undefined)
    this.props.actions.GetData();
  }  

  render() {
    console.log(this.props.data);

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
  
  console.log('mapstatetoprops');
  
  let treeData = [{ name: '' }];
  let d = state.data;
  let totalRecords = 0;
  let icoRecords = 0;
  let preIcoRecords = 0;
  let finalIcoRecords = 0;
  let preIcoGrouped, icoGrouped, finalIcoGrouped;

  if (d !== undefined && d.preIco !== undefined) {
    console.log(d.preIco.length);

    preIcoRecords = d.preIco.length;
    icoRecords = d.ico.length;
    finalIcoRecords = d.finalIco.length;
    totalRecords = preIcoRecords + icoRecords + finalIcoRecords;
    preIcoGrouped = groupBy(d.preIco, cur => cur.currency);
    icoGrouped = groupBy(d.ico, cur => cur.currency);
    finalIcoGrouped = groupBy(d.finalIco, cur => cur.currency);
    console.log(preIcoGrouped);
    
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
      
      let values = (value.map(function (o) { return o.value; }));
      let min = Math.min(...values).toExponential();
      let max = Math.max(...values).toExponential();
      let obj = { name: key, attributes: { 'Records': value.length, 'Min Amount': min, 'Max Amount': max } };
      treeData[0].children[0].children.push(obj);

        

    }

    for (var [keyIco, valueIco] of icoGrouped) {
      
      let values = (valueIco.map(function (o) { return o.value; }));
      let min = Math.min(...values).toExponential();
      let max = Math.max(...values).toExponential();
      let obj = { name: keyIco, attributes: { 'Records': value.length, 'Min Amount': min, 'Max Amount': max } };
      treeData[0].children[1].children.push(obj);

    }

    for (var [keyFinalIco, valueFinalIco] of finalIcoGrouped) {
      let values = (valueFinalIco.map(function (o) { return o.value; }));
      let min = Math.min(...values).toExponential();
      let max = Math.max(...values).toExponential();
      let obj = { name: keyFinalIco, attributes: { 'Records': value.length, 'Min Amount': min, 'Max Amount': max } };
      treeData[0].children[2].children.push(obj);

    }
  }





  
  return {
    data: treeData
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(apiActions, dispatch)
}
)

export const Charts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsExport)

