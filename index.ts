import { GameController } from './controllers/game.controller'

export function main(): void {
  const game = new GameController()
  game.mainInstance.setUp()
}
