import { executeTask } from '@dcl/sdk/ecs'
import { movePlayerTo } from '~system/RestrictedActions'
import { abi } from './abi/abi'
import * as EthConnect from 'eth-connect'
import { Vector3 } from '@dcl/sdk/math'
import { getPlayer } from '@dcl/sdk/src/players'
import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'

// Mana Pay Function to access 2nd Floor....................
export let payMana: boolean = false

export function accessSecondFloor(): void {
  executeTask(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const provider = await createEthereumProvider()
      console.log(provider)
      const requestManager = new EthConnect.RequestManager(provider)
      const factory = new EthConnect.ContractFactory(requestManager, abi)
      const contract = (await factory.at(
        '0xe7334cf43532423bfd163b32aCc0D72922132226' // Ropsten's MANAToken address// Change with creator wallet address.
      )) as any
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const player = await getPlayer()
      const address = player?.userId
      console.log(address)
      const res = await contract.setBalance(
        address,
        100, // Vip Access Fee defaulted to (0) change it here.....
        {
          from: address
        }
      )
      console.log(res)
      payMana = true
      void movePlayerTo({ newRelativePosition: Vector3.create(12.43, 10.92, 24.14) })
    } catch (error: any) {
      console.log(error.toString())
    }
  })
}

// Mana Pay Function to access 3rd Floor....................
export let payMana2: boolean = false
export function accessThirdFloor(): void {
  executeTask(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const provider = await createEthereumProvider()
      console.log(provider)
      const requestManager = new EthConnect.RequestManager(provider)
      const factory = new EthConnect.ContractFactory(requestManager, abi)
      const contract = (await factory.at(
        '0xe7334cf43532423bfd163b32aCc0D72922132226' // Ropsten's MANAToken address// Change with creator wallet address.
      )) as any
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const player = await getPlayer()
      const address = player?.userId
      console.log(address)
      const res = await contract.setBalance(
        address,
        100, // Vip Access Fee defaulted to (0) change it here.....
        {
          from: address
        }
      )
      console.log(res)
      payMana2 = true
      void movePlayerTo({ newRelativePosition: Vector3.create(4.01, 18.08, 6.51) })
    } catch (error: any) {
      console.log(error.toString())
    }
  })
}
