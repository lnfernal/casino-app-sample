const express = require("express");
const middlewares = require("./middleware");
const { checkJwt, checkKyc } = middlewares;

const router = express.Router();

/**
 * Gets a discount coupon 
 */
router.get("/:clientId/coupon", checkJwt, checkKyc, async (req, res) => {
  try {
    const discount = Math.round(Math.random() * 100);
    res.json({
      status: 200,
      message: `${discount}% OFF Coupon`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
