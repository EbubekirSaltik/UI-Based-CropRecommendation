// stores/predictionStore.ts
import { create } from 'zustand';

type PredictionInput = {
   nitrogen: number,
   phosphorus: number,
   potassium: number,
   ph: number,
   rainfall: number,
   temperature:number,
   humidity: number,
};
 type PredictionEntry = [label: string, confidence: number];
export interface IPredictedResult{
    input_params:PredictionInput,
    predictions:PredictionEntry []
}
interface PredictionStore {
  inputData: PredictionInput | null;
  result: IPredictedResult | null;
  setInputData: (data: PredictionInput) => void;
  setResult: (data: IPredictedResult) => void;
  clear: () => void;
}

export const usePredictionStore = create<PredictionStore>((set) => ({
  inputData: null,
  result: null,
  setInputData: (data) => set({ inputData: data }),
  setResult: (data) => set({ result: data }),
  clear: () => set({ inputData: null, result: null }),
}));
