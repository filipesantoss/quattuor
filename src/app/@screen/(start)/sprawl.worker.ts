import { create } from "&/puzzle/create";

self.onmessage = () => {
  self.postMessage(create());
};
