import { Game, WEBGL, Scene, GameObjects, Math as PMath } from 'phaser';
import spritesheetUrlXml from './spritesheet.xml';
import spritesheetUrlPng from './spritesheet.png';

type KeyboardKeys = {
  W: Phaser.Input.Keyboard.Key,
  A: Phaser.Input.Keyboard.Key,
  S: Phaser.Input.Keyboard.Key,
  D: Phaser.Input.Keyboard.Key
}

class Demo extends Scene {
  ship!: GameObjects.Image;
  keyaboardKeys!: KeyboardKeys;

  preload() {
    this.load.atlasXML('demo', spritesheetUrlPng, spritesheetUrlXml);
  }

  create() {
    this.ship = this.add.image(100, 100, 'demo', 'spaceShips_001.png');

    this.keyaboardKeys = this.input.keyboard.addKeys('W,A,S,D') as KeyboardKeys;
  }

  update() {
    const mousePosition = this.input.mousePointer.position;

    const angle = PMath.Angle.BetweenPoints(this.input.mousePointer.position, this.ship) + Math.PI / 2;

    this.ship.setRotation(angle);

    if (this.keyaboardKeys.A.isDown) { this.ship.x -= 5; }
    if (this.keyaboardKeys.S.isDown) { this.ship.y += 5; }
    if (this.keyaboardKeys.D.isDown) { this.ship.x += 5; }
    if (this.keyaboardKeys.W.isDown) { this.ship.y -= 5; }
    if (this.input.mousePointer.isDown) {
      const missle = this.add.image(this.ship.x, this.ship.y, 'demo', 'spaceMissiles_001.png');
      missle.setRotation(this.ship.rotation + Math.PI);

      this.tweens.add({
        targets: missle,
        x: mousePosition.x,
        y: mousePosition.y,
        easy: 'Sine.easeInOut',
        duration: 1000
      });
    }
  }
}

const config: GameConfig = {
  type: WEBGL,
  width: 800,
  height: 600,
  scene: [Demo]
};

const game = new Game(config);
console.log(game);
