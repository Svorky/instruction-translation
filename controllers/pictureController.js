import * as pictureModel from '../models/pictureModel.js';

export const addPicture = async (req, res) => {
    const { product_id, picture } = req.body;
    const insert = {
        product_id,
        picture,
        active: true
    };
    pictureModel.insertRecord(insert)
        .then(result => {
            if(result[0].id) {
                res.json({
                    status: 'success',
                    data: {
                        ...result[0],
                        picture: result[0]?.picture.toString()
                    }
                });
            } else {
                res.json({
                    status: 'failed',
                    data: result
                });
            }
        });
};