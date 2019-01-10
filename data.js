import * as tf from '@tensorflow/tfjs';

export function generateData(numPoints, coefficients, rangeStart = -1, rangeEnd = 1, stdDev = 0.04) {
    const coeffs = coefficients.map(coeff => tf.scalar(coeff));
    const xs = tf.randomUniform([numPoints], rangeStart, rangeEnd);
    const ys = calculate(coeffs, xs).add(tf.randomNormal([numPoints], 0, stdDev));
    return {
        xs,
        ys
    };
};

export const calculate = (coeffs, xs) => {
    const len = coeffs.length;
    return coeffs
        .map((coeff, i) => coeff.mul(xs.pow(len - 1 - i)))
        .reduce((acc, cur) => acc.add(cur))
};

const normalize = vals => {
    const min = vals.min();
    const max = vals.max();
    const range = max.sub(min);
    return vals.sub(min).div(range);
};