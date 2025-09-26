require('dotenv').config();        // 1) Load .env first
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// 2) Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// 3) Parse JSON bodies
app.use(express.json());

// 4) Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// 5) Define schema and model for paint enquiry
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  workType: { 
    type: String, 
    enum: ['Home', 'Shop', 'Industrial', 'Sign Board', 'Building Paint'], 
    required: true 
  },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// 6) POST /lead -> receive enquiry and save
app.post('/lead', async (req, res) => {
  try {
    const { name, mobile, address, workType, message } = req.body;

    if (!name || !mobile || !address || !workType) {
      return res.status(400).json({ error: 'कृपया सर्व आवश्यक माहिती भरा' });
    }

    const lead = new Lead({ name, mobile, address, workType, message });
    await lead.save();

    res.status(201).json({ 
      success: true, 
      message: 'धन्यवाद 🙏 आम्ही 1-2 दिवसात call करू!' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 7) GET /leads -> list all enquiries
app.get('/leads', async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

// 8) Start server
const PORT = process.env.PORT || 3000;   // deploy-friendly
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
