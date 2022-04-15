const express = require("express");
const auth0Service = require("../services/auth0service");

const router = express.Router();

/**
 * Gets the client information
 */
router.get( "/:clientId", async (req, res) => {
    try {
      const result = await auth0Service.getClientInfo(req.params.clientId);
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

module.exports = router;