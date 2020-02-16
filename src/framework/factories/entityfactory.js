import Entity from '../models/entity';
import * as Blueprints from '../../data/entities.json';
import * as Components from '../models/components';

export default function CreateEntity(blueprint, x, y) {
    if(typeof blueprint === "string") blueprint = Blueprints.default[blueprint];
    let componentObjects = []
    blueprint.components.forEach(component => {
        componentObjects.push(new Components[component.name](component));
    });
    blueprint.components = componentObjects;
    return new Entity({...blueprint, x, y});
}