import axios from "axios"

export async function fetchUserCards(setUserCards : any, setLoading : any, id : number){
    console.log("Fetch function called!")
    console.log(id)
    setLoading(true)
    try{
        const response = await axios.post("/api/cards/fetch", { userId : id })
        console.log(response.data.cards)
        setUserCards(response.data.cards)
    } catch (error) {
        console.error("Error fetching cards : ", error)
    } finally {
        setLoading(false)
    }
}