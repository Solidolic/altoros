import React from 'react';
import { Component } from 'react';
import Styles from './graph_landscape.css';
import _ from 'underscore';

export default class GraphLandscape extends React.Component {
    generateDaysLabel(value){
        let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        return days[value - 1] || value;
    }

    generateHoursLabel(value){
        if(value + 1 === 12) {
            return "12p"
        }
        return value + 1 <= 11 ? value + 1 + "a" : value - 11 + "p";
    }

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
    
    createElement(val){
        if(isNaN(val)){
            let div = document.createElement('div');
            div.innerHTML = val;
            this.refs.main.appendChild(div);
        } else {
            let div = document.createElement('div');
            div.style.backgroundColor = this.generateColor(val);
            this.refs.main.appendChild(div);
        }
        
    }
    
    
    
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

        
        grid.forEach(function (elem, i) {
            let sorted = _.sortBy(elem, function(val){
                return val.hour;
            });
            
           
            let last = 0;
            sorted.forEach(function(val, index, arr){
                if (index === 0){
                    this.createElement(this.generateDaysLabel(i));
                }
                let emptyHours = val.hour - last;
                if(emptyHours > 1){
                    if(index === 0){
                        for(let i = 0; i < emptyHours; i++){
                            this.createElement(val.value);
                        }
                    } else {
                        for(let i = 0; i < emptyHours - 1; i++){
                            this.createElement(val.value);
                        }
                    }
                }
                
                this.createElement(val.value);
                last = val.hour;
                if (index == (arr.length - 1) && val.hour != 23){
                    this.createElement(val.value);
                }
            }.bind(this));
        }.bind(this))
    }
    
    
    render() {
        return (
            <div className={Styles.canvas} ref="main">
                <h2 className={Styles.title}>Table1</h2>
                {this.getDays()}
            </div>
        );
    }
}


