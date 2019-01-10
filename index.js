import * as tf from '@tensorflow/tfjs';
import { calculate, generateData } from './data';
import plotDataAndPredictions from './ui';

const predict = (xs, vars) => {
    return tf.tidy(() => calculate(vars, xs));
};

const loss = (preds, ys) => {
    return preds.sub(ys).square().mean();
}

const train = (xs, ys, vars, epochs = 100, learningRate = 0.5) => {
    const optimizer = tf.train.sgd(learningRate);
    for (let i = 0; i < epochs; i++) {
        optimizer.minimize(() => {
            const pred = predict(xs, vars);
            return loss(pred, ys);
        });

        const variablesLog = vars.map((v, i) => `V${i}=${v.dataSync()[0]}`).join(' || ');
        console.log(`Epoch ${i+1}: ${variablesLog}`);
    }
}

const trainAndPlot = container => {
    const realCoeffs = [-0.8, 0.3, 0.5, 0.8];
    const {xs, ys} = generateData(500, realCoeffs, -1, 1, 0.1);
    const vars = Array.from({length: realCoeffs.length}, () => tf.variable(tf.scalar(Math.random())));
    train(xs, ys, vars);
    plotDataAndPredictions(container, xs, ys, predict(xs, vars));
}

document.getElementById('train').addEventListener('click', () => {
    trainAndPlot(document.getElementById('container'));
});