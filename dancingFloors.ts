import * as utils from '@dcl-sdk/utils'
import { engine, Material, MeshRenderer, Transform } from '@dcl/sdk/ecs'
import { Color4, type Quaternion, type Vector3 } from '@dcl/sdk/math'
import { triggerEmote } from '~system/RestrictedActions'
import { type GameController } from './controllers/game.controller'

/// /// DEBUG FLAG - Set to true to view all dance areas
// const DEBUG_FLAG = false

/// // This system acts on the danceAreas defined above

export class DanceSystem {
  length = 0
  timer = 0
  routine: any
  danceFunction: () => void = () => {
    this.dance()
  }

  routines: string[] = ['robot', 'tik', 'tektonik', 'hammer', 'headexplode', 'handsair', 'disco', 'dab']

  constructor(routine: string) {
    this.routine = routine
  }

  update(dt: number): void {
    if (this.timer > 0) {
      this.timer -= dt
    } else {
      this.dance()
    }
  }

  dance(): void {
    this.timer = this.length
    if (this.routine === 'all') {
      const rand = Math.floor(Math.random() * (this.routine.length - 0) + 0)
      void triggerEmote({ predefinedEmote: this.routines[rand] })
    } else {
      void triggerEmote({ predefinedEmote: this.routine })
    }
  }
}

export class DanceArea {
  danceArea = engine.addEntity()
  danceSystem = new DanceSystem('all')
  gameController: GameController
  danceZone: boolean = false
  constructor(gameController: GameController, position: Vector3, scale: Vector3, rotation: Quaternion) {
    this.gameController = gameController
    Transform.create(this.danceArea, {
      position,
      scale,
      rotation
    })
    MeshRenderer.setBox(this.danceArea)
    Material.setPbrMaterial(this.danceArea, {
      albedoColor: Color4.create(0, 0, 0, 0)
    })
    utils.triggers.addTrigger(
      this.danceArea,
      1,
      1,
      [{ type: 'box', scale }],
      () => {
        this.danceSystem.routine = 'all'
        
        this.danceZone = true
      },
      () => {
        this.danceZone = false
      }
    )
  }
}

// Function to update floor color
let toggle = true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateColor(dt: number):void {
  toggle = !toggle
   toggle ? Color4.Magenta() : Color4.Purple()
}