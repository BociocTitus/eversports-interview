import express, { Request, Response } from "express";
import { validateCreateMembershipRequestBody } from "../validations/membership.validations";
import membershipPeriods from "../../data/membership-periods.json"
import memberships from "../../data/memberships.json"
import { createMembership } from "../service/membership.service";
import { createMembershipPeriods } from "../service/membership-period.service";
import { CreateMembershipRequest } from "./requests/create-membership.requests";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const rows = []
  for (const membership of memberships) {
    // Normally I would correct this code, however in order to keep the contract we will create a TODO here
    // This needs to be corrected
    // const periods = membershipPeriods.filter(p => p.membership === membership.id)
    rows.push({ membership, periods: [] })
  }
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
