import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
import { CustomCallbackConfig, Logs } from "@tensorflow/tfjs";
// Train a simple model:
const model = tf.sequential();
model.add(
  tf.layers.dense({ units: 100, activation: "relu", inputShape: [10] })
);
model.add(tf.layers.dense({ units: 1, activation: "linear" }));
model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

const xs = tf.randomNormal([100, 10]);
const ys = tf.randomNormal([100, 1]);

model.fit(xs, ys, {
  epochs: 10,
  callbacks: {
    onEpochEnd: (epoch: number, log: Logs) =>
      console.log(`Epoch ${epoch}: loss = ${log.loss}`)
  } as CustomCallbackConfig
});
