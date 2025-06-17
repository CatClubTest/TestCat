import { MainInstance } from '../mainInstance'
import { UiController } from './ui.controller'

export class GameController {
  mainInstance: MainInstance
  uiController: UiController
  constructor() {
    this.mainInstance = new MainInstance(this)
    this.uiController = new UiController(this)
  }
}
