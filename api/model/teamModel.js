import mongoose, { Schema } from "mongoose";

const teamsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    base: {type: String, required: true},
    teamChief: {type: String, required: true},
    powerUnit: {type: String, required: true},
    firstEntry: {type: Number, required: true},
    constructorPoints: {type: Number, required: true},
    constructorChampionships: {type: Number, required: true},
    driverOne: {type: Schema.Types.ObjectId, ref: "Driver", default: null},
    driverTwo: {type: Schema.Types.ObjectId, ref: "Driver", default: null},
    logoImg: {type: String, required: true}
});

export default mongoose.model("teams", teamsSchema);
 null