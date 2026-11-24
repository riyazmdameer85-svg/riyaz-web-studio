import Razorpay from "razorpay";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const body = await req.json();

  // If this is a verification request (after payment)
  if (body.verify) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = body;
      
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        // Payment is verified! Update database to 'pro'
        const { error } = await supabase
          .from("profiles")
          .upsert({ id: userId, plan: "pro" });
          
        if (error) throw error;
        return Response.json({ status: "success" });
      } else {
        return Response.json({ error: "Invalid signature" }, { status: 400 });
      }
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  // If this is a create order request
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: 49900, // ₹499
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return Response.json(order);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
