import mongoose from 'mongoose';
const { Schema } = mongoose;

const notesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true,
  },
  tags:{
    type: String,
    default: "general",
  },
  date:{
    type: Date,
    default: Date.now
  },
});

const notes = mongoose.model('notes', notesSchema);
export default notes;