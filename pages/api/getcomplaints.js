// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import Complaint from "@/models/complaint";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  let complaint = await Complaint.find()
  let press = {}
  for(let item of complaint){
    if(item.title in press){
        if(!press[item.title].color.includes(item.color) && item.availableQty > 0){
          press[item.title].color.push(item.color)
        }
        if(!press[item.title].size.includes(item.size) && item.availableQty > 0){
          press[item.title].size.push(item.size)
        }
    }

    else{
      press[item.title] = JSON.parse(JSON.stringify(item))
      if(item.availableQty >0){
            press[item.title].color = [item.color]
            press[item.title].size = [item.size]
          }
    }
  }
  res.status(200).json({press})
}
export default connectDb(handler);
