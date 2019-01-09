import renderChart from 'vega-embed';

const plotDataAndPredictions = async (container, xs, ys, preds) => {
    const xvals = await xs.data();
    const yvals = await ys.data();
    const predvals = await preds.data();

    const values = Array.from(yvals).map((y, i) => {
        return {
            x: xvals[i], 
            y, 
            pred: predvals[i]}
    });

    const graphSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        width: 500,
        height: 500,
        data: {
            values: values
        },
        layer: [{
                mark: 'point',
                encoding: {
                    x: {
                        field: 'x',
                        type: 'quantitative'
                    },
                    y: {
                        field: 'y',
                        type: 'quantitative'
                    }
                }
            },
            {
                mark: 'line',
                encoding: {
                    x: {
                        field: 'x',
                        type: 'quantitative'
                    },
                    y: {
                        field: 'pred',
                        type: 'quantitative'
                    },
                    color: {
                        value: 'tomato'
                    }
                },
            }
        ]
    };

    return renderChart(container, graphSpec, {
        actions: false
    });
};

export default plotDataAndPredictions;