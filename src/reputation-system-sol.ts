import { ReputationUpdated as ReputationUpdatedEvent } from "../generated/ReputationSystem.sol/ReputationSystem_sol";
import { ReputationUpdated } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleReputationUpdated(event: ReputationUpdatedEvent): void {
  let entityId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let entity = ReputationUpdated.load(entityId);

  if (!entity) {
    entity = new ReputationUpdated(entityId);
  }

  entity.user = event.params.user;
  entity.newReputation = event.params.newReputation;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
