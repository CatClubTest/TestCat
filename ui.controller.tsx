import type ReactEcs from '@dcl/sdk/react-ecs';
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { type GameController } from './game.controller'
import { NpcUtilsUi } from 'dcl-npc-toolkit'

export class UiController {
  gameController: GameController
  uiComponent: () => ReactEcs.JSX.Element[]
  constructor(gameController: GameController) {
    this.gameController = gameController
    this.uiComponent = () => [
      NpcUtilsUi(),
      this.gameController.mainInstance.prompt.render(),
      this.gameController.mainInstance.tip.createDonationUI(),
      this.gameController.mainInstance.tip2.createDonationUI(),
      this.gameController.mainInstance.tip3.createDonationUI(),
      this.gameController.mainInstance.tip4.createDonationUI(),
      this.gameController.mainInstance.tip5.createDonationUI(),
      this.gameController.mainInstance.tip6.createDonationUI(),
      this.gameController.mainInstance.tip7.createDonationUI(),
      this.gameController.mainInstance.tip8.createDonationUI(),
      this.gameController.mainInstance.tip9.createDonationUI(),
      this.gameController.mainInstance.tip10.createDonationUI(),
      this.gameController.mainInstance.tip11.createDonationUI()
    ]
    ReactEcsRenderer.setUiRenderer(this.uiComponent)
  }
}
