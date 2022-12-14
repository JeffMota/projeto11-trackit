import { ThreeDots } from  'react-loader-spinner'

export default function Loading(){
    return(
        <ThreeDots 
            height="15" 
            width="80" 
            radius="9"
            color="#ffff" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
         />
    )
}