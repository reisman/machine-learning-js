import * as tf from '@tensorflow/tfjs';

export function generateData(numPoints, coeff, stdDev = 0.04) {
    const [a, b, c, d] = [tf.scalar(coeff.a), tf.scalar(coeff.b), tf.scalar(coeff.c), tf.scalar(coeff.d)];
    const xs = tf.randomUniform([numPoints], -1, 1);
    const ys = a.mul(xs.pow(tf.scalar(3)))
        .add(b.mul(xs.square()))
        .add(c.mul(xs))
        .add(d)
        .add(tf.randomNormal([numPoints], 0, stdDev));
    
    const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    const ysNorm = ys.sub(ymin).div(yrange);

    return {
        xs,
        ys: ysNorm,
    };
}