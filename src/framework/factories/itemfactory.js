import Item from '../models/item';
import * as Blueprints from '../../data/items.json';
import * as Components from '../models/components';

export default function CreateItem(game, blueprint) {
    if(typeof blueprint === "string") blueprint = Blueprints.default[blueprint];
    let componentObjects = []
    blueprint.components.forEach(component => {
        if(typeof component === "string") {
            component = {name: component};
        }
        componentObjects.push(new Components[component.name](component));
    });
    blueprint.components = componentObjects;
    return new Item({...blueprint});
}