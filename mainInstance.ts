import {
  engine,
  Transform,
  GltfContainer,
  AudioSource,
  MeshCollider,
  pointerEventsSystem,
  InputAction,
  EasingFunction,
  Tween,
  inputSystem,
  PointerEventType,
  Material,
  MeshRenderer,
  VideoPlayer,
  NftShape,
  AudioStream,
  NftFrameType} from '@dcl/sdk/ecs'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'
import { movePlayerTo, openNftDialog } from '~system/RestrictedActions'
import { type GameController } from './controllers/game.controller'
import { guardCheckPoint, NPC } from './mainDoorAccess'
import { openDialogWindow } from 'dcl-npc-toolkit'
import * as ui from 'dcl-ui-toolkit'
import { payMana, accessSecondFloor, accessThirdFloor, payMana2 } from './mana'
import { DonationsBox } from './donationsBox'
import { DanceArea } from './dancingFloors'
import * as utils from '@dcl-sdk/utils'
import { imageWidth } from 'dcl-npc-toolkit/dist/dialog'

// TEST VIDEOS FOR STREAMING - REPLACE THEM WITH THE CUSTOM LINK
const videoStreamGroundSrc =
  'https://stream.mux.com/LXrToB02CHVTZqBa1rZlI9Y9hAfvBtDJti2Wtw4yis01U.m3u8' // Drop your custom link to stream video
const videoStreamFloor2Src =
  '' // Drop your custom link to stream video
const videoStreamFloor3Src =
  'https://stream.mux.com/CiT8Y8tYZOqm3It7u8uihDtOMjr51jXTe5ZniSHd2AQ.m3u8' // Drop your custom link to stream video
const videoStreamFloor4Src =
  '' // Drop your custom link to stream video
const videoStreamFloor4bSrc =
  '' // Drop your custom link to stream video
const videoStreamFloor5Src =
  'https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/38b5j27yyie4re8a/index.m3u8' // Drop your custom link to stream video

export class MainInstance {
  gameController: GameController
  // Assets
  private readonly floor_button_1 = 'assets/scene/models/475aa992-b0e2-40ec-8d06-461292435964/1.glb'
  private readonly floor_button_2 = 'assets/scene/models/651dab77-35ec-49ef-8631-6063ec91893f/2.glb'
  private readonly floor_button_3 = 'assets/scene/models/cad17ca0-d83c-4ce1-ab5f-c1d5ead72295/3.glb'
  private readonly floor_button_4 = 'assets/scene/models/d4d7118a-b54d-45d8-992e-6669c8744eaa/4.glb'
  private readonly floor_button_5 = 'assets/scene/models/9b4c38e3-4a65-41db-a209-bce70a5cbf7a/5.glb'
  private readonly floor_button_6 = 'assets/scene/models/98f6cc0d-3e2c-4fc7-8b90-405914d08397/6.glb'
  // entities
  private _scene = engine.addEntity()
  private entity = engine.addEntity()
  private entity2 = engine.addEntity()
  private entity3 = engine.addEntity()
  private music = engine.addEntity()
  private toolbox = engine.addEntity()
  private clickArea = engine.addEntity()
  private imageFromURL = engine.addEntity()
  private imageFromURL2 = engine.addEntity()
  private imageFromURL3 = engine.addEntity()
  private imageFromURL4 = engine.addEntity()
  private imageFromURL5 = engine.addEntity()
  private imageFromURL6 = engine.addEntity()
  private videoStream = engine.addEntity()
  private triggerArea = engine.addEntity()
  private imageFromURL7 = engine.addEntity()
  private imageFromURL8 = engine.addEntity()
  private videoStream2 = engine.addEntity()
  private triggerArea2 = engine.addEntity()
  private triggerArea3 = engine.addEntity()
  private triggerArea4 = engine.addEntity()
  private triggerArea5 = engine.addEntity()
  private videoStream3 = engine.addEntity()
  private triggerArea6 = engine.addEntity()
  private triggerArea7 = engine.addEntity()
  private videoStream4 = engine.addEntity()
  private videoStream5 = engine.addEntity()
  private nftPictureFrame = engine.addEntity()
  private nftPictureFrame2 = engine.addEntity()
  private nftPictureFrame3 = engine.addEntity()
  private nftPictureFrame4 = engine.addEntity()
  private triggerArea8 = engine.addEntity()
  private videoStream6 = engine.addEntity()
  private tofirstfloorbutton = engine.addEntity()
  private tosecondfloorbutton = engine.addEntity()
  private tothirdfloorbutton = engine.addEntity()
  private tofourthfloorbutton = engine.addEntity()
  private tofifthfloorbutton = engine.addEntity()
  private totopfloorbutton = engine.addEntity()
  private tofirstfloorbutton2 = engine.addEntity()
  private tosecondfloorbutton2 = engine.addEntity()
  private tothirdfloorbutton2 = engine.addEntity()
  private tofourthfloorbutton2 = engine.addEntity()
  private tofifthfloorbutton2 = engine.addEntity()
  private totopfloorbutton2 = engine.addEntity()
  private tofirstfloorbutton3 = engine.addEntity()
  private tosecondfloorbutton3 = engine.addEntity()
  private tothirdfloorbutton3 = engine.addEntity()
  private tofourthfloorbutton3 = engine.addEntity()
  private tofifthfloorbutton3 = engine.addEntity()
  private totopfloorbutton3 = engine.addEntity()
  private tofirstfloorbutton4 = engine.addEntity()
  private tosecondfloorbutton4 = engine.addEntity()
  private tothirdfloorbutton4 = engine.addEntity()
  private tofourthfloorbutton4 = engine.addEntity()
  private tofifthfloorbutton4 = engine.addEntity()
  private totopfloorbutton4 = engine.addEntity()
  private tofirstfloorbutton5 = engine.addEntity()
  private tosecondfloorbutton5 = engine.addEntity()
  private tothirdfloorbutton5 = engine.addEntity()
  private tofourthfloorbutton5 = engine.addEntity()
  private tofifthfloorbutton5 = engine.addEntity()
  private totopfloorbutton5 = engine.addEntity()
  private door = engine.addEntity()
  private imageFromURL9 = engine.addEntity()
  private thirdfloor = engine.addEntity()
  private fourthfloor = engine.addEntity()
  private groundfirstfloor = engine.addEntity()
  private secondfloor = engine.addEntity()
  private topfloor = engine.addEntity()
  private invisibleWall = engine.addEntity()
  private invisibleWall2 = engine.addEntity()
  private invisibleWall3 = engine.addEntity()
  private invisibleWall4 = engine.addEntity()
  private readonly goodbyeDoor = engine.addEntity()
  private readonly closedDoor = engine.addEntity()
  // Donation Boxes
  tip: DonationsBox
  tip2: DonationsBox
  tip3: DonationsBox
  tip4: DonationsBox
  tip5: DonationsBox
  tip6: DonationsBox
  tip7: DonationsBox
  tip8: DonationsBox
  tip9: DonationsBox
  tip10: DonationsBox
  tip11: DonationsBox
  // Dance Areas
  danceArea_1: DanceArea
  danceArea_2: DanceArea
  danceArea_3: DanceArea
  danceArea_4: DanceArea
  danceArea_5: DanceArea
  danceArea_6: DanceArea
  danceArea_7: DanceArea
  danceArea_8: DanceArea
  // others
  private readonly clubGuard: NPC
  public prompt: ui.FillInPrompt
  constructor(gameController: GameController) {
    this.gameController = gameController
    this.clubGuard = new NPC(
      Vector3.create(5.39, 0.88, 1.04),
      Vector3.create(1, 1, 1),
      Quaternion.create(0, 180, 0, 0),
      'assets/scene/models/Alice.glb',
      0,
      () => {
        openDialogWindow(this.clubGuard.entity, guardCheckPoint, 0)
      }
    )

    // Club Audio..................
const streamEntity = engine.addEntity() 
AudioStream.create(streamEntity, {
  url: 'https://listen.uturnradio.com/electro_house',
  playing: true, 
  volume: 0.8,
})
//Club Verification Convo
    this.prompt = ui.createComponent(ui.FillInPrompt, {
      title: "I'm going to need to see some ID",
      placeholder: 'Enter your Birth Year',
      onAccept: (e: string) => {
        const submittedText: number = +e
        if (submittedText <= 2002) {
          openDialogWindow(this.clubGuard.entity, guardCheckPoint, 'welcome')
          this.prompt.hide()
          Tween.create(this.door, {
            mode: Tween.Mode.Move({
              start: Vector3.create(8.065906524658203, 2.3859095573425293, 3.5),
              end: Vector3.create(8.065906524658203, 7, 3.5)
            }),
            duration: 1500,
            easingFunction: EasingFunction.EF_LINEAR
          })
          AudioSource.getMutable(this.music).playing = true
          AudioSource.getMutable(this.music).volume = 1
        } else {
          openDialogWindow(this.clubGuard.entity, guardCheckPoint, 'under 18')
          this.prompt.hide()
        }
      }
    })
    // Tip on 2nd Dance Floor Poles//////////////////////////
    this.tip = new DonationsBox(
      Vector3.create(7.55, 12, 32.9),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip2 = new DonationsBox(
      Vector3.create(7.55, 12, 24.7),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip3 = new DonationsBox(
      Vector3.create(7.55, 12, 16.6),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip4 = new DonationsBox(
      Vector3.create(13.98, 11.78, 8),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip5 = new DonationsBox(
      Vector3.create(2.25, 11.78, 8),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0x1d9A91f653b3ef842fCbaecDc1d1A633954c5fB6',
      10,
      this.gameController
    )
    this.tip6 = new DonationsBox(
      Vector3.create(14.68, 19.03, 10),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip7 = new DonationsBox(
      Vector3.create(1.16, 19.03, 10),
      Vector3.create(0.05, 0.05, 0.05),
      Quaternion.fromEulerDegrees(0, 0, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip8= new DonationsBox(
      Vector3.create(12.39, 1.31, 44.98),
      Vector3.create(0.09, 0.09, 0.09),
      Quaternion.fromEulerDegrees(0, 180, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip9= new DonationsBox(
      Vector3.create(13.69, 29.43, 43.01),
      Vector3.create(0.09, 0.09, 0.09),
      Quaternion.fromEulerDegrees(0, 180, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip10 = new DonationsBox(
      Vector3.create(2.07, 29.43, 43.01),
      Vector3.create(0.09, 0.09, 0.09),
      Quaternion.fromEulerDegrees(0, 180, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    this.tip11 = new DonationsBox(
      Vector3.create(2.78, 0.97, 43.01),
      Vector3.create(0.09, 0.09, 0.09),
      Quaternion.fromEulerDegrees(0, 180, 0),
      '0xe7334cf43532423bfd163b32aCc0D72922132226',
      10,
      this.gameController
    )
    // Dance Areas
    this.danceArea_1 = new DanceArea(
      this.gameController,
      Vector3.create(7.91103458404541, 0.09260523319244385, 40.509727478027344),
      Vector3.create(10.423848152160645, 1, 8.243631362915039),
      Quaternion.create(0, 0, 0, 1)
    )
    this.danceArea_2 = new DanceArea(
      this.gameController,
      Vector3.create(8.170372009277344, 10.481361389160156, 41.3394889831543),
      Vector3.create(3.9054834842681885, 0.2, 3.448207139968872),
      Quaternion.create(0, 0, 0, 1)
    )
    this.danceArea_3 = new DanceArea(
      this.gameController,
      Vector3.create(7.667209625244141, 10.88877010345459, 24.533428192138672),
      Vector3.create(6.003643989562988, 0.2, 22.413347244262695),
      Quaternion.create(0, 0, 0, 1)
    )
    this.danceArea_4 = new DanceArea(
      this.gameController,
      Vector3.create(14.10114860534668, 10.724449157714844, 10.337156295776367),
      Vector3.create(2.710418701171875, 0.5, 3.8268330097198486),
      Quaternion.create(0, 0, 0, 1)
    )
    this.danceArea_5 = new DanceArea(
      this.gameController,
      Vector3.create(2.0071144104003906, 10.71868896484375, 10.337156295776367),
      Vector3.create(2.710418701171875, 0.6, 3.8268330097198486),
      Quaternion.create(0, 0, 0, 1)
    )
    this.danceArea_6 = new DanceArea(
      this.gameController,
      Vector3.create(14.041966438293457, 17.887067794799805, 12.153299331665039),
      Vector3.create(2.710418701171875, 0.7, 3.8268330097198486),
      Quaternion.create(0, 0, 0, 1)
    )
    this.danceArea_7 = new DanceArea(
      this.gameController,
      Vector3.create(1.8554704189300537, 17.887069702148438, 12.181068420410156),
      Vector3.create(2.710418701171875, 0.7, 3.8268330097198486),
      Quaternion.create(0, 0, 0, 1)
    )
    this.danceArea_8 = new DanceArea(
      this.gameController,
      Vector3.create(8.063483238220215, 29, 34.007625579833984),
      Vector3.create(5.48532772064209, 0.2, 8.243631362915039),
      Quaternion.create(0, 0, 0, 1)
    )
    engine.addSystem(() => {
      const cmd = inputSystem.getInputCommand(InputAction.IA_FORWARD, PointerEventType.PET_DOWN)
      const cmd2 = inputSystem.getInputCommand(InputAction.IA_BACKWARD, PointerEventType.PET_DOWN)
      const cmd3 = inputSystem.getInputCommand(InputAction.IA_LEFT, PointerEventType.PET_DOWN)
      const cmd4 = inputSystem.getInputCommand(InputAction.IA_RIGHT, PointerEventType.PET_DOWN)
      if (cmd != null || cmd2 != null || cmd3 != null || cmd4 != null) {
        if (this.danceArea_1.danceZone) {
          this.danceArea_1.danceSystem.dance()
        }
        if (this.danceArea_2.danceZone) {
          this.danceArea_2.danceSystem.routine = 'all'
          this.danceArea_2.danceSystem.dance()
        }
        if (this.danceArea_3.danceZone) {
          this.danceArea_3.danceSystem.routine = 'all'
          this.danceArea_3.danceSystem.dance()
        }
        if (this.danceArea_4.danceZone) {
          this.danceArea_4.danceSystem.routine = 'all'
          this.danceArea_4.danceSystem.dance()
        }
        if (this.danceArea_5.danceZone) {
          this.danceArea_5.danceSystem.routine = 'all'
          this.danceArea_5.danceSystem.dance()
        }
        if (this.danceArea_6.danceZone) {
          this.danceArea_6.danceSystem.routine = 'all'
          this.danceArea_6.danceSystem.dance()
        }
        if (this.danceArea_7.danceZone) {
          this.danceArea_7.danceSystem.routine = 'all'
          this.danceArea_7.danceSystem.dance()
        }
        if (this.danceArea_8.danceZone) {
          this.danceArea_8.danceSystem.routine = 'all'
          this.danceArea_8.danceSystem.dance()
        }
      }
    })
  }

  setUp(): void {
    // Base Scene.......................................
    this._scene = engine.addEntity()
    Transform.createOrReplace(this._scene, {
      position: Vector3.create(0, 0, 0),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1)
    })

    this.entity = engine.addEntity()
    Transform.createOrReplace(this.entity, {
      position: Vector3.create(8, 0, 8),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.createOrReplace(this.entity, {
      src: 'assets/scene/models/c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/Citytile.glb'
    })

    this.entity2 = engine.addEntity()
    Transform.createOrReplace(this.entity2, {
      position: Vector3.create(8, 0, 24),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.createOrReplace(this.entity2, {
      src: 'assets/scene/models/c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/Citytile.glb'
    })

    this.entity3 = engine.addEntity()
    Transform.createOrReplace(this.entity3, {
      position: Vector3.create(8, 0, 40),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.createOrReplace(this.entity3, {
      src: 'assets/scene/models/c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/Citytile.glb'
    })

    // Add Music manually Here........................................
    this.music = engine.addEntity()
    Transform.createOrReplace(this.music, {
      position: Vector3.create(8.32, 0.88, 27.96),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    AudioSource.createOrReplace(this.music, {
      audioClipUrl: 'sounds/',
      loop: true,
      playing: false
    })
    // ......................................................................

    // Casino ToolBox/////////////////////////////////////////
    this.toolbox = engine.addEntity()
    Transform.createOrReplace(this.toolbox, {
      position: Vector3.create(14.873678207397461, 0.09671890735626221, 28.87261199951172),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })

    // Ground/First Floor MainDoor ClickArea/////////////////
    this.clickArea = engine.addEntity()
    Transform.createOrReplace(this.clickArea, {
      position: Vector3.create(8, 0.05129086971282959, 3.475318908691406),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(5.2679362297058105, 5.57119607925415, 0.21571019291877747),
      parent: this._scene
    })

    // Ground Floor Images(EntranceRightSideV)//////////////////
    this.imageFromURL = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL, {
      position: Vector3.create(13, 5.098233938217163, 11.8459077835083),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(4, 7.5, 1),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL)
    Material.setPbrMaterial(this.imageFromURL, {
      texture: Material.Texture.Common({
        src: 'images/katie.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/katie.png'
      })
    })

    // Ground Floor Images(EntranceleftSideV)/////////////////////
    this.imageFromURL2 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL2, {
      position: Vector3.create(3, 5.098233938217163, 11.8459077835083),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(4, 7.5, 1),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL2)
    Material.setPbrMaterial(this.imageFromURL2, {
      texture: Material.Texture.Common({
        src: 'images/shift.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/shift.png'
      })
    })

    // Ground Floor Images(CathouseClubH)//////////////////////////
    this.imageFromURL3 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL3, {
      position: Vector3.create(0.7716683149337769, 6.480763816833496, 26.80219078063965),
      rotation: Quaternion.fromEulerDegrees(180, 90, 180),
      scale: Vector3.create(10.249049186706543, 4.674226760864258, 1.0000033378601074),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL3)
    Material.setPbrMaterial(this.imageFromURL3, {
      texture: Material.Texture.Common({
        src: 'images/cathouseclub.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/cathouseclub.png'
      })
    })

    // Ground Floor Images(VideoHallLeftV)////////////////
    this.imageFromURL4 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL4, {
      position: Vector3.create(3.5118160247802734, 5.087592124938965, 36.23207092285156),
      rotation: Quaternion.fromEulerDegrees(180, 180, 180),
      scale: Vector3.create(3.545692443847656, 4.674226760864258, 0.9777506589889526),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL4)
    Material.setPbrMaterial(this.imageFromURL4, {
      texture: Material.Texture.Common({
        src: 'images/CathouseBanner.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/CathouseBanner.png'
      })
    })

    // Ground Floor Images(VideoHallLeftV)////////////////
    this.imageFromURL5 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL5, {
      position: Vector3.create(12.316988945007324, 5.087592124938965, 36.20863723754883),
      rotation: Quaternion.fromEulerDegrees(180, 180, 180),
      scale: Vector3.create(3.545692443847656, 4.674226760864258, 0.9777506589889526),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL5)
    Material.setPbrMaterial(this.imageFromURL5, {
      texture: Material.Texture.Common({
        src: 'images/cathouse.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/cathouse.png'
      })
    })

    // Ground Floor Images(VideoHallLeftMultiLogo)//////////////
    this.imageFromURL6 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL6, {
      position: Vector3.create(15.594130516052246, 5.549926519393921, 40.695884704589844),
      rotation: Quaternion.fromEulerDegrees(180, 270, 180),
      scale: Vector3.create(8.295089721679688, 7.591179847717285, 1.0000035762786865),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL6)
    Material.setPbrMaterial(this.imageFromURL6, {
      texture: Material.Texture.Common({
        src: 'images/multiLogo.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/multiLogo.png'
      })
    })

    // Ground Floor VideoStream/////////////////////////
    this.videoStream = engine.addEntity()
    Transform.createOrReplace(this.videoStream, {
      position: Vector3.create(8.494, 4.19, 47.39051055908203),
      rotation: Quaternion.fromEulerDegrees(180, 180, 180),
      scale: Vector3.create(9.8353781700134277, 6.452238178253174, 1.0000009536743164),
      parent: this._scene
    })
    MeshCollider.setPlane(this.videoStream)
    MeshRenderer.setPlane(this.videoStream)
    VideoPlayer.create(this.videoStream, {
      src: videoStreamGroundSrc,
      playing: false,
      loop: true
    })
    const videoTexture = Material.Texture.Video({ videoPlayerEntity: this.videoStream })
    Material.setBasicMaterial(this.videoStream, {
      texture: videoTexture
    })
    pointerEventsSystem.onPointerDown(
      {
        entity: this.videoStream,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Play Video'
        }
      },
      () => {
        if (VideoPlayer.get(this.videoStream).playing === false) {
          VideoPlayer.getMutable(this.videoStream).playing = true
        }
      }
    )

    // Ground Floor VideoStream Trigger//////////////
    this.triggerArea = engine.addEntity()
    Transform.createOrReplace(this.triggerArea, {
      position: Vector3.create(7.9238691329956055, 0.03669559955596924, 40.7089729309082),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375),
      parent: this._scene
    })
    utils.triggers.addTrigger(
      this.triggerArea,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream).playing === false) {
          VideoPlayer.getMutable(this.videoStream).playing = true
        }
      }
    )

    // Ground Floor Images(ElevatorRightH)///////////////
    this.imageFromURL7 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL7, {
      position: Vector3.create(15.566365242004395, 5.2104194164276123, 21.8288516998291),
      rotation: Quaternion.fromEulerDegrees(180, 270, 180),
      scale: Vector3.create(4.556046485900879, 3.891484260559082, 0.9777539968490601),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL7)
    Material.setPbrMaterial(this.imageFromURL7, {
      texture: Material.Texture.Common({
        src: 'images/DancerBanner.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/DancerBanner.png'
      })
    })

    // Ground Floor Images(ElevatorRightH)///////////////
    this.imageFromURL8 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL8, {
      position: Vector3.create(15.566365242004395, 5.2104194164276123, 15.291440963745117),
      rotation: Quaternion.fromEulerDegrees(180, 270, 180),
      scale: Vector3.create(4.55604887008667, 3.891484260559082, 0.9777544736862183),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL8)
    Material.setPbrMaterial(this.imageFromURL8, {
      texture: Material.Texture.Common({
        src: 'images/catflix.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/catflix.png'
      })
    })

    // SecondFloor VideoStream////////////////////////
    this.videoStream2 = engine.addEntity()
    Transform.createOrReplace(this.videoStream2, {
      position: Vector3.create(7.777276039123535, 14.9, 1.1220264434814453),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(11.5, 4.105125379562378, 1.0000009536743164),
      parent: this._scene
    })
    MeshCollider.setPlane(this.videoStream2)
    MeshRenderer.setPlane(this.videoStream2)
    VideoPlayer.create(this.videoStream2, {
      src: videoStreamFloor2Src,
      playing: false,
      loop: true
    })
    const videoTexture2 = Material.Texture.Video({ videoPlayerEntity: this.videoStream2 })
    Material.setBasicMaterial(this.videoStream2, {
      texture: videoTexture2
    })
    pointerEventsSystem.onPointerDown(
      {
        entity: this.videoStream2,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Play Video'
        }
      },
      () => {
        if (VideoPlayer.get(this.videoStream2).playing === false) {
          VideoPlayer.getMutable(this.videoStream2).playing = true
        }
      }
    )

    // SecondFloor VideoStream Trigger (Center Small)//////
    this.triggerArea2 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea2, {
      position: Vector3.create(8.208050727844238, 10.446976661682129, 41.270591735839844),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(3.9054834842681885, 0.30041220784187317, 3.448207139968872),
      parent: this._scene
    })
    utils.triggers.addTrigger(
      this.triggerArea2,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream2).playing === false) {
          VideoPlayer.getMutable(this.videoStream2).playing = true
        }
      }
    )

    // SecondFloor VideoStream Trigger (CenterLong)/////////
    this.triggerArea3 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea3, {
      position: Vector3.create(7.667209625244141, 10.868925094604492, 24.61056900024414),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(6.003643989562988, 0.46044936776161194, 22.413347244262695),
      parent: this._scene
    })
    utils.triggers.addTrigger(
      this.triggerArea3,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream2).playing === false) {
          VideoPlayer.getMutable(this.videoStream2).playing = true
        }
      }
    )

    // SecondFloor VideoStream Trigger (LeftSide)/////////
    this.triggerArea4 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea4, {
      position: Vector3.create(14.138040542602539, 10.699254989624023, 10.29130744934082),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.710418701171875, 0.48614615201950073, 3.8268330097198486),
      parent: this._scene
    })
    utils.triggers.addTrigger(
      this.triggerArea4,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream2).playing === false) {
          VideoPlayer.getMutable(this.videoStream2).playing = true
        }
      }
    )

    // SecondFloor VideoStream Trigger (RightSide)////////
    this.triggerArea5 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea5, {
      position: Vector3.create(1.989222526550293, 10.688300132751465, 10.241878509521484),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.710418701171875, 0.47422197461128235, 3.8268330097198486),
      parent: this._scene
    })

    utils.triggers.addTrigger(
      this.triggerArea5,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream2).playing === false) {
          VideoPlayer.getMutable(this.videoStream2).playing = true
        }
      }
    )

    utils.triggers.addTrigger(
      this.triggerArea5,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream2).playing === false) {
          VideoPlayer.getMutable(this.videoStream2).playing = true
        }
      }
    )

    // Third Floor VideoStream////////////////////////////
    this.videoStream3 = engine.addEntity()
    Transform.createOrReplace(this.videoStream3, {
      position: Vector3.create(7.920665740966797, 21.22108688354492, 1.0475330352783203),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(10.6798388957977295, 4.8050894737243652, 1.0000009536743164),
      parent: this._scene
    })
    MeshCollider.setPlane(this.videoStream3)
    MeshRenderer.setPlane(this.videoStream3)
    VideoPlayer.create(this.videoStream3, {
      src: videoStreamFloor3Src,
      playing: false,
      loop: true
    })
    const videoTexture3 = Material.Texture.Video({ videoPlayerEntity: this.videoStream3 })
    Material.setBasicMaterial(this.videoStream3, {
      texture: videoTexture3
    })
    pointerEventsSystem.onPointerDown(
      {
        entity: this.videoStream3,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Play Video'
        }
      },
      () => {
        if (VideoPlayer.get(this.videoStream3).playing === false) {
          VideoPlayer.getMutable(this.videoStream3).playing = true
        }
      }
    )

    // Third Floor VideoStream Trigger (RightSide) ////////////
    this.triggerArea6 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea6, {
      position: Vector3.create(14.118785858154297, 17.828983306884766, 12.364847183227539),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.710418701171875, 0.5463231205940247, 3.8268330097198486),
      parent: this._scene
    })
    utils.triggers.addTrigger(
      this.triggerArea6,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream3).playing === false) {
          VideoPlayer.getMutable(this.videoStream3).playing = true
        }
      }
    )

    // Third Floor VideoStream Trigger (LeftSide) ///////////
    this.triggerArea7 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea7, {
      position: Vector3.create(1.9480457305908203, 17.84688377380371, 12.353545188903809),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(2.710418701171875, 0.5436291098594666, 3.8268330097198486),
      parent: this._scene
    })
    utils.triggers.addTrigger(
      this.triggerArea7,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream3).playing === false) {
          VideoPlayer.getMutable(this.videoStream3).playing = true
        }
      }
    )

    // Fourth Floor VideoStream (RightSide)///////
    this.videoStream4 = engine.addEntity()
    Transform.createOrReplace(this.videoStream4, {
      position: Vector3.create(8.043211212158203, 25.055, 30.861600875854492),
      rotation: Quaternion.fromEulerDegrees(0, 180, 0),
      scale: Vector3.create(3.211877460479736, 3, 1),
      parent: this._scene
    })
    MeshCollider.setPlane(this.videoStream4)
    MeshRenderer.setPlane(this.videoStream4)
    VideoPlayer.create(this.videoStream4, {
      src: videoStreamFloor4Src,
      playing: false,
      loop: true
    })
    const videoTexture4 = Material.Texture.Video({ videoPlayerEntity: this.videoStream4 })
    Material.setBasicMaterial(this.videoStream4, {
      texture: videoTexture4
    })
    pointerEventsSystem.onPointerDown(
      {
        entity: this.videoStream4,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Play Video'
        }
      },
      () => {
        if (VideoPlayer.get(this.videoStream4).playing === false) {
          VideoPlayer.getMutable(this.videoStream4).playing = true
        }
      }
    )

    // Fourth Floor VideoStream (LeftSide)////////////////
    this.videoStream5 = engine.addEntity()
    Transform.createOrReplace(this.videoStream5, {
      position: Vector3.create(8.043211212158203, 25.055, 27.55222152709961),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(3.211877460479736, 3, 1),
      parent: this._scene
    })
    MeshCollider.setPlane(this.videoStream5)
    MeshRenderer.setPlane(this.videoStream5)
    VideoPlayer.create(this.videoStream5, {
      src: videoStreamFloor4bSrc,
      playing: false,
      loop: true
    })
    const videoTexture5 = Material.Texture.Video({ videoPlayerEntity: this.videoStream5 })
    Material.setBasicMaterial(this.videoStream5, {
      texture: videoTexture5
    })
    pointerEventsSystem.onPointerDown(
      {
        entity: this.videoStream5,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Play Video'
        }
      },
      () => {
        if (VideoPlayer.get(this.videoStream5).playing === false) {
          VideoPlayer.getMutable(this.videoStream5).playing = true
        }
      }
    )

    // Rooftop Bannar Images(OutSideV)/////////////////////////////

    this.imageFromURL9 = engine.addEntity()
    Transform.createOrReplace(this.imageFromURL9, {
      position: Vector3.create(14.45, 31.00, 12.50),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(2.464900016784668, 4.48285484313965, 4.0000008344650269),
      parent: this._scene
    })
    MeshRenderer.setPlane(this.imageFromURL9)
    Material.setPbrMaterial(this.imageFromURL9, {
      texture: Material.Texture.Common({
        src: 'images/caturdaybanner.png'
      }),
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.3,
      emissiveTexture: Material.Texture.Common({
        src: 'images/caturdaybanner.png'
      })
    })

    // Fourth Floor NFT Picture Frame1///////////////////////////
    this.nftPictureFrame = engine.addEntity()
    Transform.createOrReplace(this.nftPictureFrame, {
      position: Vector3.create(0.50, 1.98, 15.0),
      rotation: Quaternion.fromEulerDegrees(0, 270, 0),
      scale: Vector3.create(6.00002384185791, 5.621730804443359, 0.45611241459846497),
      parent: this._scene
    })
    NftShape.create(this.nftPictureFrame, {
      urn: '' // Reemplaza con tu contrato e ID
    })
    MeshCollider.setPlane(this.nftPictureFrame)
    pointerEventsSystem.onPointerDown(
      {
        entity: this.nftPictureFrame,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Open UI'
        }
      },
      () => {
        void openNftDialog({
          urn: ''
        })
      }
    )

    // Fourth Floor NFT Picture Frame2///////////////////////////
    this.nftPictureFrame2 = engine.addEntity()
    Transform.createOrReplace(this.nftPictureFrame2, {
      position: Vector3.create(0.5295686721801758, 25.88374328613281, 33.56391143798828),
      rotation: Quaternion.fromEulerDegrees(0, 270, 0),
      scale: Vector3.create(6.000029563903809, 5.621730804443359, 0.45611265301704407),
      parent: this._scene
    })
    NftShape.create(this.nftPictureFrame2, {
      urn: '' // Reemplaza con tu contrato e ID
    })
    MeshCollider.setPlane(this.nftPictureFrame2)
    pointerEventsSystem.onPointerDown(
      {
        entity: this.nftPictureFrame2,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Open UI'
        }
      },
      () => {
        void openNftDialog({
          urn: ''
        })
      }
    )

    // Fourth Floor NFT Picture Frame3///////////////////////////
    this.nftPictureFrame3 = engine.addEntity()
    Transform.createOrReplace(this.nftPictureFrame3, {
      position: Vector3.create(0.5295686721801758, 25.88374328613281, 29.06391143798828),
      rotation: Quaternion.fromEulerDegrees(0, 270, 0),
      scale: Vector3.create(6.000032424926758, 5.621730804443359, 0.4561127722263336),
      parent: this._scene
    })
    NftShape.create(this.nftPictureFrame3, {
      urn: '' // Reemplaza con tu contrato e ID
    })
    MeshCollider.setPlane(this.nftPictureFrame3)
    pointerEventsSystem.onPointerDown(
      {
        entity: this.nftPictureFrame3,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Open UI'
        }
      },
      () => {
        void openNftDialog({
          urn: ''
        })
      }
    )

    // Fourth Floor NFT Picture Frame4///////////////////////////
    this.nftPictureFrame4 = engine.addEntity()
    Transform.createOrReplace(this.nftPictureFrame4, {
      position: Vector3.create(15.50, 1.88, 32.50),
      rotation: Quaternion.fromEulerDegrees(0, 270, 0),
      scale: Vector3.create(6.000035285949707, 5.621730804443359, 0.45611289143562317),
      parent: this._scene
    })
    NftShape.create(this.nftPictureFrame4, {
      urn: 'urn:decentraland:ethereum:erc721:0x9808226ED04e92F9380DA67C5606354FAe5891b0:1601' // Reemplaza con tu contrato e ID
    })
    MeshCollider.setPlane(this.nftPictureFrame4)
    pointerEventsSystem.onPointerDown(
      {
        entity: this.nftPictureFrame4,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Open UI'
        }
      },
      () => {
        void openNftDialog({
          urn: 'urn:decentraland:ethereum:erc721:0x9808226ED04e92F9380DA67C5606354FAe5891b0:1601'
        })
      }
    )

    // Top Floor TriggerArea////////////////////////////////
    this.triggerArea8 = engine.addEntity()
    Transform.createOrReplace(this.triggerArea8, {
      position: Vector3.create(8.126971244812012, 28.76057434082032, 34.119720458984375),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(5.48532772064209, 0.2400498241186142, 8.471725463867188),
      parent: this._scene
    })
    utils.triggers.addTrigger(
      this.triggerArea8,
      1,
      1,
      [{ type: 'box', scale: Vector3.create(10.423848152160645, 0.6103260517120361, 8.59271240234375) }],
      () => {
        if (VideoPlayer.get(this.videoStream6).playing === false) {
          VideoPlayer.getMutable(this.videoStream6).playing = true
        }
      }
    )

    // Top Floor VideoStream///////////////////////////////
    this.videoStream6 = engine.addEntity()
    Transform.createOrReplace(this.videoStream6, {
      position: Vector3.create(8.29113483428955, 32.2, 47.40890121459961),
      rotation: Quaternion.fromEulerDegrees(0, 0, 0),
      scale: Vector3.create(12.594584678649902, 5.65, 1.03),
      parent: this._scene
    })
    MeshCollider.setPlane(this.videoStream6)
    MeshRenderer.setPlane(this.videoStream6)
    VideoPlayer.create(this.videoStream6, {
      src: videoStreamFloor5Src,
      playing: false,
      loop: true
    })
    const videoTexture6 = Material.Texture.Video({ videoPlayerEntity: this.videoStream6 })
    Material.setBasicMaterial(this.videoStream6, {
      texture: videoTexture6
    })
    pointerEventsSystem.onPointerDown(
      {
        entity: this.videoStream6,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Play Video'
        }
      },
      () => {
        if (VideoPlayer.get(this.videoStream6).playing === false) {
          VideoPlayer.getMutable(this.videoStream6).playing = true
        }
      }
    )

    // Floor Buttons/////////////////////////////////////////

    // Ground Floor Buttons/////////////////////////////////////////

    // Ground Floor 1st floorbtn......................
    this.tofirstfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton, {
      position: Vector3.create(15.23768424987793, 1.6894843578338623, 23.796602249145508),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton, { src: this.floor_button_1 })
    const tofirstfloorbuttonCollider = engine.addEntity()
    Transform.create(tofirstfloorbuttonCollider, {
      position: Vector3.create(15.23768424987793, 1.6894843578338623, 23.796602249145508),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbuttonCollider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbuttonCollider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    // Ground Floor 2nd floorbtn......................
    this.tosecondfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton, {
      position: Vector3.create(15.227154731750488, 1.9373252391815186, 23.43264389038086),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton, { src: this.floor_button_2 })
    const tosecondfloorbuttonCollider = engine.addEntity()
    Transform.create(tosecondfloorbuttonCollider, {
      position: Vector3.create(15.227154731750488, 1.9373252391815186, 23.43264389038086),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbuttonCollider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbuttonCollider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Strip Club'
        }
      },
      () => {
        this.elevator(2)
      }
    )

    // Ground Floor 3rd floorbtn......................
    this.tothirdfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton, {
      position: Vector3.create(15.239447593688965, 1.7488524913787842, 23.079757690429688),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton, { src: this.floor_button_3 })
    const tothirdfloorbuttonCollider = engine.addEntity()
    Transform.create(tothirdfloorbuttonCollider, {
      position: Vector3.create(15.239447593688965, 1.7488524913787842, 23.079757690429688),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbuttonCollider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbuttonCollider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Exclusive XXX Content'
        }
      },
      () => {
        this.elevator(3)
      }
    )

    // Ground Floor 4th floorbtn......................
    this.tofourthfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton, {
      position: Vector3.create(15.241415023803711, 1.337921142578125, 23.0618896484375),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton, { src: this.floor_button_4 })
    const tofourthfloorbuttonCollider = engine.addEntity()
    Transform.create(tofourthfloorbuttonCollider, {
      position: Vector3.create(15.241415023803711, 1.337921142578125, 23.0618896484375),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbuttonCollider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbuttonCollider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'NFT Gallery'
        }
      },
      () => {
        this.elevator(4)
      }
    )

    // Ground Floor 5th loorbtn......................
    this.tofifthfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton, {
      position: Vector3.create(15.242955207824707, 1.1119731664657593, 23.43202209472656),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton, { src: this.floor_button_5 })
    const tofifthfloorbuttonCollider = engine.addEntity()
    Transform.create(tofifthfloorbuttonCollider, {
      position: Vector3.create(15.242955207824707, 1.1119731664657593, 23.43202209472656),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbuttonCollider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbuttonCollider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Soon'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    // Ground Floor top floorbtn......................
    this.totopfloorbutton = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton, {
      position: Vector3.create(15.22166633605957, 1.30178964138031, 23.835508346557617),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton, { src: this.floor_button_6 })
    const totopfloorbuttonCollider = engine.addEntity()
    Transform.create(totopfloorbuttonCollider, {
      position: Vector3.create(15.22166633605957, 1.30178964138031, 23.835508346557617),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbuttonCollider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbuttonCollider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Roof Top Beach Club'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    // Second Floor Buttons/////////////////////////////////////////

    // Second Floor 1st floorbtn......................
    this.tofirstfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton2, {
      position: Vector3.create(15.23768424987793, 11.706573486328125, 22.60639762878418),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton2, { src: this.floor_button_1 })
    const tofirstfloorbutton2Collider = engine.addEntity()
    Transform.create(tofirstfloorbutton2Collider, {
      position: Vector3.create(15.23768424987793, 11.706573486328125, 22.60639762878418),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton2Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton2Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Casino'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    // Second Floor 2nd floorbtn......................
    this.tosecondfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton2, {
      position: Vector3.create(15.227154731750488, 11.954414367675781, 22.24243927001953),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton2, {
      src: this.floor_button_2
    })
    const tosecondfloorbutton2Collider = engine.addEntity()
    Transform.create(tosecondfloorbutton2Collider, {
      position: Vector3.create(15.227154731750488, 11.954414367675781, 22.24243927001953),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton2Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton2Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(2)
      }
    )

    // Second Floor 3rd floorbtn......................
    this.tothirdfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton2, {
      position: Vector3.create(15.239447593688965, 11.765941619873047, 21.88955307006836),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton2, { src: this.floor_button_3 })
    const tothirdfloorbutton2Collider = engine.addEntity()
    Transform.create(tothirdfloorbutton2Collider, {
      position: Vector3.create(15.239447593688965, 11.765941619873047, 21.88955307006836),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton2Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton2Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Exclusive XXX Content'
        }
      },
      () => {
        this.elevator(3)
      }
    )
    // Second Floor 4th floorbtn......................
    this.tofourthfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton2, {
      position: Vector3.create(15.241415023803711, 11.355010032653809, 21.871685028076172),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton2, {
      src: this.floor_button_4
    })
    const tofourthfloorbutton2Collider = engine.addEntity()
    Transform.create(tofourthfloorbutton2Collider, {
      position: Vector3.create(15.241415023803711, 11.355010032653809, 21.871685028076172),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton2Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton2Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'NFT Gallery'
        }
      },
      () => {
        this.elevator(4)
      }
    )
    // Second Floor 5th floorbtn......................
    this.tofifthfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton2, {
      position: Vector3.create(15.242955207824707, 11.12906265258789, 22.241817474365234),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton2, { src: this.floor_button_5 })
    const tofifthfloorbutton2Collider = engine.addEntity()
    Transform.create(tofifthfloorbutton2Collider, {
      position: Vector3.create(15.242955207824707, 11.12906265258789, 22.241817474365234),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton2Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton2Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Soon'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    // Second Floor top floorbtn......................
    this.totopfloorbutton2 = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton2, {
      position: Vector3.create(15.22166633605957, 11.318879127502441, 22.64530372619629),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(1, 1, 1),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton2, { src: this.floor_button_6 })
    const totopfloorbutton2Collider = engine.addEntity()
    Transform.create(totopfloorbutton2Collider, {
      position: Vector3.create(15.22166633605957, 11.318879127502441, 22.64530372619629),
      rotation: Quaternion.create(0, 0, 0, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton2Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton2Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Roof Top Beach Club'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    // Third Floor Buttons/////////////////////////////////////////

    // Third Floor 1st floorbtn......................
    this.tofirstfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton3, {
      position: Vector3.create(0.7356014251708984, 18.60797882080078, 6.383121490478516),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton3, { src: this.floor_button_1 })
    const tofirstfloorbutton3Collider = engine.addEntity()
    Transform.create(tofirstfloorbutton3Collider, {
      position: Vector3.create(0.7356014251708984, 18.60797882080078, 6.383121490478516),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton3Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton3Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Casino'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    // Third Floor 2nd floorbtn......................
    this.tosecondfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton3, {
      position: Vector3.create(0.7461305260658264, 18.855819702148438, 6.747079372406006),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton3, {
      src: this.floor_button_2
    })
    const tosecondfloorbutton3Collider = engine.addEntity()
    Transform.create(tosecondfloorbutton3Collider, {
      position: Vector3.create(0.7461305260658264, 18.855819702148438, 6.747079372406006),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton3Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton3Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Strip Club'
        }
      },
      () => {
        this.elevator(2)
      }
    )

    // Third Floor 3rd floorbtn......................
    this.tothirdfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton3, {
      position: Vector3.create(0.7338376045227051, 18.667346954345703, 7.099966049194336),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton3, { src: this.floor_button_3 })
    const tothirdfloorbutton3Collider = engine.addEntity()
    Transform.create(tothirdfloorbutton3Collider, {
      position: Vector3.create(0.7338376045227051, 18.667346954345703, 7.099966049194336),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton3Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton3Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(3)
      }
    )

    // Third Floor 4th floorbtn......................
    this.tofourthfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton3, {
      position: Vector3.create(0.7318701148033142, 18.25641441345215, 7.117834091186523),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton3, {
      src: this.floor_button_4
    })
    const tofourthfloorbutton3Collider = engine.addEntity()
    Transform.create(tofourthfloorbutton3Collider, {
      position: Vector3.create(0.7318701148033142, 18.25641441345215, 7.117834091186523),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton3Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton3Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'NFT Gallery'
        }
      },
      () => {
        this.elevator(4)
      }
    )

    // Third Floor 5th floorbtn......................
    this.tofifthfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton3, {
      position: Vector3.create(0.7303299307823181, 18.030467987060547, 6.747701644897461),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton3, { src: this.floor_button_5 })
    const tofifthfloorbutton3Collider = engine.addEntity()
    Transform.create(tofifthfloorbutton3Collider, {
      position: Vector3.create(0.7303299307823181, 18.030467987060547, 6.747701644897461),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton3Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton3Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Soon'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    // Third Floor top floorbtn......................
    this.totopfloorbutton3 = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton3, {
      position: Vector3.create(0.7516188621520996, 18.220285415649414, 6.344215393066406),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(1.0000017881393433, 1, 1.0000017881393433),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton3, { src: this.floor_button_6 })
    const totopfloorbutton3Collider = engine.addEntity()
    Transform.create(totopfloorbutton3Collider, {
      position: Vector3.create(0.7516188621520996, 18.220285415649414, 6.344215393066406),
      rotation: Quaternion.create(-2.8469448630827733e-15, 1, -1.1920928955078125e-7, -2.2351741790771484e-8),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton3Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton3Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Roof Top Beach Club'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    // Fourth Floor Buttons/////////////////////////////////////////

    // Fourth Floor 1st floorbtn......................
    this.tofirstfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton4, {
      position: Vector3.create(15.349342346191406, 24.92435073852539, 24.03135871887207),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton4, { src: this.floor_button_1 })
    const tofirstfloorbutton4Collider = engine.addEntity()
    Transform.create(tofirstfloorbutton4Collider, {
      position: Vector3.create(15.349342346191406, 24.92435073852539, 24.03135871887207),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton4Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton4Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Casino'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    // Fourth Floor 2nd floorbtn......................
    this.tosecondfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton4, {
      position: Vector3.create(15.338813781738281, 25.172191619873047, 23.667400360107422),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton4, {
      src: this.floor_button_2
    })
    const tosecondfloorbutton4Collider = engine.addEntity()
    Transform.create(tosecondfloorbutton4Collider, {
      position: Vector3.create(15.338813781738281, 25.172191619873047, 23.667400360107422),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton4Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton4Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Strip Club'
        }
      },
      () => {
        this.elevator(2)
      }
    )
    // Fourth Floor 3rd floorbtn......................
    this.tothirdfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton4, {
      position: Vector3.create(15.351106643676758, 24.98371887207031, 23.314512252807617),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton4, { src: this.floor_button_3 })
    const tothirdfloorbutton4Collider = engine.addEntity()
    Transform.create(tothirdfloorbutton4Collider, {
      position: Vector3.create(15.351106643676758, 24.98371887207032, 23.314512252807617),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton4Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton4Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Exclusive XXX Content'
        }
      },
      () => {
        this.elevator(3)
      }
    )

    // Fourth Floor 4th floorbtn......................
    this.tofourthfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton4, {
      position: Vector3.create(15.353073120117188, 24.572786331176758, 23.29664421081543),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton4, {
      src: this.floor_button_4
    })
    const tofourthfloorbutton4Collider = engine.addEntity()
    Transform.create(tofourthfloorbutton4Collider, {
      position: Vector3.create(15.353073120117188, 24.572786331176758, 23.29664421081543),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton4Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton4Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(4)
      }
    )

    // Fourth Floor 5th floorbtn......................
    this.tofifthfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton4, {
      position: Vector3.create(15.3546142578125, 24.346839904785156, 23.666776657104492),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton4, { src: this.floor_button_5 })
    const tofifthfloorbutton4Collider = engine.addEntity()
    Transform.create(tofifthfloorbutton4Collider, {
      position: Vector3.create(15.3546142578125, 24.346839904785156, 23.666776657104492),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton4Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton4Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Soon'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    // Fourth Floor top floorbtn......................
    this.totopfloorbutton4 = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton4, {
      position: Vector3.create(15.333324432373047, 24.536657333374023, 24.07026481628418),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton4, { src: this.floor_button_6 })
    const totopfloorbutton4Collider = engine.addEntity()
    Transform.create(totopfloorbutton4Collider, {
      position: Vector3.create(15.333324432373047, 24.536657333374023, 24.07026481628418),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton4Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton4Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Roof Beach Club'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    // Top Floor Buttons/////////////////////////////////////////

    // Top Floor 1st floorbtn......................
    this.tofirstfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tofirstfloorbutton5, {
      position: Vector3.create(14.98353385925293, 30.0623836517334, 23.698261260986328),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofirstfloorbutton5, { src: this.floor_button_1 })
    const tofirstfloorbutton5Collider = engine.addEntity()
    Transform.create(tofirstfloorbutton5Collider, {
      position: Vector3.create(14.98353385925293, 30.0623836517334, 23.698261260986328),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofirstfloorbutton5Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofirstfloorbutton5Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Casino'
        }
      },
      () => {
        this.elevator(1)
      }
    )

    // Top Floor 2nd floorbtn......................
    this.tosecondfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tosecondfloorbutton5, {
      position: Vector3.create(14.973005294799805, 30.310224533081055, 23.33430290222168),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tosecondfloorbutton5, {
      src: this.floor_button_2
    })
    const tosecondfloorbutton5Collider = engine.addEntity()
    Transform.create(tosecondfloorbutton5Collider, {
      position: Vector3.create(14.973005294799805, 30.310224533081055, 23.33430290222168),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tosecondfloorbutton5Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tosecondfloorbutton5Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Strip Club'
        }
      },
      () => {
        this.elevator(2)
      }
    )

    // Top Floor 3rd floorbtn......................
    this.tothirdfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tothirdfloorbutton5, {
      position: Vector3.create(14.985298156738281, 30.12175178527832, 22.981414794921875),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tothirdfloorbutton5, { src: this.floor_button_3 })
    const tothirdfloorbutton5Collider = engine.addEntity()
    Transform.create(tothirdfloorbutton5Collider, {
      position: Vector3.create(14.985298156738281, 30.12175178527832, 22.981414794921875),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tothirdfloorbutton5Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tothirdfloorbutton5Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Exclusive XXX Content'
        }
      },
      () => {
        this.elevator(3)
      }
    )

    // Top Floor 4th floorbtn......................
    this.tofourthfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tofourthfloorbutton5, {
      position: Vector3.create(14.987264633178711, 29.710819244384766, 22.963546752929688),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofourthfloorbutton5, {
      src: this.floor_button_4
    })
    const tofourthfloorbutton5Collider = engine.addEntity()
    Transform.create(tofourthfloorbutton5Collider, {
      position: Vector3.create(14.987264633178711, 29.710819244384766, 22.963546752929688),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofourthfloorbutton5Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofourthfloorbutton5Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'NFT Gallery'
        }
      },
      () => {
        this.elevator(4)
      }
    )

    // Top Floor 5th floorbtn......................
    this.tofifthfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.tofifthfloorbutton5, {
      position: Vector3.create(14.988805770874023, 29.484872817993164, 23.33367919921875),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.tofifthfloorbutton5, { src: this.floor_button_5 })
    const tofifthfloorbutton5Collider = engine.addEntity()
    Transform.create(tofifthfloorbutton5Collider, {
      position: Vector3.create(14.988805770874023, 29.484872817993164, 23.33367919921875),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(tofifthfloorbutton5Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: tofifthfloorbutton5Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Soon'
        }
      },
      () => {
        this.elevator(5)
      }
    )

    // Top Floor top floorbtn......................
    this.totopfloorbutton5 = engine.addEntity()
    Transform.createOrReplace(this.totopfloorbutton5, {
      position: Vector3.create(14.96751594543457, 29.67469024658203, 23.737167358398438),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.create(this.totopfloorbutton5, { src: this.floor_button_6 })
    const totopfloorbutton5Collider = engine.addEntity()
    Transform.create(totopfloorbutton5Collider, {
      position: Vector3.create(14.96751594543457, 29.67469024658203, 23.737167358398438),
      rotation: Quaternion.create(1.3612528428953458e-14, -1.1920927533992653e-7, -1.173659524330694e-14, 1),
      scale: Vector3.create(0.2, 0.2, 0.2)
    })
    MeshCollider.setBox(totopfloorbutton5Collider)
    pointerEventsSystem.onPointerDown(
      {
        entity: totopfloorbutton5Collider,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Current Floor'
        }
      },
      () => {
        this.elevator(6)
      }
    )

    // Floor Buttons Ends Here/////////////////////////////////////////

    // Casino Main Door////////////////////////////////////////////////////
    this.door = engine.addEntity()
    Transform.createOrReplace(this.door, {
      position: Vector3.create(8.065906524658203, 2.3859095573425293, 3.5),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        0.7071068286895752,
        -8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.0000014305114746, 1, 1.0000014305114746),
      parent: this._scene
    })
    GltfContainer.create(this.door, {
      src: 'assets/scene/models/b8c79e3b-c157-4095-bb8d-a4bf9fb561b7/door.glb'
    })
    MeshCollider.setBox(this.door)
    pointerEventsSystem.onPointerDown(
      {
        entity: this.door,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Open Door'
        }
      },
      () => {
        this.prompt.show()
      }
    )


  // Rooftop Floor Images(Outside)//////////////////
     this.imageFromURL = engine.addEntity()
     Transform.createOrReplace(this.imageFromURL, {
       position: Vector3.create(7.992987823486328, 19.40340690612793, 0.5769305229187012),
       rotation: Quaternion.fromEulerDegrees(0, 0, 0),
       scale: Vector3.create(6.464900016784668, 17.48285484313965, 1.0000008344650269),
       parent: this._scene
     })
     MeshRenderer.setPlane(this.imageFromURL)
     Material.setPbrMaterial(this.imageFromURL, {
       texture: Material.Texture.Common({
         src: 'images/CathouseBanner.png'
       }),
       emissiveColor: Color4.White(),
       emissiveIntensity: 0.3,
       emissiveTexture: Material.Texture.Common({
         src: 'images/CathouseBanner.png'
       })
     })

     // Rooftop Floor Images(Top)//////////////////
     this.imageFromURL = engine.addEntity()
     Transform.createOrReplace(this.imageFromURL, {
       position: Vector3.create(14.73, 31.0, 12.48),
       rotation: Quaternion.fromEulerDegrees(0, 0, 0),
       scale: Vector3.create(3.50, 4.50, 1.0000008344650269),
       parent: this._scene
     })
     MeshRenderer.setPlane(this.imageFromURL)
     Material.setPbrMaterial(this.imageFromURL, {
       texture: Material.Texture.Common({
         src: 'images/cathouse.png'
       }),
       emissiveColor: Color4.White(),
       emissiveIntensity: 0.3,
       emissiveTexture: Material.Texture.Common({
         src: 'images/cathouse.png'
       })
     })

    // Third Floor BaseFile........................................
    this.thirdfloor = engine.addEntity()
    Transform.createOrReplace(this.thirdfloor, {
      position: Vector3.create(8.063750267028809, 0, 24.368267059326172),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        -0.7071068286895752,
        8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })
    GltfContainer.createOrReplace(this.thirdfloor, {
      src: 'assets/scene/models/195c413e-ee13-4dd5-9660-261163283d20/3.glb'
    })

    // Fourth Floor BaseFile........................................
    this.fourthfloor = engine.addEntity()

    Transform.createOrReplace(this.fourthfloor, {
      position: Vector3.create(8.044194221496582, 13.5, 23.946048736572266),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        -0.7071068286895752,
        8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.000002145767212, 1, 1.000002145767212),
      parent: this._scene
    })

    GltfContainer.createOrReplace(this.fourthfloor, {
      src: 'assets/scene/models/4a283613-46ca-4518-877f-64d39f76f85d/fourthFloor.glb'
    })

    // Ground/First Floor BaseFile........................................
    this.groundfirstfloor = engine.addEntity()

    Transform.createOrReplace(this.groundfirstfloor, {
      position: Vector3.create(8.040163040161133, 0, 24.287254333496094),
      rotation: Quaternion.create(
        -2.3439682286736973e-15,
        -0.7071068286895752,
        8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.0000011920928955, 1, 1.0000011920928955),
      parent: this._scene
    })

    GltfContainer.createOrReplace(this.groundfirstfloor, {
      src: 'assets/scene/models/547ade1d-9309-47a9-a4f7-ad43eab9e73d/groundFirstFloor.glb'
    })

    // Second Floor BaseFile........................................
    this.secondfloor = engine.addEntity()

    Transform.createOrReplace(this.secondfloor, {
      position: Vector3.create(8.048648834228516, 0, 24.342308044433594),
      rotation: Quaternion.create(-1.8755975488411692e-15, -0.70710688829422, 8.429370268459024e-8, 0.7071067690849304),
      scale: Vector3.create(1.0000016689300537, 1, 1.0000016689300537),
      parent: this._scene
    })

    GltfContainer.createOrReplace(this.secondfloor, {
      src: 'assets/scene/models/14968ac1-70ee-4922-82f6-26ea5a65669d/secondFloor.glb'
    })

    // Top Floor BaseFile........................................
    this.topfloor = engine.addEntity()

    Transform.createOrReplace(this.topfloor, {
      position: Vector3.create(8.000000953674316, 28.659902572631836, 24),
      rotation: Quaternion.create(
        -1.5394153601527394e-15,
        -0.7071068286895752,
        8.429369557916289e-8,
        0.7071068286895752
      ),
      scale: Vector3.create(1.0000011920928955, 1, 1.0000011920928955),
      parent: this._scene
    })

    GltfContainer.createOrReplace(this.topfloor, {
      src: 'assets/scene/models/0f3495ca-6b04-4654-a68e-c2eb204bce9b/TopFloor2.glb'
    })

    // Top Floor Video Screen Restriction1..................................
    this.invisibleWall = engine.addEntity()

    Transform.createOrReplace(this.invisibleWall, {
      position: Vector3.create(10.995407104492188, 28.65835189819336, 41.530277252197266),
      rotation: Quaternion.create(
        -7.165475217297754e-16,
        -0.37961769104003906,
        4.5253948144363676e-8,
        0.9251434803009033
      ),
      scale: Vector3.create(7.605588912963867, 8.16878604888916, 0.19648778438568115),
      parent: this._scene
    })

    // Top Floor Video Screen Restriction2..................................
    this.invisibleWall2 = engine.addEntity()

    Transform.createOrReplace(this.invisibleWall2, {
      position: Vector3.create(5.181422233581543, 28.65835189819336, 41.274803161621094),
      rotation: Quaternion.create(
        2.4620346688838165e-16,
        -0.35205742716789246,
        4.196850511561934e-8,
        -0.9359784722328186
      ),
      scale: Vector3.create(7.6055908203125, 8.16878604888916, 0.19648781418800354),
      parent: this._scene
    })

    // Top Floor Video Screen Restriction3..................................
    this.invisibleWall3 = engine.addEntity()

    Transform.createOrReplace(this.invisibleWall3, {
      position: Vector3.create(1.7791709899902344, 28.541820526123047, 43.311126708984375),
      rotation: Quaternion.create(
        2.0026262329079494e-15,
        0.005122534930706024,
        -6.106610772604881e-10,
        -0.9999869465827942
      ),
      scale: Vector3.create(2.885469913482666, 8.16878604888916, 0.19595777988433838),
      parent: this._scene
    })
    // Top Floor Video Screen Restriction4.......................................
    this.invisibleWall4 = engine.addEntity()

    Transform.createOrReplace(this.invisibleWall4, {
      position: Vector3.create(14.164913177490234, 28.541820526123047, 43.31113052368164),
      rotation: Quaternion.create(
        2.0026262329079494e-15,
        0.005122534930706024,
        -6.106610772604881e-10,
        -0.9999869465827942
      ),
      scale: Vector3.create(2.885469913482666, 8.16878604888916, 0.19595777988433838),
      parent: this._scene
    })

    // GoodBye Trigger Door
    Transform.create(this.goodbyeDoor, {
      position: Vector3.create(8.12, 0.88, 8.79),
      scale: Vector3.create(3, 5, 3),
      rotation: Quaternion.create(0, 0, 0),
      parent: this._scene
    })
    utils.triggers.addTrigger(this.goodbyeDoor, 1, 1, [{ type: 'box', scale: Vector3.create(3, 3, 3) }], () => {
      Tween.createOrReplace(this.door, {
        mode: Tween.Mode.Move({
          start: Vector3.create(8.065906524658203, 7, 3.5),
          end: Vector3.create(8.065906524658203, 2.3859095573425293, 3.5)
        }),
        duration: 1500,
        easingFunction: EasingFunction.EF_LINEAR
      })
      Transform.getMutable(this.closedDoor).scale = Vector3.create(3, 5, 3)
    })
    // Closed Trigger Door
    Transform.create(this.closedDoor, {
      position: Vector3.create(8.12, 0.88, 6.79),
      scale: Vector3.create(0, 0, 0),
      rotation: Quaternion.create(0, 0, 0),
      parent: this._scene
    })
    MeshCollider.setPlane(this.closedDoor)
    pointerEventsSystem.onPointerDown(
      {
        entity: this.closedDoor,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Open Door'
        }
      },
      () => {
        Transform.getMutable(this.closedDoor).scale = Vector3.create(0, 0, 0)
        openDialogWindow(this.clubGuard.entity, guardCheckPoint, 3)
        Tween.createOrReplace(this.door, {
          mode: Tween.Mode.Move({
            start: Vector3.create(8.065906524658203, 2.3859095573425293, 3.5),
            end: Vector3.create(8.065906524658203, 7, 3.5)
          }),
          duration: 1500,
          easingFunction: EasingFunction.EF_LINEAR
        })
      }
    )
  }

  elevator(floor: number): void {
    switch (floor) {
      case 1:
        void movePlayerTo({
          newRelativePosition: Vector3.create(12.43, 0.88, 24.14)
        })
        break
      case 2:
        if (!payMana) {
          accessSecondFloor()
        } else if (payMana) {
          void movePlayerTo({
            newRelativePosition: Vector3.create(12.43, 10.92, 24.14)
          })
        } else {
          openDialogWindow(this.clubGuard.entity, guardCheckPoint, 'mana')
        }
        break
      case 3:
        if (!payMana2) {
          accessThirdFloor()
        } else if (payMana2) {
          void movePlayerTo({
            newRelativePosition: Vector3.create(4.01, 18.08, 6.51)
          })
        } else {
          openDialogWindow(this.clubGuard.entity, guardCheckPoint, 'mana')
        }
        break
      case 4:
        void movePlayerTo({
          newRelativePosition: Vector3.create(14.25, 24.56, 23.9)
        })
        break
      case 5:
        // under construction
        break
      case 6:
        void movePlayerTo({
          newRelativePosition: Vector3.create(12.43, 28.92, 24.14)
        })
        break
    }
  }
}

