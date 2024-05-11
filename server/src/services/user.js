import { where } from "sequelize";
import db from "../models";

// GET CURRENT
// export const getOne = (id) => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.User.findOne({
//             where: { id },
//             raw: true,
//             attributes: {
//                 exclude: ['password']
//             }
//         })
//         resolve({
//             err: response ? 0 : 1,
//             msg: response ? 'OK' : 'Failed to get User.',
//             response
//         })
//     } catch (error) {
//         reject(error)
//     }
// })

export const getUserByUserId = (userId) => new Promise(async (resolve, reject) => {
    try {
        // Find all comments that belong to the specified postId
        let user = await db.User.findOne({
          where: {
            id: userId,
          },
          raw: true,
          attributes: {
            exclude: ["password"],
          },
        });
        // If the user is found and they are an administrator (isAdmin: true)
        if (user && !user.isAdmin) {
          resolve({
            err: 0,
            msg: "OK",
            response: user,
          });
        } else if (user && user.isAdmin) {
          // If the user is found but is not an administrator
          resolve({
            err: 0,
            msg: "User is an admin.",
            response: user,
          });
        } else {
          // If the user is not found
          resolve({
            err: 1,
            msg: "Failed to get User.",
            response: null,
          });
        }
      } catch (error) {
        console.error("Error getting comments by postId:", error);
        reject("Error getting comments by postId");
      }
    });

export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        // Find the user by ID in the database
        const user = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        });

        // If the user is found and they are an administrator (isAdmin: true)
        if (user && !user.isAdmin) {
            resolve({
                err: 0,
                msg: 'OK',
                response: user
            });
        } else if (user && user.isAdmin) {
            // If the user is found but is not an administrator
            resolve({
                err: 0,
                msg: 'User is an admin.',
                response: user
            });
        } else {
            // If the user is not found
            resolve({
                err: 1,
                msg: 'Failed to get User.',
                response: null
            });
        }
    } catch (error) {
        // Reject the promise with the caught error
        reject(error);
    }
});

export const updateUser = (payload, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            where: { id }
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'updated' : 'Failed to update User.',
        })
    } catch (error) {
        reject(error)
    }
})

export const deleteUser = (payload, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.delete(payload, {
                where: { id }
            })
            if (id === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            await db.User.findByIdAndDelete(payload, { where: { id } })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}