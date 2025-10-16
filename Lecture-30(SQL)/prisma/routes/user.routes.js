const express = require('express');
const prisma = require('../client');
const router = express.Router();

router.post("/create", async(req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email }
    })
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/transfer", async (req, res) => {
  try {
    const { amount, senderId, receiverId } = req.body;
    // syntax for transaction
    const transaction = await prisma.$transaction( async (tx) => {
      const sender = await tx.user.findUnique({
        where: { id:senderId }
      })
      // Step 1 : Balance Check
      if (!sender || sender.balance < amount) {
        throw new Error("Insufficient Balance");
      }

      // Step 2 : Deduct amount from user's balance
      await tx.user.update({
        where: { id:senderId },
        // data: { balance: user.balance - amount }
        data: { balance: { decrement: amount }}
      });

      // Step 3 : Check reciever and his/her credit amount
      const receiver = await tx.user.update({
        where: { id: receiverId },
        data: { balance: { increment: amount }}
      });

      // Step 4 : Transaction record
      const record = await tx.transaction.create({
        data: {
          amount,
          senderId,
          receiverId
        }
      })
      return record;
    });
    res.status(203).json({ transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/all/filter", async (req, res) => {
  try {
    // const users = await prisma.user.findMany({
    //   where: {
    //     // get all the users whose name starts with 'sh'
    //     // name: { startsWith: "sh" }
    //     // get all the users whose name end with 'sh'
    //     // name: { endsWith: "sh" }

    //   }
    // })

    // const users = await prisma.user.findMany({
    //   where: {
    //     // get all the users whose name have with "bh"
    //     name: { contains: "bh", mode: "insensitive" }
    //   },
    //   // to include relation data in user data
    //   include: {
    //     sendTrns: true,
    //     receiveTrans: true
    //   }
    // })

    // const users = await prisma.user.findMany({
    //   where:{
    //     balance: {gte:2000}
    //   }
    // })

    // to get use who haven't sent any money
    // const users = await prisma.user.findMany({
    //   where: {
    //     sendTrns:{
    //       none:{}
    //     }
    //   }
    // })

    // to get use who have sent some money
    // const users = await prisma.user.findMany({
    //   where: {
    //     sendTrns:{
    //       some:{}
    //     }
    //   }
    // })

    // Sorting
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc"}
    })
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;