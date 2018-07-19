import {Schema, model, Document} from 'mongoose';

var storeSearchSchema: Schema = new Schema ({
    search: {
        type: String,
        unique: true,
        sparse: true
    },
    time: Date,
    counter: Number
});

    
    storeSearchSchema.index({
        search: 1
    }, {
        unique: true
    });
    
export default model<Document>('search', storeSearchSchema);


