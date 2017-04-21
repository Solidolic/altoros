import React from 'react';
import { Component } from 'react';
import Styles from './graph_vertical.css';
import _ from 'underscore';

export default class GraphVertical extends React.Component {
    generateColor(value) {
        let maxValue = 0,
            minValue = 255;

        value = parseInt(value);

        let oldRange = maxValue - minValue,
            newRange = 100;

        value = (((value - minValue) * newRange) / oldRange);

        let r = Math.floor((255 * value) / 100),
            g = Math.floor((255 * (100 - value)) / 100),
            b = 0;

        return "rgb(" + r + "," + g + "," + b + ")"

    };
    
    getDays(){
        if (!this.props.data.length) return;

        let grid = [];
        let notes = JSON.parse(this.props.data);

        notes.result.forEach(function(val){
            if(!grid[val.index.dow]){
                grid[val.index.dow] = []
            }
            grid[val.index.dow].push({hour: val.index.hour, value: val.data['Site Incident Heat Severity Map (lv12)'][0].value});
        }.bind(this));


        grid.forEach(function (elem) {
            let sorted = _.sortBy(elem, function(val){
                return val.hour;
            });


            let last = 0;
            sorted.forEach(function(val){
                var difference = val.hour - last;
                if(difference > 1 ){
                    for(let i = 0; i < difference-1; i++){
                        let div = document.createElement('div');
                        div.style.backgroundColor = this.generateColor(val.value);
                        this.refs.main.appendChild(div);
                    }
                }
                let div = document.createElement('div');
                div.style.backgroundColor = this.generateColor(val.value);
                this.refs.main.appendChild(div);
                last = val.hour;
            }.bind(this));
        }.bind(this))
    }


    render() {
        return (
            <div className={Styles.canvas2} ref="main">
                <h2 className={Styles.title}>Table2</h2>
                {this.getDays()}
            </div>
        );
    }
}


