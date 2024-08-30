import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ReputationUpdated } from "../generated/schema"
import { ReputationUpdated as ReputationUpdatedEvent } from "../generated/ReputationSystem.sol/ReputationSystem.sol"
import { handleReputationUpdated } from "../src/reputation-system-sol"
import { createReputationUpdatedEvent } from "./reputation-system-sol-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let newReputation = BigInt.fromI32(234)
    let newReputationUpdatedEvent = createReputationUpdatedEvent(
      user,
      newReputation
    )
    handleReputationUpdated(newReputationUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ReputationUpdated created and stored", () => {
    assert.entityCount("ReputationUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ReputationUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ReputationUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newReputation",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
