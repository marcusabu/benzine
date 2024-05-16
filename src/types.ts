export type TPrijsMeting = {
  ID: number;
  Perioden: string;
  BenzineEuro95_1: number;
};

export type TOpendataResponse = {
  data: {
    value: TPrijsMeting[];
  };
};
