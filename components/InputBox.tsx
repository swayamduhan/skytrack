export default function InputBox({ state, setState, label, placeholder, type="text" } : { state : any, setState : any, label : string, placeholder : string, type? : string}){
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="font-satoshi font-bold">{label} :</div>
            <input className="rounded-md p-2 border-b-2 border-r-2 focus:outline-none border-black bg-black/10 hover:bg-black/5 dark:bg-black/60 dark:border-b dark:border-white dark:border-r dark:hover:bg-black/30 transition-all duration-200" type={type} placeholder={placeholder} onChange={e => setState(e.target.value)}/>
        </div>
    )
}