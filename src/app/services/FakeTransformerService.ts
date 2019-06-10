import { ITransformerService } from './ITransformerService';
import { Observable } from 'rxjs';
import { Transformer } from '../models/transformer';

export class FakeTransformerService implements ITransformerService {
    id = 0;
    transformers = [
        { Name: "Autobot" + (++this.id).toString(), Id: this.id.toString(), Allegiance: "Autobot" },
        { Name: "Autobot" + (++this.id).toString(), Id: this.id.toString(), Allegiance: "Autobot" },
        { Name: "Decepticon" + (++this.id).toString(), Id: this.id.toString(), Allegiance: "Decepticon" },
        { Name: "Decepticon" + (++this.id).toString(), Id: this.id.toString(), Allegiance: "Decepticon" }
    ];
    getTransformer(id: string) {
        return this.getObservable(this.transformers.find(element => element.Id == id));
    }
    addTransformer(transformer: Transformer) {
        transformer.Id = (++this.id).toString();
        this.transformers.push(transformer);
        return this.getObservable(transformer);
    }
    updateTransformer(transformer: Transformer) {
        return this.getObservable(transformer);
    }
    deleteTransformer(id: string) {
        var index = this.transformers.findIndex(element => element.Id == id);
        this.transformers.splice(index, 1);
    }
    runSimulation() {
        return this.getObservable(
            this.transformers.filter(element => element.Id == "1" || element.Id == "3"));
    }
    getTransformers(allegiance: string) {
        return this.getObservable(
            this.transformers.filter(element => element.Allegiance == allegiance));
    }

    getObservable(object) {
        return new Observable((observer) => {
            observer.next(object);
            observer.complete();
        });
    }
}