import { useFetch, ApiUrl } from "../utils"
import { Navigate } from "react-router-dom"
import { isSuceessResponse } from "../utils"
import Loading from "./Loading"
export default function Logout (){
    const {data, loading, error} = useFetch({
        url: `${ApiUrl}/logout`,
        method: 'DELETE',
        autoFetch: true,
        headers: {}
})
    if(error === "User Not Authenticated") return <Navigate to="/login"/>
    if(error) return <p className="error-message">{(error as string)}</p>
    if(loading) return <Loading/>
    return (
        <div>
            
            <p className="text-center">
                {isSuceessResponse(data) && <p>data.message</p>}
            </p>
            <Navigate to="/login"/>
        </div>
    )
}