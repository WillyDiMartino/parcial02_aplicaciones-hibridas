import mongoose, { Schema } from "mongoose";

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    team: {type: Schema.Types.ObjectId, ref: "teams", default: null},
    number: { type: Number, required: true },
    birth: { type: Date, required: true },
    country: { type: String, required: true },
    raceWins: { type: Number, required: true },
    podiums: { type: Number, required: true },
    points24: { type: Number, required: true },
    grandPrixEntered: { type: Number, required: true },
    worldChampionships: { type: Number, required: true },
    driverImg: { type: String, required: true }
});

export default mongoose.model("Driver", driverSchema);
