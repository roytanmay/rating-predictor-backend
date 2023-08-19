export const getContests = async (req, res) => {
    try {
        const response=await fetch('https://lccn.lbao.site/api/v1/contests/?skip=0&limit=10')
        const data=await response.json()
        res.status(200).json(data);

    } catch (error) {
        res.status(404).json({message: "Error!!"});
    }
}
