import { Observable } from 'rxjs';
import { Transformer } from '../models/transformer';

export interface ITransformerService {
    getTransformer(id: string);
    getTransformers(allegiance: string);
    addTransformer(transformer: Transformer);
    updateTransformer(transformer: Transformer);
    deleteTransformer(id: string);
    runSimulation();
}