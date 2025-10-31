import Promo from '../models/Promo.js';

// POST /promo/validate
export const validatePromo = async (req, res) => {
  const { promoCode } = req.body;
  if (!promoCode) return res.status(400).json({ error: 'Promo code required' });

  try {
    const promo = await Promo.findOne({ code: promoCode, active: true });
    if (!promo)
      return res.status(404).json({ error: 'Invalid or inactive promo code' });
    res.json(promo);
  } catch (err) {
    res.status(500).json({ error: 'Error validating promo code' });
  }
};
