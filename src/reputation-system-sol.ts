import { ReputationUpdated as ReputationUpdatedEvent } from "../generated/ReputationSystem.sol/ReputationSystem.sol"
import { ReputationUpdated } from "../generated/schema"

export function handleReputationUpdated(event: ReputationUpdatedEvent): void {
  let entity = new ReputationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.newReputation = event.params.newReputation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
