import { ITransformerService } from './ITransformerService';
import { Transformer } from '../models/transformer';

export class ApiTransformerService implements ITransformerService {
    getTransformer(id: string) {
        throw new Error("Method not implemented.");
    }
    addTransformer(transformer: Transformer) {
        throw new Error("Method not implemented.");
    }
    updateTransformer(transformer: Transformer) {
        throw new Error("Method not implemented.");
    }
    deleteTransformer(id: string) {
        throw new Error("Method not implemented.");
    }
    runSimulation() {
        throw new Error("Method not implemented.");
    }
    getTransformers(allegiance: string) {
        throw new Error("Method not implemented.");
    }    
}