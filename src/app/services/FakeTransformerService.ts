import { ITransformerService } from './ITransformerService';
import { Observable } from 'rxjs';
import { Transformer } from '../models/transformer';

export class FakeTransformerService implements ITransformerService {
    id = 0;
    transformers = [
        { name: "Autobot" + (++this.id).toString(), id: this.id.toString(), allegiance: "Autobot" },
        { name: "Autobot" + (++this.id).toString(), id: this.id.toString(), allegiance: "Autobot" },
        { name: "Decepticon" + (++this.id).toString(), id: this.id.toString(), allegiance: "Decepticon" },
        { name: "Decepticon" + (++this.id).toString(), id: this.id.toString(), allegiance: "Decepticon" }
    ];
    getTransformer(id: string) {
        return this.getObservable(this.transformers.find(element => element.id == id));
    }
    addTransformer(transformer: Transformer) {
        transformer.id = (++this.id).toString();
        this.transformers.push(transformer);
        return this.getObservable(transformer);
    }
    updateTransformer(transformer: Transformer) {
        return this.getObservable(transformer);
    }
    deleteTransformer(id: string) {
        var index = this.transformers.findIndex(element => element.id == id);
        this.transformers.splice(index, 1);
    }
    runSimulation() {
        return this.getObservable(
            this.transformers.filter(element => element.id == "1" || element.id == "3"));
    }
    getTransformers(allegiance: string) {
        return this.getObservable(
            this.transformers.filter(element => element.allegiance == allegiance));
    }

    getObservable(object) {
        return new Observable((observer) => {
            observer.next(object);
            observer.complete();
        });
    }
}