import * as tf from '@tensorflow/tfjs';
import { calculate, generateData } from './data';
import plotDataAndPredictions from './ui';

const predict = (xs, vars) => {
    return tf.tidy(() => calculate(vars, xs));
};

const loss = (preds, ys) => {
    return preds.sub(ys).square().mean();
}

const train = (xs, ys, vars, epochs, learningRate) => {
    const logEpoch = num => {
        const variablesLog = vars.map((v, i) => `V${i}=${v.dataSync()[0]}`).join(' || ');
        console.log(`Epoch ${num}: ${variablesLog}`);
    };

    const optimizer = tf.train.sgd(learningRate);
    for (let i = 0; i < epochs; i++) {
        optimizer.minimize(() => {
            const pred = predict(xs, vars);
            return loss(pred, ys);
        });

        logEpoch(i + 1);
    }
}

const trainAndPlot = container => {
    const config = extractConfiguration();
    const realCoeffs = config.coefficients;
    const {xs, ys} = generateData(config.numberOfPoints, realCoeffs, -1, 1, config.standardDeviation);
    const vars = Array.from({length: realCoeffs.length}, () => tf.variable(tf.scalar(Math.random())));
    train(xs, ys, vars, config.epochs, config.learningRate);
    plotDataAndPredictions(container, xs, ys, predict(xs, vars), 800, 1200);
}

const extractConfiguration = () => {
    const coefficients = document.getElementById('coefficients').value.split(' ').map(parseFloat);
    const numberOfPoints = parseFloat(document.getElementById('number_points').value);
    const standardDeviation = parseFloat(document.getElementById('standard_deviation').value);
    const epochs = parseInt(document.getElementById('epochs').value);
    const learningRate = parseFloat(document.getElementById('learning_rate').value);
    return {
        coefficients,
        numberOfPoints,
        standardDeviation, 
        epochs,
        learningRate
    };
};

document.getElementById('train').addEventListener('click', () => {
    trainAndPlot(document.getElementById('container'));
});