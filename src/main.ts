import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
// JavaScript:
// Build and compile model.
async function main() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [2], activation: "tanh" }));
  // model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  // model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  model.add(tf.layers.dense({ units: 2, activation: "sigmoid" }));
  model.compile({
    optimizer: "sgd",
    loss: "sparseCategoricalCrossentropy"
  });

  // loss = 0.5
  // const model = tf.sequential();
  // model.add(
  //   tf.layers.dense({
  //     units: 1,
  //     inputShape: [2],
  //     activation: "relu"
  //   })
  // );

  // model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

  // Generate some synthetic data for training.
  const xs = tf.tensor2d([
    [150, 67],
    [130, 60],
    [200, 65],
    [125, 52],
    [230, 72],
    [181, 70],
    [170, 60],
    [165, 62],
    [153, 45],
    [165, 52]
  ]);
  const ys = tf.tensor2d([[1], [1], [0], [1], [0], [0], [1], [1], [1], [1]]);

  // Train model with fit().
  await model.fit(xs, ys, {
    epochs: 100
  });

  // Run inference with predict().
  model
    .predict(
      tf.tensor2d([
        [155, 67],
        [138, 62],
        [215, 80],
        [120, 42],
        [230, 72],
        [181, 72]
      ]),
      { batchSize: 3 }
    )
    .toString();
}

main().catch(err => console.error(err));
