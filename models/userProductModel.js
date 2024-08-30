import { db } from "../config/db.js";
import { hash } from "bcrypt";
import { getProduct } from './productModel.js';

const TABLENAME = 'users_product';

db.schema.hasTable(TABLENAME).then(function (exists) {
    if(!exists) {
        return db.schema.createTable(TABLENAME, function (t) {
            t.increments('id').primary();
            t.integer('user_id').notNullable();
            t.integer('product_id').notNullable();
        });
    }
});

export const createUserProduct = (user_id, product_id) => {
    try {
        return db(TABLENAME).
            insert({ user_id, product_id });
    } catch(error) {
        console.error('Error in createUserProduct ', error);
    }
};

export const createUserProductTRX = async (trx, email, product_id) => {
    try {
        // Fetch the user ID based on the provided email
        const user = await trx('users').select('id').where({ email: email }).first();

        if(user) {
            // Insert the user ID into the user_products table
            const result = await trx(TABLENAME).insert({
                user_id: user.id,
                product_id
                // other columns can be added here
            })
                .returning();

            console.log('User product inserted successfully.');
            return result;
        } else {
            console.log('User not found.');
        }
    } catch(error) {
        console.error('Error inserting user product:', error);
    }
};

export const getUserProducts = async (email) => {
    try {
        // Fetch the user ID based on the provided email
        const user = await db('users').select('id').where({ email: email }).first();

        if(user) {
            // Insert the user ID into the user_products table
            const productIDs = await db(TABLENAME)
                .select('product_id')
                .where('user_id', '=', user.id)
                .pluck('product_id');

            if(productIDs){
                const result = await getProduct(productIDs)
                console.log('User products selected successfully.');
                return result
            }
        } else {
            console.log('User not found.');
        }
    } catch(error) {
        console.error('Error selecting user product:', error);
    }
};