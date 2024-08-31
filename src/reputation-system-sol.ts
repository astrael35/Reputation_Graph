import { ReputationUpdated as ReputationUpdatedEvent } from "../generated/ReputationSystem.sol/ReputationSystem_sol";
import { ReputationUpdated } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

// Handler function for ReputationUpdated event
export function handleReputationUpdated(event: ReputationUpdatedEvent): void {
  // Create a unique ID using a combination of transaction hash and log index
  let entityId = event.transaction.hash.concatI32(event.logIndex.toI32());

  // Load the entity if it already exists or create a new one
  let entity = ReputationUpdated.load(entityId);

  if (!entity) {
    entity = new ReputationUpdated(entityId);
  }

  // Set entity fields using event parameters
  entity.user = event.params.user; // Assuming 'user' is of type Address
  entity.newReputation = event.params.newReputation;

  // Set entity metadata fields
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  // Save the entity to the store
  entity.save();
}
