// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ImageDetails from "@/models/ImageDetails";
import connectDb from "/middleware/mongoose";

const handler = async (req, res) => {
    try {
        await ImageDetails.find({}).then(data => {
          res.send({ status: "ok", data: data });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send({ status: "error", message: "Failed to fetch data", error: error.message });
      }}
export default connectDb(handler);
