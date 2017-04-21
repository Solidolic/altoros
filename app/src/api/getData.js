/**
 * Created by akoz on 17.04.2017.
 */

export function getFirstIssues() {
     return fetch('https://api.github.com/repos/kozhuhds/heatmap/contents/data/heatwave2.json', {mode: 'cors'})
         .then(r => r.json());
}

export function getSecondIssues() {
     return fetch('https://api.github.com/repos/kozhuhds/heatmap/contents/data/heatwave.json', {mode: 'cors'})
         .then(r => r.json());
}

