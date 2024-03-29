const express = require("express");
const router = express.Router();
const { getContacts, getContact, createContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// router.route('/').get(getContacts);
// router.route('/').post(createContact)
// router.route("/:id").get(getContact)
// router.route('/:id').put(updateContact)
// router.route('/:id').delete(deleteContact)

// we can write them all in single line if they have same route(here we can create 2 route for 5 routes)

router.use(validateToken);
router.route('/').get(getContacts).post(createContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;
