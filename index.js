import * as tf from '@tensorflow/tfjs';
import { generateData } from './data';
import plotDataAndPredictions from './ui';

const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));

const predict = xs => {
    return tf.tidy(() => {
        return a.mul(xs.pow(tf.scalar(3)))
            .add(b.mul(xs.square()))
            .add(c.mul(xs))
            .add(d);
    });
};

const loss = (preds, ys) => {
    return preds.sub(ys).square().mean();
}

const train = (xs, ys, epochs, learningRate) => {
    const optimizer = tf.train.sgd(learningRate);

    for (let i = 0; i < epochs; i++) {
        optimizer.minimize(() => {
            const pred = predict(xs);
            return loss(pred, ys);
        });

        console.log(`Epoch ${i+1}: a=${a.dataSync()[0]} || b=${b.dataSync()[0]} || c=${c.dataSync()[0]} || d=${d.dataSync()[0]}`);
    }
}

document.getElementById('train').addEventListener('click', () => {
    const realCoeffs = {
        a: -0.8,
        b: 0.3,
        c: 0.5,
        d: 0.8
    };

    const {xs, ys} = generateData(500, realCoeffs);
    const epochs = 100;
    const learningRate = 0.5;
    train(xs, ys, epochs, learningRate);
    plotDataAndPredictions(document.getElementById('container'), xs, ys, predict(xs));
});