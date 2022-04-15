const express = require("express");
const auth0Service = require("../services/auth0service");
const middlewares = require("./middleware");
const { checkJwt, checkRequiredScope } = middlewares;

const router = express.Router();

/**
 * Gets the KYC requirement of the client.
 */
router.get( "/:clientId/kyc", checkJwt, checkRequiredScope("update:kycrequirement"), async (req, res) => {
    try {
      const result = await auth0Service.getKycRequirement(req.params.clientId);
      res.json({
        status: 200,
        message: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  }
);

/**
 * Updates the KYC requirement of the client.
 */
router.patch("/:clientId/kyc", checkJwt, checkRequiredScope("update:kycrequirement"), async (req, res) => {
  try {
    const result = await auth0Service.updateKycRequirement(
      req.params.clientId,
      req.query.enable
    );
    res.json({
      status: 200,
      message: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
