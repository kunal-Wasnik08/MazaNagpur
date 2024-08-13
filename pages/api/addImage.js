import ImageDetails from '@/models/ImageDetails';
import connectDb from '@/middleware/mongoose';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb', // Set desired size limit
        },
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { base64, name, email, complaint, location } = req.body;
        try {
            if (!base64 || !name || !email || !complaint) {
                throw new Error('Required fields are missing');
            }

            const newImageDetails = new ImageDetails({
                image: base64,
                name,
                email,
                complaint,
                location
            });

            await newImageDetails.save();
            res.status(200).send({ status: "ok", message: "Complaint Registered" });
        } catch (error) {
            console.error("Error uploading data:", error);
            res.status(400).send({ status: "error", message: "Failed to save data", error: error.message });
        }
    } else {
        res.status(405).json({ error: "This method is not allowed." });
    }
    let images = await ImageDetails.find();
};
export default connectDb(handler);
