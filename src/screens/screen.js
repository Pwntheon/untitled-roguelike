export default class Screen {
    constructor(config) {
        this.screenName = "Screen name not set!";
        this.game = config.game;
        if(!this.game) throw new Error("Screen created without game object");
    }
    
    Enter() {
        console.log(`Entered screen ${this.screenName}`);
    }
    
    Exit () {
        console.log(`Exited screen ${this.screenName}`);
    }
    
    Render(display) {

    }
    
    HandleInput(eventType, event) {

    }
}