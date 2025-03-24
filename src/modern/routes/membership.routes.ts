import express, { Request, Response } from "express";
import { validateCreateMembershipRequestBody } from "../validations/membership.validations";
import memberships from "../../data/memberships.json"
import membershipPeriods from "../../data/membership-periods.json";
import { createMembership } from "../service/membership.service";
import { createMembershipPeriods } from "../service/membership-period.service";
import { CreateMembershipRequest } from "./requests/create-membership.requests";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  // TODO 
  // Check if this is the correct code
  // const periods = membershipPeriods.filter((p: { membership: number; }) => p.membership === membership.id)
  // Currently this is the code in the legacy server which will return an empty list as there is no membershipId field in the membership period list
  // const periods = membershipPeriods.filter(p => p.membershipId === membership.id)
  const rows = memberships
    .map(membership => {
      return { membership, periods: [] }
    });
  res.status(200).json(rows);
})

router.post("/", (req: Request, res: Response) => {
  const createMembershipRequest = req.body as CreateMembershipRequest;
  const errorMessage = validateCreateMembershipRequestBody(createMembershipRequest);
  if (errorMessage) {
    return res.status(400).json({ message: errorMessage })
  }

  const newMembership = createMembership(createMembershipRequest);
  const membershipPeriods = createMembershipPeriods(newMembership);

  res.status(201).json({ membership: newMembership, membershipPeriods });
})

export default router;
