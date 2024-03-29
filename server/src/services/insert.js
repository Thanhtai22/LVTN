import db from '../models'
import bcrypt, { hash } from 'bcryptjs'
import { v4 } from 'uuid'
import chothuecanho from '../../data/chothuecanho.json'
import chothuematbang from '../../data/chothuematbang.json'
import nhachothue from '../../data/nhachothue.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import generateCode from '../ultis/generateCode';
require('dotenv').config()
const dataBody = chothuephongtro.body

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const insertService = () => new Promise(async (resolve, reject) => {
    try {
        dataBody.forEach(async (item) => {
            let postId = v4();
            let labelCode = generateCode(4);
            let attributesId = v4();
            let userId = v4();
            let overviewId = v4();
            let imagesId = v4();
            await db.Post.create({
                id: postId,
                title: item?.header?.tilte,
                star: item?.header?.star,
                labelCode,
                address: item?.header?.address,
                attributesId,
                categoryCode: 'CTPT',
                description: JSON.stringify(item?.mainContent?.content),
                userId,
                overviewId,
                imagesId
            })
            await db.Attribute.create({
                id: attributesId,
                price: item?.header?.attributes?.price,
                acreage: item?.header?.attributes?.acreage,
                published: item?.header?.attributes?.published,
                hashtag: item?.header?.attributes?.hashtag,

            })
            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(item?.images)
            })
            await db.Label.create({
                code: labelCode,
                value: item?.header?.class?.classType
            })
            await db.Overview.create({
                id: overviewId,
                code: item?.overView?.content.find(i => i.name === "Mã tin:")?.content,
                area: item?.overView?.content.find(i => i.name === "Khu vực")?.content,
                type: item?.overView?.content.find(i => i.name === "Loại tin rao:")?.content,
                target: item?.overView?.content.find(i => i.name === "Đối tượng thuê:")?.content,
                bonus: item?.overView?.content.find(i => i.name === "Gói tin:")?.content,
                created: item?.overView?.content.find(i => i.name === "Ngày đăng:")?.content,
                expired: item?.overView?.content.find(i => i.name === "Ngày hết hạn:")?.content,
            })
            await db.User.create({
                id: userId,
                name: item?.contact?.content.find(i => i.name === "Liên hệ:")?.content,
                password: hashPassword('123456'),
                phone: item?.contact?.content.find(i => i.name === "Điện thoại:")?.content,
                zalo: item?.contact?.content.find(i => i.name === "Zalo")?.content,

            })
        })

        resolve('done')
    } catch (error) {
        reject(error);
    }
})
