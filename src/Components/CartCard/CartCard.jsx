import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import {
  collection,
  query,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  where,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../Data/firebase";
import { ImCancelCircle } from "react-icons/im";
const CartCard = ({
  id,
  images,
  title,
  price,
  rating,
  quantity,
  handleCallBack,
}) => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState("");

  const allValues = [];
  let totalPrice = 0;

  //   const getTotal = async () => {
  //     // const q = query(collection(db, "Cart"), where("uid", "==", auth.currentUser.uid));
  //     // const querySnapshot = await getDocs(collection(db, "Cart"));
  //     // const querySnapshot = await getDocs(collection(db, "Cart"));

  //     // querySnapshot.docs.map((doc)=>{
  //     //   let tot = doc.data().quantity*doc.data().price;
  //     //   allValues.push(tot)
  //     //   // console.log(tot);
  //     // })

  // // const sum = allValues.reduce((partialSum, a) => partialSum + a, 0);

  // // const q = query(collection(db, "Cart"), where("uid", "==", auth.currentUser.uid));

  // // onSnapshot(q, (querySnapshot) => {

  // //   querySnapshot.docChanges.foreach((doc)=>{
  // //       let tot = doc.data().quantity*doc.data().price;
  // //       allValues.push(tot)
  // //       // console.log(tot);
  // //      totalPrice = allValues.reduce((partialSum, a) => partialSum + a, 0);
  // //     })
  // //     console.log(totalPrice);
  // //      setTotal(totalPrice)

  // // const q = query(collection(db, "Cart"), where("uid", "==", auth.currentUser.uid));
  // // onSnapshot(q, (snapshot) => {
  // //   snapshot.docChanges().forEach((change) => {
  // //     if (change.type === "added") {
  // //         console.log("New city: ", change.doc.data());
  // //     }
  // //     if (change.type === "modified") {
  // //         console.log("Modified city: ", change.doc.data());
  // //     }
  // //     if (change.type === "removed") {
  // //         console.log("Removed city: ", change.doc.data());
  // //     }
  // //   });
  // // });

  // //   querySnapshot.forEach((doc) => {
  // //     let tot = doc.data().quantity * doc.data().price;
  // //     console.log(tot);
  // //   allValues.push(tot);
  // // //   for (let i = 0; i < allValues.length; i++) {
  // // //     totalPrice += allValues[i];
  // // //   }
  // // // setTotal(totalPrice);

  // //   });
  //   // console.log(allValues);
  //   // console.log(totalPrice);
  // // });

  // // console.log(sum)
  // // setTotal(sum)
  // // console.log(total);
  // // handleCallBack(sum)
  //     // querySnapshot.map((doc) => {
  //     //   // doc.data() is never undefined for query doc snapshots
  //     //   console.log(doc.id, " => ", doc.data().quantity * doc.data().price);
  //     // });
  //     // console.log(
  //     // querySnapshot.docs

  //     // );
  //     // onSnapshot(q, (querySnapshot) => {

  //     //   querySnapshot.forEach((doc) => {
  //     //     let tot = doc.data().quantity * doc.data().price;
  //     //     console.log(tot);
  //     //   allValues.push(tot);
  //     // //   for (let i = 0; i < allValues.length; i++) {
  //     // //     totalPrice += allValues[i];
  //     // //   }
  //     // // setTotal(totalPrice);

  //     //   });
  //     //   console.log(allValues);
  //     //   // console.log(totalPrice);

  //     // });
  //   };
  const getTotal = async () => {
    const q = query(
      collection(db, "Cart"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
      allValues.push(doc.data().quantity * doc.data().price);
      totalPrice = allValues.reduce((partialSum, a) => partialSum + a, 0);
    });
    //  console.log(totalPrice);
    handleCallBack(totalPrice);
  };
  useEffect(() => {
    getTotal();
  }, [quantity]);

  const increase = async () => {
    // console.log(rating);
    setCount(count + 1);

    await updateDoc(doc(db, "Cart", `Product ${id}`), {
      quantity: increment(1),
    });
  };
  const decrease = async () => {
    setCount((prev) => {
      if (prev <= 1) return 1;
      return prev - 1;
    });
    if (quantity > 1) {
      await updateDoc(doc(db, "Cart", `Product ${id}`), {
        quantity: increment(-1),
      });
    }
  };
  const deleteProd = async(id) => {

    const docSnap = await getDoc(doc(db, "Cart", `Product ${id}`));
    try {
      if (docSnap.exists()) {
        await deleteDoc(
          doc(db, "Cart", `Product ${id}`),
          where("uid", "==", auth.currentUser.uid)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="product-details">
      <span>
       
        <img src={images[0]} alt="" />
        <span className="product-name-flex">
        <p>{title.length > 12 ? `${title.slice(0, 12)}...` : title}</p>
        <button onClick={()=>{deleteProd(id)}}>
          <ImCancelCircle />
        </button>
          </span>
      </span>
      <p>${price}</p>

      <div className="counter">
        <button
          disabled={quantity <= 1}
          onClick={() => {
            decrease();
          }}
        >
          <AiOutlineDown />
        </button>
        <p className="count">{quantity}</p>

        <button
          onClick={() => {
            increase(id);
          }}
        >
          {" "}
          <AiOutlineDown />
        </button>
      </div>

      <p>${quantity * price}</p>
    </div>
  );
};

export default CartCard;
