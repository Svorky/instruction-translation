import { db } from "../config/db.js";
import { hash } from "bcrypt";

const TABLENAME = 'users';
const TABLEFIELDS = ["id", "product_id", "language_id", "translation", 'original', "active", "date"];

db.schema.hasTable(TABLENAME).then(function (exists) {
    if(!exists) {
        return db.schema.createTable(TABLENAME, function (t) {
            t.increments('id').primary();
            t.string('email',50).notNullable()
            t.string('password',500).notNullable()
            t.string('token',500)
        });
    }
});

export async function createUser(userinfo) {
  const { username, password, email, first_name, last_name } = userinfo;

  const trx = await db.transaction();

  try {
    // insert user data into 'users' table
    //hash the password and insert into the' hashpwd table
    const hashPassword = await hash(password + "", 10);

    const [user] = await trx(TABLENAME).insert({ email, password: hashPassword }, [
      "email",
      "id",
    ]);

    // await trx("hashpwd").insert({
    //   username: user.username,
    //   password: hashPassword,
    // });
    await trx.commit();

    return user;
  } catch(error) {
    await trx.rollback();
    console.log(error);
    throw error;
  }
}
export async function getUserByUsername(email = "", username = "") {
  try {
    const user = await db(TABLENAME)
      .select("id", "email", "password")
      .where("email", email)
      .first();
    return user;
  } catch(error) {
    throw error;
  }
}
export async function getAllUsers() {
  try {
    const users = await db(TABLENAME);
    return users;
  } catch(error) {
    throw error;
  }
}
export async function getUserById(id) {
  try {
    const users = await db(TABLENAME).where({ id });
    return users;
  } catch(error) {
    throw error;
  }
}
export async function updateRefreshToken(refresh, id) {
  try {
    const user = await db(TABLENAME)
      .update({ token: refresh })
      .where({ id });
    return user;
  } catch(error) {
    throw error;
  }
}
