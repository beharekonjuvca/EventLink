const express = require("express");
const organizationController = require("../controllers/organizationController");
const adminController = require("../controllers/adminController"); // Import the admin controller
const router = express.Router();
const multer = require("multer");
const path = require("path");
// Adjust the path as necessary
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/organizations");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
const fs = require("fs");
const dir = "./uploads/organizations";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const allowAdminOrOrganization = (req, res, next) => {
  // First try to authenticate as admin
  adminController.authMiddlewareAdmin(req, res, () => {
    // If admin auth fails, it will call this next function to try organization auth
    organizationController.authMiddlewareOrganization(req, res, next);
  });
};
// Routes for the Organization
router.post(
  "/",
  adminController.authMiddlewareAdmin,
  organizationController.createOrganization
); // Only admins can create organizations
router.post("/login", organizationController.loginOrganization);

// Protected routes
router.get(
  "/",
  organizationController.authMiddlewareOrganization,
  organizationController.getAllOrganizations
);
router.get(
  "/:id",
  organizationController.authMiddlewareOrganization,
  organizationController.getOrganization
);
router.put(
  "/:id",
  allowAdminOrOrganization,
  organizationController.updateOrganization
);
router.delete(
  "/:id",
  organizationController.authMiddlewareOrganization,
  organizationController.deleteOrganization
);
router.post(
  "/upload/:id/",
  upload.single("picture"),
  organizationController.uploadPicture
);

module.exports = router;
