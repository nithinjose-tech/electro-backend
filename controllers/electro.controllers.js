const Electro = require("../models/electro.model.js");
// Retrieve and return all Electros from the database.
exports.findAll = (req, res) => {
  Electro.find()
    .then((Electros) => {
      res.send(Electros);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of Electros.",
      });
    });
};
// Create and Save a new Electro
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  // Create a new Electro

  const electro = new Electro({
    role: req.body.role,
    name: req.body.name,
    address: req.body.address,
    meterId: req.body.meterId,
    ComplainsandServices: req.body.ComplainsandServices,
    consumedEnergy: req.body.consumedEnergy,
    email: req.body.email,
    phone: req.body.phone,
    rate: req.body.rate,
    type: req.body.type,
    systemType: req.body.systemType,
    notification: req.body.notification,
  });
  // Save Electro in the database
  electro
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while creating new Electro.",
      });
    });
};
// Find a single Electro with a id
exports.findOne = (req, res) => {
  Electro.findById(req.params.id)
    .then((Electro) => {
      if (!Electro) {
        return res.status(404).send({
          message: "Electro not found with id " + req.params.id,
        });
      }
      res.send(Electro);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Electro not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error getting Electro with id " + req.params.id,
      });
    });
};
// Update a Electro identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }

  Electro.findOne({ _id: req.params.id }, async (err, doc) => {
    if (doc) {
      console.log(doc, req.params.id);
      const needed = await doc.ComplainsandServices;
      const neededNotification = await doc.notification;
      // const index = await needed.findIndex((element,index)=>element._id===)
      // needed[index]={}
      console.log(needed, "hdftydsfygyt");
      doc.ComplainsandServices = [...needed, ...req.body.ComplainsandServices];
      doc.notification = [...neededNotification, ...req.body.notification];
      doc.markModified("ComplainsandServices");
      doc.markModified("notification");
      doc.save((err, docs) => {
        // console.log(err, docs);
        if (err) {
          res.status(404).send({ error: err });
        }
      });
    }
  });
  // Find Electro and update it with the request body

  Electro.findByIdAndUpdate(
    req.params.id,
    {
      role: req.body.role,
      name: req.body.name,
      address: req.body.address,
      meterId: req.body.meterId,
      // ComplainsandServices: req.body.ComplainsandServices,
      consumedEnergy: req.body.consumedEnergy,
      email: req.body.email,
      phone: req.body.phone,
      rate: req.body.rate,
      type: req.body.type,
      systemType: req.body.systemType,
    },
    { new: true }
  )
    .then((Electro) => {
      if (!Electro) {
        return res.status(404).send({
          message: "Electro not found with id " + req.params.id,
        });
      }
      res.send(Electro);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Electro not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating Electro with id " + req.params.id,
      });
    });
};
// Delete a Electro with the specified id in the request
exports.delete = (req, res) => {
  Electro.findByIdAndRemove(req.params.id)
    .then((Electro) => {
      if (!Electro) {
        return res.status(404).send({
          message: "Electro not found with id " + req.params.id,
        });
      }
      res.send({ message: "Electro deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Electro not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete Electro with id " + req.params.id,
      });
    });
};
