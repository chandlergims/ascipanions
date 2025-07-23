import mongoose from 'mongoose';

export interface IPet {
  _id?: string;
  userId: string;
  name: string;
  type: string;
  ascii: string[];
  color: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  level: number;
  experience: number;
  solanaWallet?: string;
  twitterUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PetSchema = new mongoose.Schema<IPet>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ascii: [{
    type: String,
    required: true
  }],
  color: {
    type: String,
    required: true,
    default: 'white'
  },
  rarity: {
    type: String,
    enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'],
    default: 'Common'
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  experience: {
    type: Number,
    default: 0,
    min: 0
  },
  solanaWallet: {
    type: String,
    required: false
  },
  twitterUsername: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export default mongoose.models.Pet || mongoose.model<IPet>('Pet', PetSchema);
