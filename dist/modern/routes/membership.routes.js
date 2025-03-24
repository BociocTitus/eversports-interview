"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const membership_validations_1 = require("../validations/membership.validations");
const membership_periods_json_1 = __importDefault(require("../../data/membership-periods.json"));
const memberships_json_1 = __importDefault(require("../../data/memberships.json"));
const membership_service_1 = require("../service/membership.service");
const membership_period_service_1 = require("../service/membership-period.service");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    const rows = [];
    for (const membership of memberships_json_1.default) {
        const periods = membership_periods_json_1.default.filter(p => p.membership === membership.id);
        rows.push({ membership, periods });
    }
    res.status(200).json(rows);
});
router.post("/", (req, res) => {
    const createMembershipRequest = req.body;
    const errorMessage = (0, membership_validations_1.validateCreateMembershipRequestBody)(createMembershipRequest);
    if (errorMessage) {
        return res.status(400).json({ message: errorMessage });
    }
    const newMembership = (0, membership_service_1.createMembership)(createMembershipRequest);
    (0, membership_period_service_1.createMembershipPeriod)(newMembership);
    res.status(201).json({ membership: newMembership, membershipPeriods: membership_periods_json_1.default });
    throw new Error('not implemented');
});
exports.default = router;
