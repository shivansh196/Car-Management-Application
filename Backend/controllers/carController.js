const Car = require('../models/Car');

exports.createCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const images = req.files.map(file => file.path);
    const car = new Car({
      title,
      description,
      tags,
      images,
      owner: req.user._id
    });
    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchCars = async (req, res) => {
  try {
    const { keyword } = req.query;
    const cars = await Car.find({
      owner: req.user._id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, owner: req.user._id });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { title, description, tags },
      { new: true }
    );
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
