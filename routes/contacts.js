import express from "express";
import { body, validationResult } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import Contact from "../models/Contacts.js";

const contactsRouter = express.Router();

// @ /api/contacts
//  get a user's contacts
//  Private
contactsRouter.get("/", authMiddleware, async (req, res) => {
    try {
        let contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// @ /api/contacts
//  post a new contact
//  Private
contactsRouter.post(
    "/",
    [
        body("name", "Please enter a name").not().isEmpty(),
        body("email", "Please enter a email address").isEmail(),
        authMiddleware,
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, type } = req.body;

        try {
            let contact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id,
            });
            await contact.save();
            res.json(contact);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

// @ /api/contacts
//  update a user's contact
//  Private
contactsRouter.put("/:id", authMiddleware, async (req, res) => {
    const { name, email, phone, type } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (type) updates.type = type;

    try {
        let contact = Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: "Contact not found" });
        }

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        const newContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        );
        res.json(newContact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// @ /api/contacts
//  delete a user's contact
//  Private
contactsRouter.delete("/:id", authMiddleware, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.send("Contact deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

export default contactsRouter;
