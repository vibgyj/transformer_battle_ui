import { ITransformerService } from './ITransformerService';
import { Transformer } from '../models/transformer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiTransformerService implements ITransformerService {
    constructor(private http: HttpClient) { }

    getTransformer(id: string) {
        return this.http.get("http://localhost:3456/transformers/" + id);
    }
    addTransformer(transformer: Transformer) {
        return this.http.post("http://localhost:3456/transformers", transformer);
    }
    updateTransformer(transformer: Transformer) {
        return this.http.put("http://localhost:3456/transformers/" + transformer.id, transformer);
    }
    deleteTransformer(id: string) {
        return this.http.delete("http://localhost:3456/transformers/" + id);
    }
    runSimulation() {
        return this.http.get("http://localhost:3456/war");
    }
    getTransformers(allegiance: string) {
        return this.http.get("http://localhost:3456/transformers/allegiance/" + allegiance);
    }    
}