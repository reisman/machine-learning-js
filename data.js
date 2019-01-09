import * as tf from '@tensorflow/tfjs';

export function generateData(numPoints, coeff, stdDev = 0.04) {
    const coeffs = [tf.scalar(coeff.a), tf.scalar(coeff.b), tf.scalar(coeff.c), tf.scalar(coeff.d)];
    const xs = tf.randomUniform([numPoints], -1, 1);
    const ys = calculate(coeffs, xs).add(tf.randomNormal([numPoints], 0, stdDev));
    
        const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    const ysNorm = ys.sub(ymin).div(yrange);

    return {
        xs,
        ys: ysNorm,
    };
};

export const calculate = (coeffs, xs) => {
    const len = coeffs.length;
    return coeffs
        .map((coeff, i) => coeff.mul(xs.pow(len - 1 - i)))
        .reduce((acc, cur) => acc.add(cur))
};