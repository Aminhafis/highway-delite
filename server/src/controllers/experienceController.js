import Experience from "../models/Experience.js";

// GET /experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({}, "name description imageUrl location price slots");
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /experiences/:id
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ error: "Not found" });
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
