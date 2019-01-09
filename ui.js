import renderChart from 'vega-embed';

export const plotDataAndPredictions = async (container, xs, ys, preds) => {
    const xvals = await xs.data();
    const yvals = await ys.data();
    const predvals = await preds.data();

    const values = Array.from(yvals).map((y, i) => {
        return {
            x: xvals[i], 
            y: yvals[i], 
            pred: predvals[i]}
    });

    const spec = {
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        'width': 300,
        'height': 300,
        'data': {
            'values': values
        },
        'layer': [{
                'mark': 'point',
                'encoding': {
                    'x': {
                        'field': 'x',
                        'type': 'quantitative'
                    },
                    'y': {
                        'field': 'y',
                        'type': 'quantitative'
                    }
                }
            },
            {
                'mark': 'line',
                'encoding': {
                    'x': {
                        'field': 'x',
                        'type': 'quantitative'
                    },
                    'y': {
                        'field': 'pred',
                        'type': 'quantitative'
                    },
                    'color': {
                        'value': 'tomato'
                    }
                },
            }
        ]
    };

    return renderChart(container, spec, {
        actions: false
    });
}