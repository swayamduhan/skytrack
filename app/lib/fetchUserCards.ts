import axios from "axios"

export async function fetchUserCards(setUserCards : any, setLoading : any, id : number){
    setLoading(true)
    try{
        const response = await axios.post("/api/cards/fetch", { userId : id })
        setUserCards(response.data.cards)
    } catch (error) {
        console.error("Error fetching cards : ", error)
    } finally {
        setLoading(false)
    }
}